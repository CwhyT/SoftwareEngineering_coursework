<template>
  <div class="register-page min-h-screen bg-gray-100 py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
    <div class="max-w-md w-full space-y-8 bg-white p-10 rounded-lg shadow-md">
      <div class="text-center">
        <h2 class="mt-2 text-3xl font-extrabold text-gray-900">
          注册账户
        </h2>
        <p class="mt-3 text-sm text-gray-600">
          电动滑板车租赁系统
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
              placeholder="用户名"
              :prefix-icon="User"
              autocomplete="username"
              class="form-input"
            />
          </el-form-item>
          
          <el-form-item label="邮箱" prop="email">
            <div class="verification-code-input">
            <el-input 
              v-model="registerForm.email" 
              placeholder="请输入邮箱" 
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
                  {{ emailCountdown > 0 ? `${emailCountdown}s` : '获取验证码' }}
                </el-button>
              </template>
            </el-input>
            </div>
          </el-form-item>
          
          <el-form-item v-if="registerForm.emailCode || emailCountdown > 0" label="邮箱验证码" prop="emailCode">
            <el-input 
              v-model="registerForm.emailCode" 
              placeholder="请输入验证码" 
              :prefix-icon="Key"
            />
            <div class="text-xs text-gray-500 mt-1 ml-1">
              请前往邮箱查看验证码并填写
            </div>
          </el-form-item>
          
          <el-form-item label="手机号" prop="phoneNumber">
            <el-input 
              v-model="registerForm.phoneNumber" 
              placeholder="请输入手机号码" 
              :prefix-icon="Phone"
              autocomplete="tel"
            />
          </el-form-item>
          
          <el-form-item label="出生日期" prop="birthDate">
            <el-date-picker
              v-model="registerForm.birthDate"
              type="date"
              placeholder="请选择出生日期"
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
              placeholder="密码"
              :prefix-icon="Lock"
              autocomplete="new-password"
              class="form-input"
              show-password
            />
            <div class="text-xs text-gray-500 mt-1 ml-1">密码长度不能小于6个字符</div>
          </el-form-item>
          
          <el-form-item prop="confirmPassword" class="mb-6">
            <el-input
              v-model="registerForm.confirmPassword"
              type="password"
              placeholder="确认密码"
              :prefix-icon="Lock"
              autocomplete="new-password"
              class="form-input"
              show-password
            />
          </el-form-item>
        </div>

        <div class="flex items-center ml-1">
          <el-checkbox v-model="registerForm.agreeTerms">
            <span class="text-sm">我已阅读并同意</span>
            <a href="#" class="text-blue-600 hover:text-blue-800 text-sm">用户协议</a>
            <span class="text-sm">和</span>
            <a href="#" class="text-blue-600 hover:text-blue-800 text-sm">隐私政策</a>
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
            注册
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
    callback(new Error('请输入密码'));
  } else if (value.length < 6) {
    callback(new Error('密码长度不能小于6个字符'));
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
    callback(new Error('请再次输入密码'));
  } else if (value !== registerForm.password) {
    callback(new Error('两次输入密码不一致'));
  } else {
    callback();
  }
};

// 表单验证规则
const registerRules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' }
  ],
  emailCode: [
    { required: true, message: '请获取并输入邮箱验证码', trigger: 'blur' },
    { len: 6, message: '验证码应为6位数字', trigger: 'blur' }
  ],
  phoneNumber: [
    { required: true, message: '请输入手机号码', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '请输入有效的手机号码', trigger: 'blur' }
  ],
  birthDate: [
    { required: true, message: '请选择出生日期', trigger: 'change' }
  ],
  password: [
    { validator: validatePassword, trigger: 'blur' }
  ],
  confirmPassword: [
    { validator: validateConfirmPassword, trigger: 'blur' }
  ],
  agreeTerms: [
    { type: 'boolean', message: '请阅读并同意用户协议', trigger: 'change' },
    { required: true, message: '请阅读并同意用户协议', trigger: 'change' }
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
        console.log('开始注册请求...');
        
        // 检查邮箱验证码是否为空
        if (!registerForm.emailCode) {
          errorMessage.value = '请先获取并输入邮箱验证码';
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

        console.log('发送注册数据:', JSON.stringify(userData));
      // 使用API服务调用注册
      const response = await userApi.register(userData);
        console.log('注册请求成功:', response);
      const data = response.data || response;
      
      // 注册成功，自动登录
      ElMessage({
        type: 'success',
        message: '注册成功，正在自动登录',
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
        console.error('注册失败详细信息:', error);
        
        // 判断是否是网络错误
        const isNetworkError = !error.response || error.message.includes('Network Error') || error.message.includes('timeout');
        
        // 如果是网络错误且未超过最大重试次数，则重试
        if (isNetworkError && retryAttempts.value < maxRetryAttempts) {
          retryAttempts.value++;
          const retryDelay = 1000 * retryAttempts.value; // 递增延迟
          
          errorMessage.value = `网络连接不稳定，${retryAttempts.value}秒后自动重试(${retryAttempts.value}/${maxRetryAttempts})...`;
          
          await new Promise(resolve => setTimeout(resolve, retryDelay));
          
          errorMessage.value = '正在重试连接...';
          return tryRegister(); // 递归重试
        }
        
      // 处理错误信息
        if (error.response) {
          // 服务器响应了，但状态码不是2xx
          const statusCode = error.response.status;
          const responseData = error.response.data || {};
          
          console.log('服务器响应错误:', statusCode, responseData);
          
          if (statusCode === 400) {
            if (responseData.message && responseData.message.includes('验证码')) {
              errorMessage.value = responseData.message;
              // 如果是验证码错误，让用户可以重新获取验证码
              emailCountdown.value = 0;
            } else {
              errorMessage.value = responseData.message || '提交的信息有误，请检查所有字段';
            }
          } else if (statusCode === 401 || statusCode === 403) {
            errorMessage.value = '无权限执行此操作';
          } else if (statusCode === 404) {
            errorMessage.value = '请求的资源不存在';
          } else if (statusCode === 409) {
            errorMessage.value = responseData.message || '用户名或邮箱已被注册';
          } else if (statusCode === 422) {
            errorMessage.value = responseData.message || '验证码错误或已过期';
            // 如果是验证码错误，让用户可以重新获取验证码
            emailCountdown.value = 0;
          } else if (statusCode >= 500) {
            errorMessage.value = '服务器内部错误，请稍后再试';
          } else {
            errorMessage.value = responseData.message || '注册失败，请重试';
          }
        } else if (error.request) {
          // 请求已发送但没有收到响应
          errorMessage.value = '无法连接到服务器，请检查您的网络连接';
      } else {
          // 设置请求时出现问题
          errorMessage.value = `请求错误: ${error.message}`;
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
    ElMessage.warning('请输入邮箱地址');
    return;
  }
  
  // 验证邮箱格式
  if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(registerForm.email)) {
    ElMessage.warning('请输入有效的邮箱地址');
    return;
  }
  
  sendingEmailCode.value = true;
  retryAttempts.value = 0;
  let emailSent = false;
  
  const trySendCode = async () => {
  try {
      console.log('开始发送验证码请求...');
      
      // 只使用主接口发送验证码
    const response = await userApi.sendEmailCode(registerForm.email);
      console.log('验证码请求成功:', response);
    
      // 更加灵活地处理响应格式
      // 只要请求成功返回，无论响应内容如何，都视为验证码发送成功
      emailSent = true;
      ElMessage.success(`验证码已发送，请查看您的邮箱收件箱或垃圾邮件文件夹 (${registerForm.email})`);
      
      // 移除自动填充验证码的功能
      if (isDev.value && response.code) {
        console.log('开发环境验证码(仅控制台显示):', response.code);
        // 不再自动填充验证码，让用户从真实邮件中获取
        // registerForm.emailCode = response.code;
        // ElMessage.info(`开发模式：验证码 ${response.code} 已自动填充`);
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
      console.error('发送邮箱验证码错误详细信息:', error);
      
      // 判断是否是网络错误
      const isNetworkError = !error.response || error.message.includes('Network Error') || error.message.includes('timeout');
      
      // 如果是网络错误且未超过最大重试次数，则重试
      if (isNetworkError && retryAttempts.value < maxRetryAttempts) {
        retryAttempts.value++;
        const retryDelay = 1000 * retryAttempts.value; // 递增延迟
        
        ElMessage({
          type: 'warning',
          message: `网络连接不稳定，${retryAttempts.value}秒后自动重试(${retryAttempts.value}/${maxRetryAttempts})...`,
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
            ElMessage.error(responseData.message || '邮箱格式不正确');
          } else if (statusCode === 429) {
            ElMessage.error(responseData.message || '发送频率过高，请稍后再试');
          } else if (statusCode >= 500) {
            ElMessage.error('服务器内部错误，请稍后再试');
          } else {
            ElMessage.error(`请求失败(${statusCode}): ${responseData.message || '未知错误'}`);
          }
    } else if (error.request) {
      ElMessage.error('服务器未响应，请检查网络连接');
    } else {
      ElMessage.error(`请求错误: ${error.message}`);
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