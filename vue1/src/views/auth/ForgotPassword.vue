<template>
  <div class="forgot-password-page min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
    <div class="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
      <div class="text-center">
        <h2 class="mt-2 text-3xl font-extrabold text-gray-900">
          Reset Password
        </h2>
        <p class="mt-2 text-sm text-gray-600">
          Please enter the email address you used for registration
        </p>
      </div>
      
      <el-form
        ref="formRef"
        :model="form"
        :rules="rules"
        @submit.prevent="submitForm"
        class="mt-8 space-y-6"
      >
        <el-form-item prop="email">
          <el-input
            v-model="form.email"
            placeholder="Email address"
            :prefix-icon="Message"
            autocomplete="email"
          >
            <template #append>
              <el-button
                @click="sendEmailCode"
                :disabled="countdown > 0"
                :loading="sendingCode"
              >
                {{ countdown > 0 ? `${countdown}s` : 'Get Code' }}
              </el-button>
            </template>
          </el-input>
        </el-form-item>
        
        <el-form-item prop="code" v-if="showCodeInput">
          <el-input
            v-model="form.code"
            placeholder="Verification code"
            :prefix-icon="Key"
          />
        </el-form-item>

        <el-form-item prop="password" v-if="showPasswordInput">
          <el-input
            v-model="form.password"
            type="password"
            placeholder="New password"
            :prefix-icon="Lock"
            show-password
          />
        </el-form-item>

        <el-form-item prop="confirmPassword" v-if="showPasswordInput">
          <el-input
            v-model="form.confirmPassword"
            type="password"
            placeholder="Confirm new password"
            :prefix-icon="Lock"
            show-password
          />
        </el-form-item>
        
        <div>
          <el-button
            type="primary"
            native-type="submit"
            class="w-full"
            :loading="loading"
          >
            {{ showPasswordInput ? 'Reset Password' : 'Verify Email' }}
          </el-button>
        </div>
        
        <div class="flex items-center justify-center">
          <div class="text-sm">
            <router-link to="/auth/login" class="text-blue-600 hover:text-blue-800">
              Back to Login
            </router-link>
          </div>
        </div>
        
        <div v-if="errorMessage" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {{ errorMessage }}
        </div>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import { userApi } from '@/api/user';
import { Message, Lock, Key } from '@element-plus/icons-vue';

const router = useRouter();

// 表单数据
const form = reactive({
  email: '',
  code: '',
  password: '',
  confirmPassword: ''
});

// 状态控制
const formRef = ref(null);
const loading = ref(false);
const errorMessage = ref('');
const showCodeInput = ref(false);
const showPasswordInput = ref(false);
const countdown = ref(0);
const sendingCode = ref(false);

// 表单验证规则
const rules = {
  email: [
    { required: true, message: 'Please enter email address', trigger: 'blur' },
    { type: 'email', message: 'Please enter a valid email format', trigger: 'blur' }
  ],
  code: [
    { required: true, message: 'Please enter verification code', trigger: 'blur' },
    { len: 6, message: 'Verification code must be 6 digits', trigger: 'blur' }
  ],
  password: [
    { required: true, message: 'Please enter new password', trigger: 'blur' },
    { min: 6, max: 20, message: 'Length should be 6 to 20 characters', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: 'Please confirm password', trigger: 'blur' },
    { 
      validator: (rule, value, callback) => {
        if (value !== form.password) {
          callback(new Error('Passwords do not match'));
        } else {
          callback();
        }
      }, 
      trigger: 'blur' 
    }
  ]
};

// 发送邮箱验证码
const sendEmailCode = async () => {
  if (!form.email) {
    ElMessage.warning('Please enter email address');
    return;
  }
  
  if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(form.email)) {
    ElMessage.warning('Please enter a valid email address');
    return;
  }
  
  sendingCode.value = true;
  
  try {
    const response = await userApi.sendEmailCode(form.email);
    
    if (response.data.success) {
      ElMessage.success('Verification code has been sent to your email');
      showCodeInput.value = true;
      
      // 开始倒计时
      countdown.value = 60;
      const timer = setInterval(() => {
        countdown.value--;
        if (countdown.value <= 0) {
          clearInterval(timer);
        }
      }, 1000);
    } else {
      ElMessage.error(response.data.message || 'Failed to send verification code');
    }
  } catch (error) {
    console.error('Error sending verification code:', error);
    ElMessage.error(error.response?.data?.message || 'Failed to send verification code, please try again later');
  } finally {
    sendingCode.value = false;
  }
};

// 提交表单
const submitForm = async () => {
  if (!formRef.value) return;
  
  await formRef.value.validate(async (valid) => {
    if (!valid) return;
    
    loading.value = true;
    errorMessage.value = '';
    
    try {
      if (!showPasswordInput.value) {
        // 第一步：验证邮箱验证码
        const response = await userApi.verifyEmail(form.email, form.code);
        
        if (response.data.success) {
          ElMessage.success('Email verification successful, please set new password');
          showPasswordInput.value = true;
        } else {
          errorMessage.value = response.data.message || 'Verification code validation failed';
        }
      } else {
        // 第二步：重置密码
        const response = await userApi.resetPassword({
          email: form.email,
          code: form.code,
          password: form.password
        });
        
        if (response.data.success) {
          ElMessage.success('Password reset successful, please login with new password');
          router.push('/auth/login');
        } else {
          errorMessage.value = response.data.message || 'Password reset failed';
        }
      }
    } catch (error) {
      console.error('Operation failed:', error);
      errorMessage.value = error.response?.data?.message || 'Operation failed, please try again later';
    } finally {
      loading.value = false;
    }
  });
};
</script>

<style scoped>
.form-input :deep(.el-input__wrapper) {
  border-radius: 0.375rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}

.form-input :deep(.el-input__wrapper.is-focus) {
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.3), 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}
</style> 