<template>
  <div class="login-page">
    <div class="flex min-h-screen items-center justify-center">
      <div class="login-card bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
        <div class="text-center mb-8">
          <h1 class="text-3xl font-bold text-gray-800">Login</h1>
          <p class="text-gray-500 mt-2">Shared Electric Scooter Rental System</p>
        </div>
        
        <form @submit.prevent="handleLogin">
          <div class="mb-6">
            <label for="username" class="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
            <el-input 
              v-model="form.username" 
              placeholder="Please enter your phone number" 
              :prefix-icon="User"
            />
          </div>
          
          <div class="mb-8">
            <label for="password" class="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <el-input 
              v-model="form.password" 
              type="password" 
              placeholder="Please enter your password"
              :prefix-icon="Lock"
              show-password
            />
          </div>
          
          <div class="flex items-center justify-between mb-6">
            <el-checkbox v-model="form.remember">Remember me</el-checkbox>
            <a href="#" class="text-sm text-blue-600 hover:text-blue-800">Forgot password?</a>
          </div>
          
          <el-button type="primary" class="w-full" :loading="isLoading" @click="handleLogin">
            Login
          </el-button>
          
          <div class="mt-4 text-center">
            <p class="text-sm text-gray-600">
              Don't have an account? 
              <a href="#" class="text-blue-600 hover:text-blue-800 font-medium">Register now</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { User, Lock } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';

const router = useRouter();
const isLoading = ref(false);

const form = ref({
  username: '',
  password: '',
  remember: false
});

const handleLogin = () => {
  // Simple form validation
  if (!form.value.username) {
    ElMessage.warning('Please enter your phone number');
    return;
  }
  
  if (!form.value.password) {
    ElMessage.warning('Please enter your password');
    return;
  }
  
  // Simulate login process
  isLoading.value = true;
  
  setTimeout(() => {
    isLoading.value = false;
    
    // Simulate successful login (should call API in actual project)
    ElMessage.success('Login successful');
    
    // Redirect to home page
    router.push('/');
  }, 1500);
};
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  background-color: #f3f4f6;
  background-image: linear-gradient(135deg, #f0f4ff 0%, #e6f7ff 100%);
}
</style> 