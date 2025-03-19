<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div class="text-center">
        <img src="@/assets/logo.png" alt="Logo" class="mx-auto h-12 w-12">
        <h2 class="mt-6 text-3xl font-extrabold text-gray-900">
          欢迎回来
        </h2>
        <p class="mt-2 text-sm text-gray-600">
          还没有账号？
          <router-link to="/register" class="font-medium text-primary hover:text-blue-500">
            立即注册
          </router-link>
        </p>
      </div>

      <el-form
        ref="formRef"
        :model="formData"
        :rules="rules"
        class="mt-8 space-y-6"
        @submit.prevent="handleSubmit"
      >
        <el-form-item prop="username">
          <el-input
            v-model="formData.username"
            placeholder="用户名"
            :prefix-icon="User"
          />
        </el-form-item>

        <el-form-item prop="password">
          <el-input
            v-model="formData.password"
            type="password"
            placeholder="密码"
            :prefix-icon="Lock"
            show-password
          />
        </el-form-item>

        <div class="flex items-center justify-between">
          <el-checkbox v-model="rememberMe">
            记住我
          </el-checkbox>
          <router-link 
            to="/forgot-password"
            class="text-sm font-medium text-primary hover:text-blue-500"
          >
            忘记密码？
          </router-link>
        </div>

        <div>
          <el-button
            type="primary"
            native-type="submit"
            class="w-full"
            :loading="loading"
          >
            登录
          </el-button>
        </div>
        
        <p class="text-center text-sm text-gray-500 mt-4">
          演示账号：admin / 密码：123456
        </p>
      </el-form>
    </div>
    
    <!-- 演示模式提示 -->
    <el-alert
      v-if="isDemoMode"
      type="info"
      :closable="false"
      class="fixed bottom-4 left-4 right-4 max-w-lg mx-auto"
    >
      <div class="text-center">
        <p class="mb-2">当前为演示模式，无需实际后端</p>
        <el-button type="primary" size="small" @click="handleDemoLogin">
          一键登录体验
        </el-button>
      </div>
    </el-alert>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { User, Lock } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

const router = useRouter()
const userStore = useUserStore()
const formRef = ref(null)
const loading = ref(false)
const rememberMe = ref(false)
const isDemoMode = ref(true) // 启用演示模式

const formData = reactive({
  username: '',
  password: ''
})

const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 20, message: '用户名长度应在 3 到 20 个字符之间', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码长度不能少于 6 个字符', trigger: 'blur' }
  ]
}

// 演示用的模拟登录功能
const mockLogin = async (credentials) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (credentials.username === 'admin' && credentials.password === '123456') {
        resolve({
          success: true,
          token: 'demo-token-123456',
          user: {
            id: 1,
            username: 'admin',
            nickname: '演示用户',
            isAdmin: false
          }
        })
      } else {
        resolve({
          success: false,
          message: '用户名或密码错误'
        })
      }
    }, 800) // 模拟网络延迟
  })
}

// 处理演示登录按钮
const handleDemoLogin = () => {
  formData.username = 'admin'
  formData.password = '123456'
  handleSubmit()
}

const handleSubmit = async () => {
  if (!formRef.value) return
  
  await formRef.value.validate(async (valid, fields) => {
    if (valid) {
      loading.value = true
      try {
        // 在演示模式中使用模拟登录
        const result = isDemoMode.value 
          ? await mockLogin(formData)
          : await userStore.login(formData)
        
        if (result.success) {
          // 在演示模式中手动设置用户状态
          if (isDemoMode.value) {
            localStorage.setItem('token', result.token)
            localStorage.setItem('isAdmin', result.user.isAdmin)
            
            // 更新 Pinia store
            userStore.$patch({
              token: result.token,
              userInfo: result.user,
              isAdmin: result.user.isAdmin
            })
          }
          
          ElMessage.success('登录成功')
          if (rememberMe.value) {
            localStorage.setItem('rememberedUsername', formData.username)
          } else {
            localStorage.removeItem('rememberedUsername')
          }
          router.push('/')
        } else {
          ElMessage.error(result.message)
        }
      } catch (error) {
        console.error('登录错误:', error)
        ElMessage.error('登录失败，请稍后重试')
      } finally {
        loading.value = false
      }
    }
  })
}

onMounted(() => {
  // 如果有记住的用户名，自动填充
  const rememberedUsername = localStorage.getItem('rememberedUsername')
  if (rememberedUsername) {
    formData.username = rememberedUsername
    rememberMe.value = true
  }
})
</script> 