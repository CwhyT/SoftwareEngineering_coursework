<template>
  <div class="container mx-auto px-4 py-8">
    <div class="max-w-2xl mx-auto">
      <div class="mb-8 text-center">
        <h1 class="text-2xl font-bold text-gray-900">支付中心</h1>
        <p class="text-gray-600">请确认订单信息并完成支付</p>
      </div>

      <el-card class="mb-6">
        <template #header>
          <div class="flex items-center">
            <el-icon class="mr-2"><Tickets /></el-icon>
            <span>订单信息</span>
          </div>
        </template>

        <div class="space-y-4">
          <div class="flex justify-between items-center py-2 border-b">
            <span class="text-gray-600">订单编号</span>
            <span>{{ orderInfo.orderNo || '-' }}</span>
          </div>

          <div class="flex justify-between items-center py-2 border-b">
            <span class="text-gray-600">滑板车编号</span>
            <span>{{ orderInfo.scooterCode || '-' }}</span>
          </div>

          <div class="flex justify-between items-center py-2 border-b">
            <span class="text-gray-600">租赁类型</span>
            <span>{{ getRentalTypeText(orderInfo.rentalType) }}</span>
          </div>

          <div class="flex justify-between items-center py-2 border-b">
            <span class="text-gray-600">租赁时长</span>
            <span>{{ formatDuration(orderInfo.duration, orderInfo.rentalType) }}</span>
          </div>

          <div class="flex justify-between items-center py-2 border-b">
            <span class="text-gray-600">押金</span>
            <span class="text-primary">￥{{ orderInfo.deposit || 0 }}</span>
          </div>

          <div class="flex justify-between items-center py-2 border-b">
            <span class="text-gray-600">租赁费用</span>
            <span class="text-primary">￥{{ orderInfo.rentalFee || 0 }}</span>
          </div>

          <div class="flex justify-between items-center py-2">
            <span class="font-medium">总计</span>
            <span class="text-xl font-bold text-primary">￥{{ orderInfo.totalAmount || 0 }}</span>
          </div>
        </div>
      </el-card>

      <el-card class="mb-6">
        <template #header>
          <div class="flex items-center">
            <el-icon class="mr-2"><Wallet /></el-icon>
            <span>支付方式</span>
          </div>
        </template>

        <el-radio-group v-model="paymentMethod" class="w-full">
          <div class="space-y-4">
            <el-radio label="balance" class="payment-method-radio w-full">
              <div class="flex items-center justify-between w-full p-3 rounded-lg">
                <div class="flex items-center">
                  <el-icon class="text-primary text-xl mr-3"><Wallet /></el-icon>
                  <div>
                    <div class="font-medium">账户余额</div>
                    <div class="text-sm text-gray-500">可用余额: ￥{{ userBalance }}</div>
                  </div>
                </div>
              </div>
            </el-radio>

            <el-radio label="alipay" class="payment-method-radio w-full">
              <div class="flex items-center justify-between w-full p-3 rounded-lg">
                <div class="flex items-center">
                  <img src="@/assets/alipay.png" alt="支付宝" class="w-6 h-6 mr-3">
                  <div class="font-medium">支付宝</div>
                </div>
              </div>
            </el-radio>

            <el-radio label="wechat" class="payment-method-radio w-full">
              <div class="flex items-center justify-between w-full p-3 rounded-lg">
                <div class="flex items-center">
                  <img src="@/assets/wechat.png" alt="微信支付" class="w-6 h-6 mr-3">
                  <div class="font-medium">微信支付</div>
                </div>
              </div>
            </el-radio>
          </div>
        </el-radio-group>
      </el-card>

      <!-- 提交订单按钮 -->
      <div class="flex justify-center">
        <el-button 
          type="primary" 
          class="w-full md:w-1/2"
          :loading="loading"
          @click="handlePayment"
        >
          确认支付
        </el-button>
      </div>
    </div>

    <!-- 支付确认对话框 -->
    <el-dialog
      v-model="showPaymentDialog"
      title="扫码支付"
      width="400px"
      center
    >
      <div class="text-center">
        <div class="mb-4">
          <img 
            :src="qrCodeUrl"
            alt="支付二维码"
            class="w-64 h-64 mx-auto border p-2"
          >
        </div>
        <p class="text-gray-600 mb-2">
          请使用{{ paymentMethodText }}扫码支付
        </p>
        <p class="text-primary text-xl font-medium">
          ￥{{ orderInfo.totalAmount || 0 }}
        </p>
      </div>
      <div class="mt-6 text-center text-gray-500 text-sm">
        <p>订单编号: {{ orderInfo.orderNo }}</p>
        <p class="mt-1">请在 <span class="countdown">{{ countdown }}</span> 内完成支付</p>
      </div>
    </el-dialog>

    <!-- 支付成功对话框 -->
    <el-dialog
      v-model="showSuccessDialog"
      title="支付成功"
      width="360px"
      :show-close="false"
      center
    >
      <div class="text-center">
        <div class="flex justify-center items-center mb-4">
          <el-icon class="text-success text-6xl"><CircleCheckFilled /></el-icon>
        </div>
        <h3 class="text-xl font-medium mb-2">支付成功!</h3>
        <p class="text-gray-600 mb-6">您已成功支付 ￥{{ orderInfo.totalAmount }}</p>
        <div class="flex justify-center space-x-4">
          <el-button @click="$router.push('/rent')">继续租赁</el-button>
          <el-button type="primary" @click="$router.push('/profile')">查看订单</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { useScooterStore } from '@/stores/scooter'
import { ElMessage } from 'element-plus'
import {
  Tickets,
  Wallet,
  CircleCheckFilled
} from '@element-plus/icons-vue'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const scooterStore = useScooterStore()

// 订单信息
const orderInfo = reactive({
  orderNo: '',
  scooterCode: '',
  rentalType: '',
  duration: 0,
  deposit: 0,
  rentalFee: 0,
  totalAmount: 0
})

// 用户余额
const userBalance = ref(0)

// 支付方式
const paymentMethod = ref('alipay')

// 状态控制
const loading = ref(false)
const showPaymentDialog = ref(false)
const showSuccessDialog = ref(false)
const qrCodeUrl = ref('')
const countdown = ref(300) // 5分钟倒计时
let countdownTimer = null
let paymentStatusTimer = null

// 支付方式文本
const paymentMethodText = computed(() => {
  const texts = {
    alipay: '支付宝',
    wechat: '微信',
    balance: '余额'
  }
  return texts[paymentMethod.value] || ''
})

// 初始化页面数据
onMounted(async () => {
  const orderId = route.query.orderId
  
  if (!orderId) {
    ElMessage.error('订单参数错误')
    router.push('/')
    return
  }
  
  try {
    // 获取订单信息
    const response = await fetch(`/api/orders/${orderId}`)
    if (response.ok) {
      const data = await response.json()
      Object.assign(orderInfo, data)
    } else {
      throw new Error('获取订单信息失败')
    }
    
    // 获取用户余额
    const userResponse = await fetch('/api/user/balance')
    if (userResponse.ok) {
      const data = await userResponse.json()
      userBalance.value = data.balance || 0
    }
  } catch (error) {
    ElMessage.error(error.message || '加载数据失败')
    router.push('/')
  }
})

// 清理定时器
onUnmounted(() => {
  clearInterval(countdownTimer)
  clearInterval(paymentStatusTimer)
})

// 处理支付
const handlePayment = async () => {
  if (paymentMethod.value === 'balance') {
    // 余额支付
    if (userBalance.value < orderInfo.totalAmount) {
      ElMessage.error('余额不足，请选择其他支付方式或先充值')
      return
    }
    
    await processBalancePayment()
  } else {
    // 第三方支付
    await processThirdPartyPayment()
  }
}

// 处理余额支付
const processBalancePayment = async () => {
  loading.value = true
  
  try {
    const response = await fetch('/api/payments/balance', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userStore.token}`
      },
      body: JSON.stringify({
        orderId: orderInfo.orderNo,
        amount: orderInfo.totalAmount
      })
    })
    
    if (response.ok) {
      // 直接显示支付成功
      showSuccessDialog.value = true
      // 更新用户余额
      userBalance.value -= orderInfo.totalAmount
    } else {
      const data = await response.json()
      throw new Error(data.message)
    }
  } catch (error) {
    ElMessage.error(error.message || '支付失败，请稍后重试')
  } finally {
    loading.value = false
  }
}

// 处理第三方支付
const processThirdPartyPayment = async () => {
  loading.value = true
  
  try {
    const response = await fetch('/api/payments/qrcode', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userStore.token}`
      },
      body: JSON.stringify({
        orderId: orderInfo.orderNo,
        amount: orderInfo.totalAmount,
        method: paymentMethod.value
      })
    })
    
    if (response.ok) {
      const data = await response.json()
      qrCodeUrl.value = data.qrCodeUrl
      
      // 显示支付对话框
      showPaymentDialog.value = true
      
      // 启动倒计时
      startCountdown()
      
      // 开始轮询支付状态
      startPaymentStatusPolling()
    } else {
      const data = await response.json()
      throw new Error(data.message)
    }
  } catch (error) {
    ElMessage.error(error.message || '获取支付二维码失败')
  } finally {
    loading.value = false
  }
}

// 开始倒计时
const startCountdown = () => {
  countdown.value = 300 // 5分钟
  
  countdownTimer = setInterval(() => {
    countdown.value--
    
    if (countdown.value <= 0) {
      clearInterval(countdownTimer)
      showPaymentDialog.value = false
      ElMessage.warning('支付超时，请重新发起支付')
    }
  }, 1000)
}

// 开始轮询支付状态
const startPaymentStatusPolling = () => {
  paymentStatusTimer = setInterval(async () => {
    try {
      const response = await fetch(`/api/payments/status/${orderInfo.orderNo}`)
      if (response.ok) {
        const data = await response.json()
        
        if (data.status === 'paid') {
          // 支付成功，停止轮询
          clearInterval(paymentStatusTimer)
          clearInterval(countdownTimer)
          
          // 关闭支付对话框，显示成功对话框
          showPaymentDialog.value = false
          showSuccessDialog.value = true
        }
      }
    } catch (error) {
      console.error('轮询支付状态失败', error)
    }
  }, 2000) // 每2秒轮询一次
}

// 获取租赁类型文本
const getRentalTypeText = (type) => {
  const texts = {
    hourly: '按小时',
    daily: '按天',
    weekly: '按周'
  }
  return texts[type] || type
}

// 格式化时长
const formatDuration = (value, type) => {
  if (!value) return '-'
  
  switch (type) {
    case 'hourly':
      return `${value}小时`
    case 'daily':
      return `${value}天`
    case 'weekly':
      return `${value}周`
    default:
      return `${value}`
  }
}
</script>

<style scoped>
.payment-method-radio :deep(.el-radio__label) {
  padding: 0;
  width: 100%;
}

.payment-method-radio :deep(.el-radio__input) {
  position: absolute;
  left: 1rem;
}

.payment-method-radio :deep(.el-radio__label > div) {
  margin-left: 2rem;
}

.countdown {
  color: var(--el-color-danger);
  font-weight: bold;
}
</style> 