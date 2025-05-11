<template>
  <div class="verify-email-page min-h-screen bg-gray-100 py-12 px-4 flex items-center justify-center">
    <div class="max-w-md w-full bg-white p-8 rounded-lg shadow-md text-center">
      <div v-if="loading" class="py-8">
        <div class="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto"></div>
        <p class="mt-4 text-gray-600">正在验证邮箱...</p>
      </div>
      
      <div v-else-if="verified">
        <div class="flex justify-center mb-4">
          <div class="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-green-500" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
          </div>
        </div>
        <h2 class="text-2xl font-bold text-gray-800 mb-4">邮箱验证成功</h2>
        <p class="text-gray-600 mb-6">您的邮箱已成功验证，账户已激活。</p>
        <router-link to="/auth/login" class="block w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg transition duration-200">
          前往登录
        </router-link>
      </div>
      
      <div v-else>
        <div class="flex justify-center mb-4">
          <div class="h-16 w-16 bg-red-100 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-red-500" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </div>
        </div>
        <h2 class="text-2xl font-bold text-gray-800 mb-4">验证失败</h2>
        <p class="text-gray-600 mb-6">{{ errorMessage || '验证链接无效或已过期。' }}</p>
        <div class="flex flex-col space-y-3">
          <router-link to="/auth/login" class="block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg transition duration-200">
            返回登录
          </router-link>
          <router-link to="/auth/register" class="block bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 px-4 rounded-lg transition duration-200">
            重新注册
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { userApi } from '@/api/user';

const route = useRoute();

const loading = ref(true);
const verified = ref(false);
const errorMessage = ref('');

onMounted(async () => {
  // 从路由获取令牌
  const token = route.params.token || route.query.token;
  
  if (!token) {
    loading.value = false;
    errorMessage.value = '验证令牌不存在';
    return;
  }
  
  try {
    // 调用验证API
    const response = await userApi.verifyEmail(token);
    
    if (response.data.success) {
      verified.value = true;
    } else {
      errorMessage.value = response.data.message;
    }
  } catch (error) {
    console.error('邮箱验证错误:', error);
    errorMessage.value = error.response?.data?.message || '验证过程中发生错误';
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
/* 可以添加任何特定于此页面的样式 */
</style> 