<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-2xl font-bold text-gray-900 mb-6">个人中心</h1>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <!-- 用户信息卡片 -->
      <div class="md:col-span-1">
        <el-card class="mb-6">
          <div class="flex flex-col items-center">
            <el-avatar :size="100" :src="userInfo?.avatar">
              {{ userInfo?.nickname?.[0] || userInfo?.username?.[0] || 'U' }}
            </el-avatar>
            <h2 class="mt-4 text-xl font-medium">{{ userInfo?.nickname || userInfo?.username }}</h2>
            <p class="text-gray-500 mt-1">{{ userInfo?.email }}</p>
            <div class="mt-4 w-full flex justify-center">
              <el-button type="primary" @click="activeTab = 'profile'">编辑资料</el-button>
            </div>
          </div>

          <div class="mt-6 grid grid-cols-3 gap-4 text-center">
            <div>
              <p class="text-2xl font-bold">{{ userStats.balance || 0 }}</p>
              <p class="text-gray-500 text-sm">余额</p>
            </div>
            <div>
              <p class="text-2xl font-bold">{{ userStats.totalRentals || 0 }}</p>
              <p class="text-gray-500 text-sm">累计租赁</p>
            </div>
            <div>
              <p class="text-2xl font-bold">{{ userStats.points || 0 }}</p>
              <p class="text-gray-500 text-sm">积分</p>
            </div>
          </div>
        </el-card>

        <!-- 快捷菜单 -->
        <el-card>
          <template #header>
            <div class="font-medium">快捷菜单</div>
          </template>
          <div class="space-y-4">
            <div
              v-for="menu in quickMenus"
              :key="menu.name"
              class="flex items-center p-2 cursor-pointer hover:bg-gray-50 rounded-md transition-colors"
              @click="handleQuickMenu(menu.action)"
            >
              <el-icon class="mr-3 text-gray-400"><component :is="menu.icon" /></el-icon>
              <span>{{ menu.name }}</span>
              <el-icon class="ml-auto text-gray-400"><ArrowRight /></el-icon>
            </div>
          </div>
        </el-card>
      </div>

      <!-- 右侧内容区域 -->
      <div class="md:col-span-2">
        <el-card>
          <el-tabs v-model="activeTab">
            <!-- 我的租赁 -->
            <el-tab-pane name="rentals" lazy>
              <template #label>
                <div class="flex items-center">
                  <el-icon class="mr-1"><Bicycle /></el-icon>
                  <span>我的租赁</span>
                </div>
              </template>
              
              <div v-if="rentalHistory.length === 0" class="py-10 text-center text-gray-500">
                暂无租赁记录
              </div>
              
              <el-timeline v-else>
                <el-timeline-item
                  v-for="rental in rentalHistory"
                  :key="rental.id"
                  :timestamp="rental.endTime || rental.startTime"
                  type="primary"
                >
                  <el-card class="mb-4">
                    <div class="flex justify-between items-start">
                      <div>
                        <div class="flex items-center mb-2">
                          <span class="font-medium">滑板车编号: {{ rental.scooterCode }}</span>
                          <el-tag 
                            size="small" 
                            class="ml-2"
                            :type="rental.status === 'completed' ? 'success' : rental.status === 'ongoing' ? 'primary' : 'info'"
                          >
                            {{ 
                              rental.status === 'completed' ? '已完成' : 
                              rental.status === 'ongoing' ? '进行中' : '已取消'
                            }}
                          </el-tag>
                        </div>
                        <p class="text-gray-500 text-sm mb-1">
                          开始时间: {{ formatDate(rental.startTime) }}
                        </p>
                        <p v-if="rental.endTime" class="text-gray-500 text-sm mb-1">
                          结束时间: {{ formatDate(rental.endTime) }}
                        </p>
                        <p v-if="rental.duration" class="text-gray-500 text-sm mb-1">
                          使用时长: {{ formatDuration(rental.duration) }}
                        </p>
                        <p v-if="rental.amount" class="text-gray-500 text-sm">
                          费用: ¥{{ rental.amount }}
                        </p>
                      </div>
                      
                      <div>
                        <el-button 
                          v-if="rental.status === 'ongoing'"
                          type="primary" 
                          size="small"
                          @click="handleEndRental(rental.id)"
                        >
                          结束租赁
                        </el-button>
                        <el-button 
                          v-if="rental.status === 'completed'"
                          type="primary" 
                          plain
                          size="small"
                          @click="showFeedbackDialog(rental)"
                        >
                          评价
                        </el-button>
                      </div>
                    </div>
                  </el-card>
                </el-timeline-item>
              </el-timeline>
              
              <div v-if="hasMoreRentals" class="text-center mt-4">
                <el-button text @click="loadMoreRentals">加载更多</el-button>
              </div>
            </el-tab-pane>

            <!-- 个人资料 -->
            <el-tab-pane name="profile" lazy>
              <template #label>
                <div class="flex items-center">
                  <el-icon class="mr-1"><User /></el-icon>
                  <span>个人资料</span>
                </div>
              </template>
              
              <el-form
                ref="profileFormRef"
                :model="profileForm"
                :rules="profileRules"
                label-width="100px"
              >
                <el-form-item label="头像">
                  <el-upload
                    class="avatar-uploader"
                    action="/api/user/avatar"
                    :headers="{ Authorization: `Bearer ${token}` }"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload"
                  >
                    <img v-if="profileForm.avatar" :src="profileForm.avatar" class="avatar" />
                    <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
                  </el-upload>
                </el-form-item>
                
                <el-form-item label="用户名" prop="username">
                  <el-input v-model="profileForm.username" disabled />
                </el-form-item>
                
                <el-form-item label="昵称" prop="nickname">
                  <el-input v-model="profileForm.nickname" />
                </el-form-item>
                
                <el-form-item label="邮箱" prop="email">
                  <el-input v-model="profileForm.email" />
                </el-form-item>
                
                <el-form-item label="手机号" prop="phone">
                  <el-input v-model="profileForm.phone" />
                </el-form-item>
                
                <el-form-item>
                  <el-button type="primary" @click="updateProfile" :loading="updating">
                    保存修改
                  </el-button>
                </el-form-item>
              </el-form>
            </el-tab-pane>

            <!-- 账户安全 -->
            <el-tab-pane name="security" lazy>
              <template #label>
                <div class="flex items-center">
                  <el-icon class="mr-1"><Lock /></el-icon>
                  <span>账户安全</span>
                </div>
              </template>
              
              <div class="space-y-6">
                <!-- 修改密码 -->
                <div class="border-b pb-6">
                  <h3 class="text-lg font-medium mb-4">修改密码</h3>
                  <el-form
                    ref="passwordFormRef"
                    :model="passwordForm"
                    :rules="passwordRules"
                    label-width="100px"
                  >
                    <el-form-item label="当前密码" prop="currentPassword">
                      <el-input 
                        v-model="passwordForm.currentPassword" 
                        type="password"
                        show-password
                      />
                    </el-form-item>
                    
                    <el-form-item label="新密码" prop="newPassword">
                      <el-input 
                        v-model="passwordForm.newPassword" 
                        type="password"
                        show-password
                      />
                    </el-form-item>
                    
                    <el-form-item label="确认新密码" prop="confirmPassword">
                      <el-input 
                        v-model="passwordForm.confirmPassword" 
                        type="password"
                        show-password
                      />
                    </el-form-item>
                    
                    <el-form-item>
                      <el-button type="primary" @click="updatePassword" :loading="updatingPassword">
                        更新密码
                      </el-button>
                    </el-form-item>
                  </el-form>
                </div>
                
                <!-- 账号绑定 -->
                <div>
                  <h3 class="text-lg font-medium mb-4">账号绑定</h3>
                  <div class="space-y-4">
                    <div class="flex items-center justify-between">
                      <div class="flex items-center">
                        <img src="@/assets/wechat.png" alt="微信" class="w-6 h-6 mr-3">
                        <div>
                          <div class="font-medium">微信</div>
                          <div class="text-sm text-gray-500">未绑定</div>
                        </div>
                      </div>
                      <el-button>绑定</el-button>
                    </div>
                    
                    <div class="flex items-center justify-between">
                      <div class="flex items-center">
                        <img src="@/assets/alipay.png" alt="支付宝" class="w-6 h-6 mr-3">
                        <div>
                          <div class="font-medium">支付宝</div>
                          <div class="text-sm text-gray-500">未绑定</div>
                        </div>
                      </div>
                      <el-button>绑定</el-button>
                    </div>
                  </div>
                </div>
              </div>
            </el-tab-pane>

            <!-- 我的钱包 -->
            <el-tab-pane name="wallet" lazy>
              <template #label>
                <div class="flex items-center">
                  <el-icon class="mr-1"><Wallet /></el-icon>
                  <span>我的钱包</span>
                </div>
              </template>
              
              <div class="bg-primary bg-opacity-10 rounded-lg p-6 mb-6">
                <div class="flex items-center justify-between">
                  <div>
                    <div class="text-gray-600 mb-1">账户余额</div>
                    <div class="text-3xl font-bold">¥{{ userStats.balance || 0 }}</div>
                  </div>
                  <el-button type="primary" @click="showRechargeDialog = true">充值</el-button>
                </div>
              </div>
              
              <div class="mb-6 flex space-x-4">
                <el-radio-group v-model="transactionType" size="large">
                  <el-radio-button label="all">全部</el-radio-button>
                  <el-radio-button label="recharge">充值</el-radio-button>
                  <el-radio-button label="consume">消费</el-radio-button>
                  <el-radio-button label="refund">退款</el-radio-button>
                </el-radio-group>
              </div>
              
              <div v-if="transactions.length === 0" class="py-10 text-center text-gray-500">
                暂无交易记录
              </div>
              
              <div v-else class="space-y-4">
                <div
                  v-for="transaction in transactions"
                  :key="transaction.id"
                  class="p-4 border border-gray-200 rounded-lg"
                >
                  <div class="flex justify-between items-center">
                    <div>
                      <div class="font-medium">{{ transaction.title }}</div>
                      <div class="text-sm text-gray-500">
                        {{ formatDate(transaction.time) }}
                      </div>
                    </div>
                    <div class="text-lg font-medium" :class="{
                      'text-success': transaction.type === 'recharge' || transaction.type === 'refund',
                      'text-danger': transaction.type === 'consume'
                    }">
                      {{ transaction.type === 'consume' ? '-' : '+' }}¥{{ transaction.amount }}
                    </div>
                  </div>
                </div>
              </div>
              
              <div v-if="hasMoreTransactions" class="text-center mt-6">
                <el-button text @click="loadMoreTransactions">加载更多</el-button>
              </div>
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </div>
    </div>
    
    <!-- 评价对话框 -->
    <el-dialog
      v-model="feedbackDialogVisible"
      title="租赁评价"
      width="500px"
    >
      <el-form
        ref="feedbackFormRef"
        :model="feedbackForm"
        label-width="80px"
      >
        <el-form-item label="滑板车">
          <div>编号: {{ currentRental?.scooterCode }}</div>
        </el-form-item>
        
        <el-form-item label="评分">
          <el-rate v-model="feedbackForm.rating" />
        </el-form-item>
        
        <el-form-item label="评价内容">
          <el-input
            v-model="feedbackForm.content"
            type="textarea"
            :rows="3"
            placeholder="请输入您的评价内容"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="feedbackDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="submitFeedback" :loading="submittingFeedback">
            提交评价
          </el-button>
        </span>
      </template>
    </el-dialog>
    
    <!-- 充值对话框 -->
    <el-dialog
      v-model="showRechargeDialog"
      title="账户充值"
      width="400px"
    >
      <div class="mb-4">
        <div class="text-gray-600 mb-2">充值金额</div>
        <el-input-number
          v-model="rechargeAmount"
          :min="10"
          :max="10000"
          :step="10"
          class="w-full"
        />
      </div>
      
      <div class="mb-4">
        <div class="text-gray-600 mb-2">充值方式</div>
        <el-radio-group v-model="rechargeMethod">
          <el-radio label="alipay" class="!flex items-center mb-2">
            <img src="@/assets/alipay.png" alt="支付宝" class="w-6 h-6 ml-2">
            <span class="ml-2">支付宝</span>
          </el-radio>
          <el-radio label="wechat" class="!flex items-center">
            <img src="@/assets/wechat.png" alt="微信支付" class="w-6 h-6 ml-2">
            <span class="ml-2">微信支付</span>
          </el-radio>
        </el-radio-group>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="showRechargeDialog = false">取消</el-button>
          <el-button type="primary" @click="handleRecharge" :loading="recharging">
            确认充值
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import { useUserStore } from '@/stores/user'
import { useScooterStore } from '@/stores/scooter'
import { ElMessage } from 'element-plus'
import {
  User,
  Lock,
  Bicycle,
  Wallet,
  Plus,
  ArrowRight,
  CirclePlusFilled,
  ChatDotSquare,
  Setting,
  SwitchButton
} from '@element-plus/icons-vue'

const userStore = useUserStore()
const scooterStore = useScooterStore()

// 用户信息
const userInfo = computed(() => userStore.userInfo)
const token = computed(() => userStore.token)

// 用户统计数据
const userStats = ref({
  balance: 0,
  totalRentals: 0,
  points: 0
})

// 当前激活的标签
const activeTab = ref('rentals')

// 租赁历史
const rentalHistory = ref([])
const hasMoreRentals = ref(false)
const rentalPage = ref(1)

// 交易记录
const transactions = ref([])
const hasMoreTransactions = ref(false)
const transactionPage = ref(1)
const transactionType = ref('all')

// 评价相关
const feedbackDialogVisible = ref(false)
const currentRental = ref(null)
const feedbackForm = reactive({
  rating: 5,
  content: ''
})
const feedbackFormRef = ref(null)
const submittingFeedback = ref(false)

// 个人资料
const profileFormRef = ref(null)
const profileForm = reactive({
  username: '',
  nickname: '',
  email: '',
  phone: '',
  avatar: ''
})
const profileRules = {
  nickname: [
    { max: 20, message: '昵称长度不能超过20个字符', trigger: 'blur' }
  ],
  email: [
    { type: 'email', message: '请输入有效的邮箱地址', trigger: 'blur' }
  ],
  phone: [
    { pattern: /^1[3-9]\d{9}$/, message: '请输入有效的手机号码', trigger: 'blur' }
  ]
}
const updating = ref(false)

// 密码修改
const passwordFormRef = ref(null)
const passwordForm = reactive({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})
const passwordRules = {
  currentPassword: [
    { required: true, message: '请输入当前密码', trigger: 'blur' }
  ],
  newPassword: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    { min: 6, message: '密码长度不能少于6个字符', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: '请确认新密码', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value !== passwordForm.newPassword) {
          callback(new Error('两次输入的密码不一致'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ]
}
const updatingPassword = ref(false)

// 充值相关
const showRechargeDialog = ref(false)
const rechargeAmount = ref(100)
const rechargeMethod = ref('alipay')
const recharging = ref(false)

// 快捷菜单
const quickMenus = [
  { name: '在线客服', icon: 'ChatDotSquare', action: 'customerService' },
  { name: '邀请好友', icon: 'CirclePlusFilled', action: 'invite' },
  { name: '系统设置', icon: 'Setting', action: 'settings' },
  { name: '退出登录', icon: 'SwitchButton', action: 'logout' }
]

// 初始化页面数据
onMounted(async () => {
  if (userStore.isAuthenticated) {
    await Promise.all([
      fetchUserStats(),
      fetchRentalHistory(),
      fetchTransactions()
    ])

    // 初始化个人资料表单
    if (userInfo.value) {
      profileForm.username = userInfo.value.username || ''
      profileForm.nickname = userInfo.value.nickname || ''
      profileForm.email = userInfo.value.email || ''
      profileForm.phone = userInfo.value.phone || ''
      profileForm.avatar = userInfo.value.avatar || ''
    }
  }
})

// 获取用户统计数据
const fetchUserStats = async () => {
  try {
    const response = await fetch('/api/user/stats')
    if (response.ok) {
      userStats.value = await response.json()
    }
  } catch (error) {
    console.error('获取用户统计数据失败', error)
  }
}

// 获取租赁历史
const fetchRentalHistory = async () => {
  try {
    const result = await scooterStore.fetchRentalHistory({
      page: rentalPage.value,
      pageSize: 10
    })
    
    if (result.success) {
      rentalHistory.value = rentalPage.value === 1 
        ? result.data 
        : [...rentalHistory.value, ...result.data]
      hasMoreRentals.value = result.hasMore || false
    }
  } catch (error) {
    console.error('获取租赁历史失败', error)
  }
}

// 加载更多租赁历史
const loadMoreRentals = async () => {
  rentalPage.value++
  await fetchRentalHistory()
}

// 获取交易记录
const fetchTransactions = async () => {
  try {
    const response = await fetch(`/api/user/transactions?page=${transactionPage.value}&type=${transactionType.value}`)
    if (response.ok) {
      const data = await response.json()
      transactions.value = transactionPage.value === 1 
        ? data.items 
        : [...transactions.value, ...data.items]
      hasMoreTransactions.value = data.hasMore || false
    }
  } catch (error) {
    console.error('获取交易记录失败', error)
  }
}

// 加载更多交易记录
const loadMoreTransactions = async () => {
  transactionPage.value++
  await fetchTransactions()
}

// 结束租赁
const handleEndRental = async (rentalId) => {
  try {
    const result = await scooterStore.endRental(rentalId)
    if (result.success) {
      ElMessage.success('租赁已结束')
      // 刷新租赁历史
      rentalPage.value = 1
      await fetchRentalHistory()
    } else {
      ElMessage.error(result.message)
    }
  } catch (error) {
    console.error('结束租赁失败', error)
    ElMessage.error('结束租赁失败，请稍后重试')
  }
}

// 显示评价对话框
const showFeedbackDialog = (rental) => {
  currentRental.value = rental
  feedbackForm.rating = 5
  feedbackForm.content = ''
  feedbackDialogVisible.value = true
}

// 提交评价
const submitFeedback = async () => {
  if (!currentRental.value) return
  
  submittingFeedback.value = true
  try {
    const response = await fetch('/api/rentals/feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token.value}`
      },
      body: JSON.stringify({
        rentalId: currentRental.value.id,
        rating: feedbackForm.rating,
        content: feedbackForm.content
      })
    })
    
    if (response.ok) {
      ElMessage.success('评价提交成功')
      feedbackDialogVisible.value = false
      
      // 更新租赁记录状态
      const index = rentalHistory.value.findIndex(item => item.id === currentRental.value.id)
      if (index !== -1) {
        rentalHistory.value[index].hasReviewed = true
      }
    } else {
      const data = await response.json()
      throw new Error(data.message)
    }
  } catch (error) {
    ElMessage.error(error.message || '评价提交失败，请稍后重试')
  } finally {
    submittingFeedback.value = false
  }
}

// 更新个人资料
const updateProfile = async () => {
  if (!profileFormRef.value) return
  
  await profileFormRef.value.validate(async (valid, fields) => {
    if (valid) {
      updating.value = true
      try {
        const result = await userStore.updateProfile({
          nickname: profileForm.nickname,
          email: profileForm.email,
          phone: profileForm.phone
        })
        
        if (result.success) {
          ElMessage.success('个人资料已更新')
        } else {
          ElMessage.error(result.message)
        }
      } catch (error) {
        ElMessage.error('更新个人资料失败，请稍后重试')
      } finally {
        updating.value = false
      }
    }
  })
}

// 更新密码
const updatePassword = async () => {
  if (!passwordFormRef.value) return
  
  await passwordFormRef.value.validate(async (valid, fields) => {
    if (valid) {
      updatingPassword.value = true
      try {
        const result = await userStore.updatePassword({
          currentPassword: passwordForm.currentPassword,
          newPassword: passwordForm.newPassword
        })
        
        if (result.success) {
          ElMessage.success('密码已更新')
          passwordForm.currentPassword = ''
          passwordForm.newPassword = ''
          passwordForm.confirmPassword = ''
        } else {
          ElMessage.error(result.message)
        }
      } catch (error) {
        ElMessage.error('更新密码失败，请稍后重试')
      } finally {
        updatingPassword.value = false
      }
    }
  })
}

// 处理充值
const handleRecharge = async () => {
  if (rechargeAmount.value < 10) {
    ElMessage.warning('充值金额不能小于10元')
    return
  }
  
  recharging.value = true
  try {
    const result = await userStore.recharge({
      amount: rechargeAmount.value,
      method: rechargeMethod.value
    })
    
    if (result.success) {
      ElMessage.success('充值成功')
      showRechargeDialog.value = false
      
      // 更新余额
      userStats.value.balance += rechargeAmount.value
      
      // 刷新交易记录
      transactionPage.value = 1
      await fetchTransactions()
    } else {
      ElMessage.error(result.message)
    }
  } catch (error) {
    ElMessage.error('充值失败，请稍后重试')
  } finally {
    recharging.value = false
  }
}

// 处理快捷菜单点击
const handleQuickMenu = (action) => {
  switch (action) {
    case 'customerService':
      ElMessage.info('客服功能即将上线')
      break
    case 'invite':
      ElMessage.info('邀请好友功能即将上线')
      break
    case 'settings':
      activeTab.value = 'security'
      break
    case 'logout':
      userStore.logout()
      router.push('/login')
      ElMessage.success('已退出登录')
      break
  }
}

// 处理头像上传成功
const handleAvatarSuccess = (response) => {
  profileForm.avatar = response.url
  userInfo.value.avatar = response.url
  ElMessage.success('头像上传成功')
}

// 头像上传前的验证
const beforeAvatarUpload = (file) => {
  const isJPG = file.type === 'image/jpeg'
  const isPNG = file.type === 'image/png'
  const isLt2M = file.size / 1024 / 1024 < 2

  if (!isJPG && !isPNG) {
    ElMessage.error('头像图片只能是 JPG 或 PNG 格式!')
    return false
  }
  if (!isLt2M) {
    ElMessage.error('头像图片大小不能超过 2MB!')
    return false
  }
  return true
}

// 格式化日期
const formatDate = (date) => {
  return new Date(date).toLocaleString()
}

// 格式化时长
const formatDuration = (minutes) => {
  if (minutes < 60) {
    return `${minutes}分钟`
  }
  
  const hours = Math.floor(minutes / 60)
  const remainMinutes = minutes % 60
  
  if (remainMinutes === 0) {
    return `${hours}小时`
  }
  
  return `${hours}小时${remainMinutes}分钟`
}
</script>

<style scoped>
.avatar-uploader {
  width: 100px;
  height: 100px;
  border: 1px dashed var(--el-border-color);
  border-radius: 50%;
  overflow: hidden;
}

.avatar-uploader .el-upload {
  position: relative;
  width: 100%;
  height: 100%;
  cursor: pointer;
}

.avatar {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style> 