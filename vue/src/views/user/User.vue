<template>
  <div class="container mx-auto p-4">
    <!-- 添加调试信息 -->
    <div v-if="false" class="debug-info">
      <pre>{{ { feedbackFormRef: feedbackFormRef?.value } }}</pre>
    </div>
    <div class="mb-4 grid grid-cols-1 md:grid-cols-3 gap-4">
      <!-- 用户信息卡片 -->
      <div class="col-span-1 bg-white shadow rounded-lg p-4">
        <div class="flex flex-col items-center">
          <img 
            class="w-24 h-24 rounded-full object-cover mb-3" 
            :src="userInfo.avatar || 'https://via.placeholder.com/150'"
            alt="User avatar"
          />
          <h2 class="text-xl font-bold">{{ userInfo.username || '用户名' }}</h2>
          <p class="text-gray-500">{{ userInfo.email || '邮箱' }}</p>
          <div class="mt-4 w-full">
            <div class="flex justify-between items-center mb-2">
              <span>余额</span>
              <span class="font-bold">¥{{ userInfo.balance || '0.00' }}</span>
            </div>
            <el-button type="primary" class="w-full" @click="showRechargeDialog">充值</el-button>
          </div>
        </div>

        <div class="mt-6">
          <div class="border-t border-gray-200 pt-4">
            <div class="flex justify-between items-center mb-3">
              <span>会员状态</span>
              <el-tag :type="userInfo.vip ? 'success' : 'info'">
                {{ userInfo.vip ? 'VIP会员' : '普通会员' }}
              </el-tag>
            </div>
            <div class="flex justify-between items-center mb-3">
              <span>注册时间</span>
              <span>{{ formatDate(userInfo.registerTime) }}</span>
            </div>
            <div class="flex justify-between items-center mb-3">
              <span>信用分</span>
              <span class="font-bold text-green-500">{{ userInfo.creditScore || 100 }}</span>
            </div>
          </div>
        </div>
        
        <!-- 添加反馈按钮 -->
        <div class="mt-4 border-t border-gray-200 pt-4">
          <el-button type="primary" plain class="w-full" @click="openFeedback">
            <el-icon><ChatLineRound /></el-icon>
            <span class="ml-1">问题反馈</span>
          </el-button>
        </div>
      </div>

      <!-- 骑行统计卡片 -->
      <div class="col-span-2 bg-white shadow rounded-lg p-4">
        <h3 class="text-lg font-bold mb-4">骑行统计</h3>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div class="text-center p-3 bg-blue-50 rounded-lg">
            <div class="text-2xl font-bold text-blue-500">{{ rideStats.totalRides || 0 }}</div>
            <div class="text-sm text-gray-500">总骑行次数</div>
          </div>
          <div class="text-center p-3 bg-green-50 rounded-lg">
            <div class="text-2xl font-bold text-green-500">{{ rideStats.totalDistance || 0 }} km</div>
            <div class="text-sm text-gray-500">总骑行里程</div>
          </div>
          <div class="text-center p-3 bg-purple-50 rounded-lg">
            <div class="text-2xl font-bold text-purple-500">{{ rideStats.totalDuration || 0 }} 分钟</div>
            <div class="text-sm text-gray-500">总骑行时长</div>
          </div>
          <div class="text-center p-3 bg-yellow-50 rounded-lg">
            <div class="text-2xl font-bold text-yellow-500">¥{{ rideStats.totalSpent || 0 }}</div>
            <div class="text-sm text-gray-500">总消费金额</div>
          </div>
        </div>

        <h3 class="text-lg font-bold mb-4">近期骑行记录</h3>
        <el-table :data="recentRides" stripe style="width: 100%">
          <el-table-column prop="date" label="日期" width="180" />
          <el-table-column prop="duration" label="时长(分钟)" width="100" />
          <el-table-column prop="distance" label="里程(km)" width="100" />
          <el-table-column prop="amount" label="消费(元)" width="100" />
          <el-table-column prop="status" label="状态">
            <template #default="scope">
              <el-tag :type="scope.row.status === '已完成' ? 'success' : 'warning'">
                {{ scope.row.status }}
              </el-tag>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <!-- 充值对话框 -->
    <el-dialog
      v-model="rechargeDialogVisible"
      title="账户充值"
      width="400px"
    >
      <el-form :model="rechargeForm" label-position="top">
        <el-form-item label="充值金额">
          <el-input-number
            v-model="rechargeForm.amount"
            :min="10"
            :max="1000"
            step-strictly
            class="w-full"
          />
        </el-form-item>
        <el-form-item label="支付方式">
          <el-radio-group v-model="rechargeForm.paymentMethod">
            <el-radio label="alipay">支付宝</el-radio>
            <el-radio label="wechat">微信支付</el-radio>
            <el-radio label="creditCard">银行卡</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="rechargeDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleRecharge">确认充值</el-button>
        </span>
      </template>
    </el-dialog>
    
    <!-- 引入反馈表单组件 -->
    <FeedbackForm ref="feedbackFormRef" @submit-success="handleFeedbackSubmitted" />
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import { ChatLineRound } from '@element-plus/icons-vue';
import FeedbackForm from '@/components/FeedbackForm.vue';

// 添加调试日志
console.log('ChatLineRound icon:', ChatLineRound);
console.log('FeedbackForm component:', FeedbackForm);

// 用户信息
const userInfo = reactive({
  username: '张三',
  email: 'zhangsan@example.com',
  avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  balance: 128.5,
  vip: true,
  registerTime: '2022-05-15',
  creditScore: 98
});

// 骑行统计
const rideStats = reactive({
  totalRides: 42,
  totalDistance: 126.8,
  totalDuration: 354,
  totalSpent: 213.6
});

// 近期骑行记录
const recentRides = ref([
  {
    date: '2023-05-15 14:30',
    duration: 25,
    distance: 3.2,
    amount: 5.5,
    status: '已完成'
  },
  {
    date: '2023-05-12 09:45',
    duration: 18,
    distance: 2.1,
    amount: 4.0,
    status: '已完成'
  },
  {
    date: '2023-05-10 16:20',
    duration: 30,
    distance: 4.0,
    amount: 6.5,
    status: '已完成'
  },
  {
    date: '2023-05-08 12:10',
    duration: 15,
    distance: 1.8,
    amount: 3.5,
    status: '已完成'
  }
]);

// 充值相关
const rechargeDialogVisible = ref(false);
const rechargeForm = reactive({
  amount: 50,
  paymentMethod: 'alipay'
});

// 反馈表单引用
const feedbackFormRef = ref(null);

// 格式化日期
const formatDate = (dateString) => {
  if (!dateString) return '';
  
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  return new Date(dateString).toLocaleDateString('zh-CN', options);
};

// 显示充值对话框
const showRechargeDialog = () => {
  rechargeDialogVisible.value = true;
};

// 处理充值
const handleRecharge = () => {
  // 模拟充值操作
  setTimeout(() => {
    userInfo.balance += rechargeForm.amount;
    rechargeDialogVisible.value = false;
    
    ElMessage({
      type: 'success',
      message: `充值${rechargeForm.amount}元成功！`,
      duration: 2000
    });
  }, 1000);
};

// 打开反馈表单
const openFeedback = () => {
  if (feedbackFormRef.value) {
    feedbackFormRef.value.open();
  } else {
    console.error('FeedbackForm reference is not available');
  }
};

// 处理反馈提交成功
const handleFeedbackSubmitted = () => {
  ElMessage({
    type: 'success',
    message: '感谢您的反馈，我们会尽快处理',
    duration: 2000
  });
};

onMounted(() => {
  console.log('User component mounted');
  console.log('FeedbackForm ref:', feedbackFormRef.value);
});
</script>

<style scoped>
/* 添加调试样式 */
.debug-info {
  position: fixed;
  top: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 10px;
  z-index: 9999;
}

/* 添加必要的样式 */
.ml-1 {
  margin-left: 0.25rem;
}
</style> 