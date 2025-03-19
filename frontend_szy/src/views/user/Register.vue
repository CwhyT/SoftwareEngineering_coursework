<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div class="text-center">
        <img src="@/assets/logo.png" alt="Logo" class="mx-auto h-12 w-12">
        <h2 class="mt-6 text-3xl font-extrabold text-gray-900">
          创建新账号
        </h2>
        <p class="mt-2 text-sm text-gray-600">
          已有账号？
          <router-link to="/login" class="font-medium text-primary hover:text-blue-500">
            立即登录
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

        <el-form-item prop="nickname">
          <el-input
            v-model="formData.nickname"
            placeholder="昵称"
            :prefix-icon="UserFilled"
          />
        </el-form-item>

        <el-form-item prop="email">
          <el-input
            v-model="formData.email"
            placeholder="邮箱"
            :prefix-icon="Message"
          />
        </el-form-item>

        <el-form-item prop="phone">
          <el-input
            v-model="formData.phone"
            placeholder="手机号"
            :prefix-icon="Iphone"
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

        <el-form-item prop="confirmPassword">
          <el-input
            v-model="formData.confirmPassword"
            type="password"
            placeholder="确认密码"
            :prefix-icon="Lock"
            show-password
          />
        </el-form-item>

        <div class="flex items-center">
          <el-checkbox v-model="agreeTerms">
            我已阅读并同意
          </el-checkbox>
          <button type="button" class="ml-1 text-primary text-sm" @click="showTerms = true">
            用户协议和隐私政策
          </button>
        </div>

        <div>
          <el-button
            type="primary"
            native-type="submit"
            class="w-full"
            :loading="loading"
            :disabled="!agreeTerms"
          >
            注册
          </el-button>
        </div>
      </el-form>
    </div>

    <!-- 用户协议对话框 -->
    <el-dialog v-model="showTerms" title="用户协议和隐私政策" width="70%">
      <div class="text-sm text-gray-600 leading-relaxed">
        <h3 class="text-lg font-medium text-gray-900 mb-4">电动滑板车租赁服务用户协议</h3>
        <p class="mb-4">欢迎使用我们的电动滑板车租赁服务。请仔细阅读以下条款，注册即表示您已同意以下所有条款：</p>
        
        <h4 class="font-medium text-gray-800 mt-4">1. 服务说明</h4>
        <p>本应用提供电动滑板车在线租赁、管理、支付等服务。用户需年满18周岁，具有完全民事行为能力。</p>
        
        <h4 class="font-medium text-gray-800 mt-4">2. 账户安全</h4>
        <p>用户应妥善保管账号密码，因账号密码保管不善导致的一切后果由用户自行承担。</p>
        
        <h4 class="font-medium text-gray-800 mt-4">3. 用户责任</h4>
        <p>用户应遵守交通规则，安全使用滑板车。因用户使用不当造成的一切损失由用户自行承担。</p>
        
        <h4 class="font-medium text-gray-800 mt-4">4. 隐私政策</h4>
        <p>我们尊重并保护用户的隐私权。我们会收集必要的用户信息以提供服务，但不会未经用户同意向第三方透露用户个人信息。</p>
        
        <h4 class="font-medium text-gray-800 mt-4">5. 服务变更与终止</h4>
        <p>我们保留随时修改或终止服务的权利，修改后的协议条款会在APP内公布。</p>
      </div>
      <template #footer>
        <div class="flex justify-end">
          <el-button @click="showTerms = false">关闭</el-button>
          <el-button type="primary" @click="acceptTerms">同意</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { 
  User, 
  UserFilled, 
  Message, 
  Iphone, 
  Lock 
} from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

const router = useRouter()
const userStore = useUserStore()
const formRef = ref(null)
const loading = ref(false)
const agreeTerms = ref(false)
const showTerms = ref(false)

const formData = reactive({
  username: '',
  nickname: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: ''
})

const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 20, message: '用户名长度应在 3 到 20 个字符之间', trigger: 'blur' }
  ],
  nickname: [
    { required: true, message: '请输入昵称', trigger: 'blur' },
    { max: 20, message: '昵称长度不能超过 20 个字符', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入有效的邮箱地址', trigger: 'blur' }
  ],
  phone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '请输入有效的手机号码', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码长度不能少于 6 个字符', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: '请确认密码', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value !== formData.password) {
          callback(new Error('两次输入的密码不一致'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ]
}

const acceptTerms = () => {
  agreeTerms.value = true
  showTerms.value = false
}

const handleSubmit = async () => {
  if (!formRef.value) return
  
  if (!agreeTerms.value) {
    ElMessage.warning('请先阅读并同意用户协议和隐私政策')
    return
  }
  
  await formRef.value.validate(async (valid, fields) => {
    if (valid) {
      loading.value = true
      try {
        const result = await userStore.register({
          username: formData.username,
          nickname: formData.nickname,
          email: formData.email,
          phone: formData.phone,
          password: formData.password
        })
        
        if (result.success) {
          ElMessage.success('注册成功，请登录')
          router.push('/login')
        } else {
          ElMessage.error(result.message)
        }
      } catch (error) {
        ElMessage.error('注册失败，请稍后重试')
      } finally {
        loading.value = false
      }
    }
  })
}
</script> 