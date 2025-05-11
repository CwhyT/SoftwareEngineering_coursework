<template>
  <div class="reset-password-page min-h-screen bg-gray-100 py-12 px-4 flex items-center justify-center">
    <div class="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
      <div class="text-center mb-6">
        <h2 class="text-2xl font-bold text-gray-800">重置密码</h2>
        <p class="text-gray-600 mt-2">请设置您的新密码</p>
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
            placeholder="新密码"
            type="password"
            prefix-icon="Lock"
            autocomplete="new-password"
            show-password
          />
          <div class="text-xs text-gray-500 mt-1 ml-1">
            密码长度不能小于6个字符
          </div>
        </el-form-item>
        
        <el-form-item prop="confirmPassword">
          <el-input
            v-model="formData.confirmPassword"
            placeholder="确认密码"
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
          重置密码
        </el-button>
      </el-form>
      
      <div v-if="errorMessage" class="mt-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
        {{ errorMessage }}
      </div>
      
      <div v-if="successMessage" class="mt-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
        {{ successMessage }}
        <div class="mt-2">
          <router-link to="/auth/login" class="text-green-700 font-semibold underline">
            立即登录
          </router-link>
        </div>
      </div>
      
      <div class="mt-6 text-center" v-if="!successMessage">
        <router-link to="/auth/login" class="text-blue-600 hover:text-blue-800">
          返回登录
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

// 密码验证函数
const validatePassword = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入密码'));
  } else if (value.length < 6) {
    callback(new Error('密码长度不能小于6个字符'));
  } else {
    if (formData.confirmPassword !== '') {
      resetFormRef.value.validateField('confirmPassword');
    }
    callback();
  }
};

// 确认密码验证函数
const validateConfirmPassword = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请再次输入密码'));
  } else if (value !== formData.password) {
    callback(new Error('两次输入密码不一致'));
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
  // 从路由获取令牌
  const token = route.params.token || route.query.token;
  
  if (!token) {
    errorMessage.value = '重置令牌不存在，请重新申请找回密码';
    return;
  }
  
  formData.token = token;
  tokenValid.value = true;
});

const handleSubmit = () => {
  if (!tokenValid.value) {
    errorMessage.value = '重置令牌无效，请重新申请找回密码';
    return;
  }
  
  resetFormRef.value.validate(async (valid) => {
    if (!valid) return;
    
    loading.value = true;
    errorMessage.value = '';
    successMessage.value = '';
    
    try {
      const response = await userApi.resetPassword(formData.token, formData.password);
      successMessage.value = response.data.message || '密码重置成功，请使用新密码登录';
      
      // 清空表单
      formData.password = '';
      formData.confirmPassword = '';
      resetFormRef.value.resetFields();
      
      // 3秒后自动跳转到登录页
      setTimeout(() => {
        router.push('/auth/login');
      }, 3000);
    } catch (error) {
      console.error('重置密码错误:', error);
      errorMessage.value = error.response?.data?.message || '重置密码失败，请稍后重试';
    } finally {
      loading.value = false;
    }
  });
};
</script>

<style scoped>
/* 可以添加任何特定于此页面的样式 */
</style> 