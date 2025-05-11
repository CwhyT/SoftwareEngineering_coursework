<template>
  <div class="login-page min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
    <div class="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
      <div class="text-center">
        <h2 class="mt-2 text-3xl font-extrabold text-gray-900">
          登录账户
        </h2>
        <p class="mt-2 text-sm text-gray-600">
          电动滑板车租赁系统
        </p>
      </div>
      
      <el-form
        ref="loginFormRef"
        :model="loginForm"
        :rules="loginRules"
        @submit.prevent="handleLogin"
        class="mt-8 space-y-6"
      >
        <div class="mb-6">
          <el-form-item prop="username">
            <el-input
              v-model="loginForm.username"
              placeholder="请输入您的用户名"
              :prefix-icon="User"
              autocomplete="username"
              class="form-input"
            />
            <div class="text-xs text-gray-500 mt-1 ml-1">用户名长度在3-20个字符之间</div>
          </el-form-item>
          
          <el-form-item prop="password">
            <el-input
              v-model="loginForm.password"
              type="password"
              placeholder="请输入您的密码"
              :prefix-icon="Lock"
              autocomplete="current-password"
              class="form-input"
              show-password
            />
            <div class="text-xs text-gray-500 mt-1 ml-1">密码长度在6-20个字符之间</div>
          </el-form-item>
        </div>
        
        <div class="flex justify-between items-center mt-2">
          <el-checkbox v-model="loginForm.remember">记住我</el-checkbox>
          <router-link to="/auth/forgot-password" class="text-blue-500 text-sm">忘记密码?</router-link>
        </div>
        
        <el-button type="primary" native-type="submit" class="w-full mt-4" :loading="loading">登录</el-button>
        
        <div v-if="errorMessage" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {{ errorMessage }}
        </div>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useUserStore } from '@/stores/user';
import { User, Lock } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import { userApi } from '@/api/user';

const router = useRouter();
const route = useRoute();
const userStore = useUserStore();

// 表单数据
const loginForm = reactive({
  username: '',
  password: ''
});

// 表单验证规则
const loginRules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
  ]
};

// 状态
const loading = ref(false);
const rememberMe = ref(false);
const errorMessage = ref('');
const loginFormRef = ref(null);

// 是否为开发环境
const isDev = computed(() => import.meta.env.DEV);

const handleLogin = async () => {
  // 表单验证
  if (!loginForm.username || !loginForm.password) {
    ElMessage.warning('请输入用户名和密码');
    return;
  }

  // 设置加载状态
  loading.value = true;
  errorMessage.value = '';

  try {
    const credentials = {
      username: loginForm.username,
      password: loginForm.password
    };
    
    const result = await userStore.login(credentials);
    
    if (result.success) {
      // 显示成功消息
      ElMessage.success('登录成功');
      
      // 如果是从其他页面重定向来的，登录后返回那个页面
      const redirectPath = route.query.redirect || 
                          (userStore.isAdmin ? '/admin' : '/');
                          
      router.push(redirectPath);
    } else {
      // 登录失败
      errorMessage.value = result.message || '登录失败，请检查用户名和密码';
    }
  } catch (error) {
    console.error('登录错误:', error);
    errorMessage.value = '登录过程中发生错误';
  } finally {
    loading.value = false;
  }
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
</style>
