<template>
  <div class="login-page">
    <div class="flex min-h-screen items-center justify-center">
      <div class="login-card bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
        <div class="text-center mb-8">
          <h1 class="text-3xl font-bold text-gray-800">登录</h1>
          <p class="text-gray-500 mt-2">共享电动滑板车租赁系统</p>
        </div>
        
        <form @submit.prevent="handleLogin">
          <div class="mb-6">
            <label for="username" class="block text-sm font-medium text-gray-700 mb-2">手机号</label>
            <el-input 
              v-model="form.username" 
              placeholder="请输入手机号" 
              :prefix-icon="User"
            />
          </div>
          
          <div class="mb-8">
            <label for="password" class="block text-sm font-medium text-gray-700 mb-2">密码</label>
            <el-input 
              v-model="form.password" 
              type="password" 
              placeholder="请输入密码"
              :prefix-icon="Lock"
              show-password
            />
          </div>
          
          <div class="flex items-center justify-between mb-6">
            <el-checkbox v-model="form.remember">记住我</el-checkbox>
            <a href="#" class="text-sm text-blue-600 hover:text-blue-800">忘记密码?</a>
          </div>
          
          <el-button type="primary" class="w-full" :loading="isLoading" @click="handleLogin">
            登录
          </el-button>
          
          <div class="mt-4 text-center">
            <p class="text-sm text-gray-600">
              还没有账号? 
              <a href="#" class="text-blue-600 hover:text-blue-800 font-medium">立即注册</a>
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
  // 简单的表单验证
  if (!form.value.username) {
    ElMessage.warning('请输入手机号');
    return;
  }
  
  if (!form.value.password) {
    ElMessage.warning('请输入密码');
    return;
  }
  
  // 模拟登录过程
  isLoading.value = true;
  
  setTimeout(() => {
    isLoading.value = false;
    
    // 模拟登录成功 (实际项目中应该调用API)
    ElMessage.success('登录成功');
    
    // 跳转到首页
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