<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div class="text-center">
        <img src="@/assets/logo.png" alt="Logo" class="mx-auto h-12 w-12">
        <h2 class="mt-6 text-3xl font-extrabold text-gray-900">
          管理员登录
        </h2>
        <p class="mt-2 text-sm text-gray-600">
          请输入管理员账号和密码
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
            placeholder="管理员账号"
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

        <el-form-item prop="code">
          <div class="flex space-x-4">
            <el-input
              v-model="formData.code"
              placeholder="验证码"
              :prefix-icon="Key"
            />
            <img
              :src="captchaUrl"
              alt="验证码"
              class="h-[40px] cursor-pointer"
              @click="refreshCaptcha"
            >
          </div>
        </el-form-item>

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
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { User, Lock, Key } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

const router = useRouter()
const userStore = useUserStore()
const formRef = ref(null)
const loading = ref(false)
const captchaUrl = ref('')

const formData = reactive({
  username: '',
  password: '',
  code: ''
})

const rules = {
  username: [
    { required: true, message: '请输入管理员账号', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' }
  ],
  code: [
    { required: true, message: '请输入验证码', trigger: 'blur' },
    { len: 4, message: '验证码长度应为4位', trigger: 'blur' }
  ]
}

// 刷新验证码
const refreshCaptcha = () => {
  captchaUrl.value = `/api/admin/captcha?t=${Date.now()}`
}

// 处理登录
const handleSubmit = async () => {
  if (!formRef.value) return
  
  await formRef.value.validate(async (valid, fields) => {
    if (valid) {
      loading.value = true
      try {
        const result = await userStore.login({
          ...formData,
          isAdmin: true
        })
        
        if (result.success) {
          ElMessage.success('登录成功')
          router.push('/admin')
        } else {
          ElMessage.error(result.message)
          refreshCaptcha()
          formData.code = ''
        }
      } catch (error) {
        ElMessage.error('登录失败，请稍后重试')
        refreshCaptcha()
        formData.code = ''
      } finally {
        loading.value = false
      }
    }
  })
}

onMounted(() => {
  refreshCaptcha()
})
</script> 