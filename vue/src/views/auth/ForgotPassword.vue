<template>
  <div class="forgot-password-page min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
    <div class="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
      <div class="text-center">
        <h2 class="mt-2 text-3xl font-extrabold text-gray-900">
          找回密码
        </h2>
        <p class="mt-2 text-sm text-gray-600">
          请输入您注册时使用的邮箱地址
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
            placeholder="邮箱地址"
            :prefix-icon="Message"
            autocomplete="email"
          >
            <template #append>
              <el-button
                @click="sendEmailCode"
                :disabled="countdown > 0"
                :loading="sendingCode"
              >
                {{ countdown > 0 ? `${countdown}s` : '获取验证码' }}
              </el-button>
            </template>
          </el-input>
        </el-form-item>
        
        <el-form-item prop="code" v-if="showCodeInput">
          <el-input
            v-model="form.code"
            placeholder="验证码"
            :prefix-icon="Key"
          />
        </el-form-item>

        <el-form-item prop="password" v-if="showPasswordInput">
          <el-input
            v-model="form.password"
            type="password"
            placeholder="新密码"
            :prefix-icon="Lock"
            show-password
          />
        </el-form-item>

        <el-form-item prop="confirmPassword" v-if="showPasswordInput">
          <el-input
            v-model="form.confirmPassword"
            type="password"
            placeholder="确认新密码"
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
            {{ showPasswordInput ? '重置密码' : '验证邮箱' }}
          </el-button>
        </div>
        
        <div class="flex items-center justify-center">
          <div class="text-sm">
            <router-link to="/auth/login" class="text-blue-600 hover:text-blue-800">
              返回登录
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
    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' }
  ],
  code: [
    { required: true, message: '请输入验证码', trigger: 'blur' },
    { len: 6, message: '验证码长度为6位', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: '请确认密码', trigger: 'blur' },
    { 
      validator: (rule, value, callback) => {
        if (value !== form.password) {
          callback(new Error('两次输入的密码不一致'));
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
    ElMessage.warning('请输入邮箱地址');
    return;
  }
  
  if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(form.email)) {
    ElMessage.warning('请输入有效的邮箱地址');
    return;
  }
  
  sendingCode.value = true;
  
  try {
    const response = await userApi.sendEmailCode(form.email);
    
    if (response.data.success) {
      ElMessage.success('验证码已发送到您的邮箱');
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
      ElMessage.error(response.data.message || '发送验证码失败');
    }
  } catch (error) {
    console.error('发送验证码错误:', error);
    ElMessage.error(error.response?.data?.message || '发送验证码失败，请稍后重试');
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
          ElMessage.success('邮箱验证成功，请设置新密码');
          showPasswordInput.value = true;
        } else {
          errorMessage.value = response.data.message || '验证码验证失败';
        }
      } else {
        // 第二步：重置密码
        const response = await userApi.resetPassword({
          email: form.email,
          code: form.code,
          password: form.password
        });
        
        if (response.data.success) {
          ElMessage.success('密码重置成功，请使用新密码登录');
          router.push('/auth/login');
        } else {
          errorMessage.value = response.data.message || '密码重置失败';
        }
      }
    } catch (error) {
      console.error('操作失败:', error);
      errorMessage.value = error.response?.data?.message || '操作失败，请稍后重试';
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