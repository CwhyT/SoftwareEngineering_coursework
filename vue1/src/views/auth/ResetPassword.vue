<template>
  <div class="reset-password-page min-h-screen bg-gray-100 py-12 px-4 flex items-center justify-center">
    <div class="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
      <div class="text-center mb-6">
        <h2 class="text-2xl font-bold text-gray-800">Reset Password</h2>
        <p class="text-gray-600 mt-2">Please set your new password</p>
      </div>
      
      <el-form
        ref="resetFormRef"
        :model="formData"
        :rules="formRules"
        @submit.prevent="handleSubmit"
      >
        <el-form-item prop="password">
          <el-input
            v-model="formData.password"
            placeholder="New password"
            type="password"
            prefix-icon="Lock"
            autocomplete="new-password"
            show-password
          />
          <div class="text-xs text-gray-500 mt-1 ml-1">
            Password must be at least 6 characters long
          </div>
        </el-form-item>
        
        <el-form-item prop="confirmPassword">
          <el-input
            v-model="formData.confirmPassword"
            placeholder="Confirm password"
            type="password"
            prefix-icon="Lock"
            autocomplete="new-password"
            show-password
          />
        </el-form-item>
        
        <el-button
          type="primary"
          native-type="submit"
          class="w-full mt-4"
          :loading="loading"
        >
          Reset Password
        </el-button>
      </el-form>
      
      <div v-if="errorMessage" class="mt-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
        {{ errorMessage }}
      </div>
      
      <div v-if="successMessage" class="mt-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
        {{ successMessage }}
        <div class="mt-2">
          <router-link to="/auth/login" class="text-green-700 font-semibold underline">
            Login Now
          </router-link>
        </div>
      </div>
      
      <div class="mt-6 text-center" v-if="!successMessage">
        <router-link to="/auth/login" class="text-blue-600 hover:text-blue-800">
          Back to Login
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Lock } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import { userApi } from '@/api/user';

const route = useRoute();
const router = useRouter();

const formData = reactive({
  password: '',
  confirmPassword: '',
  token: ''
});

// Password validation function
const validatePassword = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('Please enter password'));
  } else if (value.length < 6) {
    callback(new Error('Password must be at least 6 characters long'));
  } else {
    if (formData.confirmPassword !== '') {
      resetFormRef.value.validateField('confirmPassword');
    }
    callback();
  }
};

// Confirm password validation function
const validateConfirmPassword = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('Please enter password again'));
  } else if (value !== formData.password) {
    callback(new Error('Passwords do not match'));
  } else {
    callback();
  }
};

const formRules = {
  password: [
    { validator: validatePassword, trigger: 'blur' }
  ],
  confirmPassword: [
    { validator: validateConfirmPassword, trigger: 'blur' }
  ]
};

const loading = ref(false);
const errorMessage = ref('');
const successMessage = ref('');
const resetFormRef = ref(null);
const tokenValid = ref(false);

onMounted(() => {
  // Get token from route
  const token = route.params.token || route.query.token;
  
  if (!token) {
    errorMessage.value = 'Reset token does not exist, please request password reset again';
    return;
  }
  
  formData.token = token;
  tokenValid.value = true;
});

const handleSubmit = () => {
  if (!tokenValid.value) {
    errorMessage.value = 'Invalid reset token, please request password reset again';
    return;
  }
  
  resetFormRef.value.validate(async (valid) => {
    if (!valid) return;
    
    loading.value = true;
    errorMessage.value = '';
    successMessage.value = '';
    
    try {
      const response = await userApi.resetPassword(formData.token, formData.password);
      successMessage.value = response.data.message || 'Password reset successful, please login with new password';
      
      // Clear form
      formData.password = '';
      formData.confirmPassword = '';
      resetFormRef.value.resetFields();
      
      // Redirect to login page after 3 seconds
      setTimeout(() => {
        router.push('/auth/login');
      }, 3000);
    } catch (error) {
      console.error('Password reset error:', error);
      errorMessage.value = error.response?.data?.message || 'Password reset failed, please try again later';
    } finally {
      loading.value = false;
    }
  });
};
</script>

<style scoped>
/* 可以添加任何特定于此页面的样式 */
</style> 