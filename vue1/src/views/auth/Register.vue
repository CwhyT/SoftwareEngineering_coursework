<template>
  <div class="register-page min-h-screen bg-gray-100 py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
    <div class="max-w-md w-full space-y-8 bg-white p-10 rounded-lg shadow-md">
      <div class="text-center">
        <h2 class="mt-2 text-3xl font-extrabold text-gray-900">
          Register Account
        </h2>
        <p class="mt-3 text-sm text-gray-600">
          Electric Scooter Rental System
        </p>
      </div>
      
      <el-form
        ref="registerFormRef"
        :model="registerForm"
        :rules="registerRules"
        @submit.prevent="handleRegister"
        class="mt-10 space-y-8"
      >
        <div class="space-y-6">
          <el-form-item prop="username" class="mb-6">
            <el-input
              v-model="registerForm.username"
              placeholder="Username"
              :prefix-icon="User"
              autocomplete="username"
              class="form-input"
            />
          </el-form-item>
          
          <el-form-item label="Email" prop="email">
            <div class="verification-code-input">
            <el-input 
              v-model="registerForm.email" 
              placeholder="Please enter your email" 
              :prefix-icon="Message"
              autocomplete="email"
            >
              <template #append>
                <el-button 
                    class="code-button"
                  @click="sendEmailCode" 
                  :disabled="emailCountdown > 0" 
                  :loading="sendingEmailCode"
                >
                  {{ emailCountdown > 0 ? `${emailCountdown}s` : 'Get Code' }}
                </el-button>
              </template>
            </el-input>
            </div>
          </el-form-item>
          
          <el-form-item v-if="registerForm.emailCode || emailCountdown > 0" label="Email Verification Code" prop="emailCode">
            <el-input 
              v-model="registerForm.emailCode" 
              placeholder="Please enter verification code" 
              :prefix-icon="Key"
            />
            <div class="text-xs text-gray-500 mt-1 ml-1">
              Please check your email for the verification code
            </div>
          </el-form-item>
          
          <el-form-item label="Phone Number" prop="phoneNumber">
            <el-input 
              v-model="registerForm.phoneNumber" 
              placeholder="Please enter your phone number" 
              :prefix-icon="Phone"
              autocomplete="tel"
            />
          </el-form-item>
          
          <el-form-item label="Birth Date" prop="birthDate">
            <el-date-picker
              v-model="registerForm.birthDate"
              type="date"
              placeholder="Please select your birth date"
              :prefix-icon="Calendar"
              format="YYYY-MM-DD"
              value-format="YYYY-MM-DD"
              :disabled-date="disabledDate"
              style="width: 100%"
            />
          </el-form-item>
          
          <el-form-item prop="password" class="mb-6">
            <el-input
              v-model="registerForm.password"
              type="password"
              placeholder="Password"
              :prefix-icon="Lock"
              autocomplete="new-password"
              class="form-input"
              show-password
            />
            <div class="text-xs text-gray-500 mt-1 ml-1">Password must be at least 6 characters long</div>
          </el-form-item>
          
          <el-form-item prop="confirmPassword" class="mb-6">
            <el-input
              v-model="registerForm.confirmPassword"
              type="password"
              placeholder="Confirm Password"
              :prefix-icon="Lock"
              autocomplete="new-password"
              class="form-input"
              show-password
            />
          </el-form-item>
        </div>

        <div class="flex items-center ml-1">
          <el-checkbox v-model="registerForm.agreeTerms">
            <span class="text-sm">I have read and agree to the</span>
            <a href="#" class="text-blue-600 hover:text-blue-800 text-sm">Terms of Service</a>
            <span class="text-sm">and</span>
            <a href="#" class="text-blue-600 hover:text-blue-800 text-sm">Privacy Policy</a>
          </el-checkbox>
        </div>

        <div class="mt-8">
          <el-button
            type="primary"
            native-type="submit"
            class="w-full py-3 text-base"
            :loading="loading"
            :disabled="!registerForm.agreeTerms"
          >
            Register
          </el-button>
        </div>
        
        <div v-if="errorMessage" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {{ errorMessage }}
        </div>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';
import { User, Lock, Message, Phone, Key, Calendar } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import { useUserStore } from '@/stores/user';
import { userApi } from '@/api/user';

const router = useRouter();
const userStore = useUserStore();
const registerFormRef = ref(null);
const loading = ref(false);
const errorMessage = ref('');
const emailCountdown = ref(0);
const sendingEmailCode = ref(false);
const retryAttempts = ref(0);
const maxRetryAttempts = 3;
let countdownTimer = null;

// 判断是否为开发环境
const isDev = ref(import.meta.env.DEV);

// 表单数据
const registerForm = reactive({
  username: '',
  email: '',
  emailCode: '',
  phoneNumber: '',
  birthDate: '',
  password: '',
  confirmPassword: '',
  agreeTerms: false
});

// 密码验证函数
const validatePassword = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('Please enter password'));
  } else if (value.length < 6) {
    callback(new Error('Password must be at least 6 characters long'));
  } else {
    if (registerForm.confirmPassword !== '') {
      registerFormRef.value.validateField('confirmPassword');
    }
    callback();
  }
};

// 确认密码验证函数
const validateConfirmPassword = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('Please enter password again'));
  } else if (value !== registerForm.password) {
    callback(new Error('Passwords do not match'));
  } else {
    callback();
  }
};

// 表单验证规则
const registerRules = {
  username: [
    { required: true, message: 'Please enter username', trigger: 'blur' },
    { min: 3, max: 20, message: 'Length should be 3 to 20 characters', trigger: 'blur' }
  ],
  email: [
    { required: true, message: 'Please enter email', trigger: 'blur' },
    { type: 'email', message: 'Please enter a valid email format', trigger: 'blur' }
  ],
  emailCode: [
    { required: true, message: 'Please get and enter email verification code', trigger: 'blur' },
    { len: 6, message: 'Verification code should be 6 digits', trigger: 'blur' }
  ],
  phoneNumber: [
    { required: true, message: 'Please enter phone number', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: 'Please enter a valid phone number', trigger: 'blur' }
  ],
  birthDate: [
    { required: true, message: 'Please select birth date', trigger: 'change' }
  ],
  password: [
    { validator: validatePassword, trigger: 'blur' }
  ],
  confirmPassword: [
    { validator: validateConfirmPassword, trigger: 'blur' }
  ],
  agreeTerms: [
    { type: 'boolean', message: 'Please read and agree to the terms', trigger: 'change' },
    { required: true, message: 'Please read and agree to the terms', trigger: 'change' }
  ]
};

// 添加禁用未来日期的函数
const disabledDate = (time) => {
  return time.getTime() > Date.now();
};

// 处理注册
const handleRegister = () => {
  registerFormRef.value.validate(async (valid) => {
    if (!valid) return;
    
    loading.value = true;
    errorMessage.value = '';
    retryAttempts.value = 0;
    
    const tryRegister = async () => {
      try {
        console.log('Starting registration request...');
        
        // 检查邮箱验证码是否为空
        if (!registerForm.emailCode) {
          errorMessage.value = 'Please get and enter email verification code';
          loading.value = false;
          return;
        }
        
      // 准备要发送的数据
      const userData = {
        name: registerForm.username,
        username: registerForm.username,
        email: registerForm.email,
        emailCode: registerForm.emailCode,
        phoneNumber: registerForm.phoneNumber,
        birthDate: registerForm.birthDate,
        password: registerForm.password
      };

        console.log('Sending registration data:', JSON.stringify(userData));
      // 使用API服务调用注册
      const response = await userApi.register(userData);
        console.log('Registration request successful:', response);
      const data = response.data || response;
      
      // 注册成功，自动登录
      ElMessage({
        type: 'success',
        message: 'Registration successful, logging in automatically',
        duration: 1500
      });
      
      // 自动登录
      if (data.user) {
      userStore.setUser(data.user);
      } else {
        // 如果没有用户数据，创建一个基本的用户对象
        userStore.setUser({
          username: userData.username,
          email: userData.email,
          role: 'user'
        });
      }
      
      if (data.token) {
      userStore.setToken(data.token);
      }
      
      // 跳转到首页
      router.push('/');
    } catch (error) {
        console.error('Registration failure detailed information:', error);
        
        // 判断是否是网络错误
        const isNetworkError = !error.response || error.message.includes('Network Error') || error.message.includes('timeout');
        
        // 如果是网络错误且未超过最大重试次数，则重试
        if (isNetworkError && retryAttempts.value < maxRetryAttempts) {
          retryAttempts.value++;
          const retryDelay = 1000 * retryAttempts.value; // 递增延迟
          
          errorMessage.value = `Network connection unstable, retrying in ${retryAttempts.value} seconds (${retryAttempts.value}/${maxRetryAttempts})...`;
          
          await new Promise(resolve => setTimeout(resolve, retryDelay));
          
          errorMessage.value = 'Retrying connection...';
          return tryRegister(); // 递归重试
        }
        
      // 处理错误信息
        if (error.response) {
          // 服务器响应了，但状态码不是2xx
          const statusCode = error.response.status;
          const responseData = error.response.data || {};
          
          console.log('Server response error:', statusCode, responseData);
          
          if (statusCode === 400) {
            if (responseData.message && responseData.message.includes('verification code')) {
              errorMessage.value = responseData.message;
              // 如果是验证码错误，让用户可以重新获取验证码
              emailCountdown.value = 0;
            } else {
              errorMessage.value = responseData.message || 'Submission information is incorrect, please check all fields';
            }
          } else if (statusCode === 401 || statusCode === 403) {
            errorMessage.value = 'No permission to perform this operation';
          } else if (statusCode === 404) {
            errorMessage.value = 'Requested resource does not exist';
          } else if (statusCode === 409) {
            errorMessage.value = responseData.message || 'Username or email already registered';
          } else if (statusCode === 422) {
            errorMessage.value = responseData.message || 'Verification code error or expired';
            // 如果是验证码错误，让用户可以重新获取验证码
            emailCountdown.value = 0;
          } else if (statusCode >= 500) {
            errorMessage.value = 'Server internal error, please try again later';
          } else {
            errorMessage.value = responseData.message || 'Registration failed, please try again';
          }
        } else if (error.request) {
          // 请求已发送但没有收到响应
          errorMessage.value = 'Unable to connect to server, please check your network connection';
      } else {
          // 设置请求时出现问题
          errorMessage.value = `Request error: ${error.message}`;
      }
    } finally {
      loading.value = false;
    }
    };
    
    tryRegister();
  });
};

// 添加发送邮箱验证码方法
const sendEmailCode = async () => {
  if (!registerForm.email) {
    ElMessage.warning('Please enter email address');
    return;
  }
  
  // 验证邮箱格式
  if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(registerForm.email)) {
    ElMessage.warning('Please enter a valid email address');
    return;
  }
  
  sendingEmailCode.value = true;
  retryAttempts.value = 0;
  let emailSent = false;
  
  const trySendCode = async () => {
  try {
      console.log('Starting email verification code request...');
      
      // 只使用主接口发送验证码
    const response = await userApi.sendEmailCode(registerForm.email);
      console.log('Verification code request successful:', response);
    
      // 更加灵活地处理响应格式
      // 只要请求成功返回，无论响应内容如何，都视为验证码发送成功
      emailSent = true;
      ElMessage.success(`Verification code has been sent, please check your email inbox or junk mail folder (${registerForm.email})`);
      
      // 移除自动填充验证码的功能
      if (isDev.value && response.code) {
        console.log('Development environment verification code (only console display):', response.code);
        // 不再自动填充验证码，让用户从真实邮件中获取
        // registerForm.emailCode = response.code;
        // ElMessage.info(`Development mode: Verification code ${response.code} has been automatically filled`);
      }
      
      // 开始倒计时
      emailCountdown.value = 60;
      if (countdownTimer) {
        clearInterval(countdownTimer);
      }
      countdownTimer = setInterval(() => {
        emailCountdown.value--;
        if (emailCountdown.value <= 0) {
          clearInterval(countdownTimer);
          countdownTimer = null;
        }
      }, 1000);
    } catch (error) {
      console.error('Email verification code request error detailed information:', error);
      
      // 判断是否是网络错误
      const isNetworkError = !error.response || error.message.includes('Network Error') || error.message.includes('timeout');
      
      // 如果是网络错误且未超过最大重试次数，则重试
      if (isNetworkError && retryAttempts.value < maxRetryAttempts) {
        retryAttempts.value++;
        const retryDelay = 1000 * retryAttempts.value; // 递增延迟
        
        ElMessage({
          type: 'warning',
          message: `Network connection unstable, retrying in ${retryAttempts.value} seconds (${retryAttempts.value}/${maxRetryAttempts})...`,
          duration: retryDelay
        });
        
        await new Promise(resolve => setTimeout(resolve, retryDelay));
        
        if (!emailSent) {
          return trySendCode(); // 递归重试
        }
    } else {
    // 显示详细错误信息
    if (error.response) {
          const statusCode = error.response.status;
          const responseData = error.response.data || {};
          
          if (statusCode === 400) {
            ElMessage.error(responseData.message || 'Email format is incorrect');
          } else if (statusCode === 429) {
            ElMessage.error(responseData.message || 'Sending frequency too high, please try again later');
          } else if (statusCode >= 500) {
            ElMessage.error('Server internal error, please try again later');
          } else {
            ElMessage.error(`Request failed (${statusCode}): ${responseData.message || 'Unknown error'}`);
          }
    } else if (error.request) {
      ElMessage.error('Server did not respond, please check network connection');
    } else {
      ElMessage.error(`Request error: ${error.message}`);
        }
    }
  } finally {
      if (emailSent || retryAttempts.value >= maxRetryAttempts) {
    sendingEmailCode.value = false;
  }
    }
  };
  
  trySendCode();
};

// 组件卸载前清除计时器
onBeforeUnmount(() => {
  if (countdownTimer) {
    clearInterval(countdownTimer);
  }
});
</script>

<style scoped>
.form-input :deep(.el-input__wrapper) {
  border-radius: 0.375rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  padding: 8px 12px;
  height: 46px;
}

.form-input :deep(.el-input__wrapper.is-focus) {
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.3), 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}

.el-form-item {
  margin-bottom: 1rem;
}

:deep(.el-button) {
  font-size: 16px;
  padding-top: 10px;
  padding-bottom: 10px;
  background-color: var(--color-primary);
  opacity: 1;
  border: none;
}

:deep(.el-button:hover) {
  background-color: #2563eb;
  opacity: 1;
}

/* 验证码按钮样式优化 */
.verification-code-input :deep(.el-input-group__append) {
  padding: 0;
  background-color: transparent;
  border: none !important;
  display: block !important;
  visibility: visible !important;
  width: auto !important;
  overflow: visible !important;
  box-shadow: none !important;
}

.verification-code-input :deep(.el-input__wrapper) {
  border-right: none !important;
  box-shadow: 0 0 0 1px #dcdfe6 inset !important;
  border-right-color: transparent !important;
}

.verification-code-input :deep(.code-button) {
  height: 100%;
  margin: 0;
  padding: 0 20px;
  font-size: 14px;
  font-weight: 500;
  border-radius: 0 4px 4px 0;
  border: none !important;
  background-color: #f0f7ff !important;
  color: #3b82f6 !important;
  transition: all 0.3s;
  opacity: 1;
  display: inline-flex !important;
  align-items: center;
  justify-content: center;
  min-width: 120px !important;
  position: relative;
  z-index: 10;
  white-space: nowrap !important;
  overflow: visible !important;
  text-overflow: clip !important;
  box-shadow: none !important;
  outline: none !important;
}

.verification-code-input :deep(.code-button:hover:not(:disabled)) {
  background-color: #e0f0ff !important;
  color: #2563eb !important;
}

.verification-code-input :deep(.code-button:disabled) {
  background-color: #f5f7fa !important;
  color: #909399 !important;
  cursor: not-allowed;
  opacity: 0.8;
}

.verification-code-input :deep(.el-button span) {
  display: block !important;
  visibility: visible !important;
  color: inherit !important;
  z-index: 20;
  position: relative;
  white-space: nowrap !important;
  overflow: visible !important;
  width: auto !important;
  padding: 0 2px;
  letter-spacing: normal;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  font-weight: 500;
}

:deep(.el-checkbox__label) {
  display: inline-flex;
  align-items: center;
  flex-wrap: wrap;
}
</style> 