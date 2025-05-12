<template>
  <div class="admin-dashboard">
    <div class="max-w-7xl mx-auto px-4 py-6">
      <!-- 页面标题 -->
      <div class="mb-6 border-b pb-4">
        <h1 class="text-2xl font-bold text-gray-800">Control Panel</h1>
        <p class="text-gray-600">Electric Skateboard Rental System Management Backend</p>
        <div class="mt-2 flex gap-2">
          <el-button type="primary" size="small" @click="refreshData">
            <el-icon class="mr-1"><Refresh /></el-icon>Refresh Data
          </el-button>
          <el-button size="small" @click="goToHome">
            <el-icon class="mr-1"><Back /></el-icon>Return to Homepage
          </el-button>
        </div>
      </div>

      <!-- 统计数据卡片 -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div class="bg-white rounded-lg shadow p-4 border-l-4 border-blue-500">
          <div class="flex justify-between">
            <div>
              <div class="text-sm text-gray-500 mb-1">Total Users</div>
              <div class="text-2xl font-bold text-gray-800">{{ statistics.users }}</div>
              <div class="text-xs text-green-600 mt-1">
                <span class="font-medium">+12.5%</span> This Week Growth
              </div>
            </div>
            <div class="p-2 bg-blue-50 rounded-lg">
              <el-icon size="28" class="text-blue-500"><User /></el-icon>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-4 border-l-4 border-green-500">
          <div class="flex justify-between">
            <div>
              <div class="text-sm text-gray-500 mb-1">Total Orders</div>
              <div class="text-2xl font-bold text-gray-800">{{ statistics.orders }}</div>
              <div class="text-xs text-green-600 mt-1">
                <span class="font-medium">+8.2%</span> This Week Growth
              </div>
            </div>
            <div class="p-2 bg-green-50 rounded-lg">
              <el-icon size="28" class="text-green-500"><List /></el-icon>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-4 border-l-4 border-purple-500">
          <div class="flex justify-between">
            <div>
              <div class="text-sm text-gray-500 mb-1">Total Revenue</div>
              <div class="text-2xl font-bold text-gray-800">¥{{ statistics.revenue }}</div>
              <div class="text-xs text-green-600 mt-1">
                <span class="font-medium">+5.3%</span> This Week Growth
              </div>
            </div>
            <div class="p-2 bg-purple-50 rounded-lg">
              <el-icon size="28" class="text-purple-500"><Money /></el-icon>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-4 border-l-4 border-amber-500">
          <div class="flex justify-between">
            <div>
              <div class="text-sm text-gray-500 mb-1">Online Vehicles</div>
              <div class="text-2xl font-bold text-gray-800">{{ statistics.onlineVehicles }}/{{ statistics.totalVehicles }}</div>
              <div class="text-xs text-amber-600 mt-1">
                <span class="font-medium">{{ statistics.onlineRate }}%</span> Online Rate
              </div>
            </div>
            <div class="p-2 bg-amber-50 rounded-lg">
              <el-icon size="28" class="text-amber-500"><Connection /></el-icon>
            </div>
          </div>
        </div>
      </div>

      <!-- 快速访问 -->
      <div class="mb-6">
        <h2 class="text-lg font-medium text-gray-700 mb-4">Quick Access</h2>
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <router-link to="/admin/users" class="dashboard-card">
            <el-icon class="text-blue-500"><User /></el-icon>
            <span>User Management</span>
          </router-link>

          <router-link to="/admin/vehicles" class="dashboard-card">
            <el-icon class="text-green-500"><Connection /></el-icon>
            <span>Vehicle Management</span>
          </router-link>

          <router-link to="/admin/orders" class="dashboard-card">
            <el-icon class="text-purple-500"><List /></el-icon>
            <span>Order Management</span>
          </router-link>

          <router-link to="/admin/feedback" class="dashboard-card">
            <el-icon class="text-red-500"><ChatDotRound /></el-icon>
            <span>Feedback Management</span>
          </router-link>

          <router-link to="/admin/maintenance" class="dashboard-card">
            <el-icon class="text-orange-500"><Tools /></el-icon>
            <span>Issue Feedback</span>
          </router-link>

          <router-link to="/admin/reports" class="dashboard-card">
            <el-icon class="text-indigo-500"><TrendCharts /></el-icon>
            <span>Data Reports</span>
          </router-link>

          <router-link to="/admin/charts" class="dashboard-card">
            <el-icon class="text-teal-500"><DataAnalysis /></el-icon>
            <span>Chart Test</span>
          </router-link>
        </div>
      </div>

      <!-- 系统状态 -->
      <div class="mb-6">
        <h2 class="text-lg font-medium text-gray-700 mb-4">System Status</h2>
        <div class="bg-white rounded-lg shadow p-4">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="bg-gray-50 rounded-lg p-3">
              <div class="flex justify-between items-center mb-2">
                <span class="text-sm font-medium text-gray-700">Server Load</span>
                <span class="text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full">Normal</span>
              </div>
              <el-progress :percentage="serverStatus.load" color="#10b981"></el-progress>
              <div class="text-xs text-gray-500 mt-1">CPU: {{ serverStatus.cpu }}% | Memory: {{ serverStatus.memory }}</div>
            </div>

            <div class="bg-gray-50 rounded-lg p-3">
              <div class="flex justify-between items-center mb-2">
                <span class="text-sm font-medium text-gray-700">Database Status</span>
                <span class="text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full">Normal</span>
              </div>
              <el-progress :percentage="serverStatus.dbLoad" color="#10b981"></el-progress>
              <div class="text-xs text-gray-500 mt-1">Connection: {{ serverStatus.dbConnections }} | Query: {{ serverStatus.dbQueries }}/s</div>
            </div>

            <div class="bg-gray-50 rounded-lg p-3">
              <div class="flex justify-between items-center mb-2">
                <span class="text-sm font-medium text-gray-700">API Service</span>
                <span class="text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full">Normal</span>
              </div>
              <el-progress :percentage="serverStatus.apiLoad" color="#10b981"></el-progress>
              <div class="text-xs text-gray-500 mt-1">Response Time: {{ serverStatus.apiResponseTime }}ms | Error Rate: {{ serverStatus.apiErrorRate }}%</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 每日收入统计图表 -->
      <div class="mb-6">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-lg font-medium text-gray-700">Daily Income Statistics</h2>
          <div class="flex items-center space-x-2">
            <el-select v-model="chartPeriod" size="small" @change="renderIncomeChart">
              <el-option label="Last 7 Days" value="7" />
              <el-option label="Last 30 Days" value="30" />
            </el-select>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-4">
          <div v-if="chartLoading" class="flex justify-center items-center" style="height: 400px;">
            <el-icon class="animate-spin text-blue-500 mr-2" size="24"><Loading /></el-icon>
            <span class="text-gray-500">Chart Loading...</span>
          </div>
          <div ref="incomeChartRef" class="h-96 w-full"></div>
        </div>
      </div>

      <!-- 用户反馈概览 -->
      <div class="mb-6">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-lg font-medium text-gray-700">Latest User Feedback</h2>
          <div class="flex items-center space-x-2">
            <el-button
              type="primary"
              size="small"
              plain
              @click="generateTestFeedback"
              class="mr-2"
            >
              <el-icon class="mr-1"><Plus /></el-icon>Generate Test Data
            </el-button>
            <router-link to="/admin/feedback" class="text-blue-500 text-sm hover:text-blue-700 flex items-center">
              View All <el-icon class="ml-1"><ArrowRight /></el-icon>
            </router-link>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow overflow-hidden">
          <div v-loading="feedbackLoading" class="divide-y">
            <div v-if="latestFeedback.length === 0" class="p-8 text-center text-gray-500">
              <el-icon class="text-gray-300 mb-2" size="32"><ChatDotRound /></el-icon>
              <p>No pending user feedback</p>
            </div>

            <div v-for="(feedback, index) in latestFeedback" :key="index" class="p-4 hover:bg-gray-50">
              <div class="flex justify-between items-start">
                <div class="flex items-start space-x-3">
                  <div :class="`p-2 rounded-full ${getTypeBgClass(feedback.type)}`">
                    <el-icon><ChatDotRound /></el-icon>
                  </div>
                  <div>
                    <div class="flex items-center mb-1">
                      <span class="text-sm font-medium text-gray-700 mr-2">{{ feedback.username }}</span>
                      <el-tag size="small" :type="getTypeTagType(feedback.type)">{{ getTypeLabel(feedback.type) }}</el-tag>
                    </div>
                    <p class="text-sm text-gray-600 line-clamp-2">{{ feedback.content }}</p>
                    <div class="flex items-center mt-1">
                      <el-tag size="small" :type="getStatusTagType(feedback.status)" class="mr-2">
                        {{ getStatusLabel(feedback.status) }}
                      </el-tag>
                      <span class="text-xs text-gray-500">{{ formatDate(feedback.timestamp) }}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <el-button
                    type="primary"
                    size="small"
                    @click="viewFeedback(feedback)"
                    plain
                  >
                    Handle
                  </el-button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 系统事件 -->
      <div>
        <h2 class="text-lg font-medium text-gray-700 mb-4">Recent System Events</h2>
        <div class="bg-white rounded-lg shadow p-4">
          <div class="divide-y">
            <div v-for="(event, index) in systemEvents" :key="index" class="py-3 flex items-start">
              <div :class="`p-1.5 rounded-full ${event.iconClass} mr-3`">
                <el-icon><component :is="event.icon" /></el-icon>
              </div>
              <div class="flex-1">
                <div class="flex justify-between">
                  <span class="text-sm font-medium text-gray-700">{{ event.title }}</span>
                  <span class="text-xs text-gray-500">{{ event.time }}</span>
                </div>
                <div class="text-xs text-gray-500 mt-1">{{ event.description }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted, computed } from 'vue';
import {
  User,
  List,
  Money,
  Connection,
  Warning,
  CircleCloseFilled,
  Success,
  InfoFilled,
  Back,
  Tools,
  Setting,
  Refresh,
  TrendCharts,
  DataAnalysis,
  PieChart,
  ChatDotRound,
  ArrowRight,
  Plus,
  Loading
} from '@element-plus/icons-vue';
import { useUserStore } from '@/stores/user';
import { useRouter } from 'vue-router';
import { ElMessage, ElMessageBox } from 'element-plus';
import * as echarts from 'echarts'; // 直接导入echarts

const userStore = useUserStore();
const router = useRouter();
const isLoading = ref(false);

// 统计数据
const statistics = reactive({
  users: 1876,
  orders: 2456,
  revenue: '98,765.50',
  totalVehicles: 368,
  onlineVehicles: 325,
  onlineRate: 88.32
});

// 服务器状态数据
const serverStatus = reactive({
  load: 42,
  cpu: 42,
  memory: '1.8GB/4GB',
  dbLoad: 28,
  dbConnections: 24,
  dbQueries: 128,
  apiLoad: 15,
  apiResponseTime: 68,
  apiErrorRate: 0.03
});

// 系统事件数据
const systemEvents = reactive([
  {
    title: 'System Update Available',
    time: 'Today 08:45',
    description: 'A new system update is available, it is recommended to upgrade during off-peak hours',
    icon: 'Warning',
    iconClass: 'bg-amber-100 text-amber-600'
  },
  {
    title: 'Vehicle Offline Alarm',
    time: 'Today 10:23',
    description: 'ID:10043 - The skateboard has been offline for more than 24 hours without communication with the system',
    icon: 'CircleCloseFilled',
    iconClass: 'bg-red-100 text-red-600'
  },
  {
    title: 'Database Backup Completed',
    time: 'Today 02:00',
    description: 'Complete database backup has been successfully completed and stored to the cloud',
    icon: 'Success',
    iconClass: 'bg-green-100 text-green-600'
  },
  {
    title: 'New Admin Account Created',
    time: 'Yesterday 15:30',
    description: 'Admin "Zhang Manager" has been created, permission level: Intermediate Administrator',
    icon: 'InfoFilled',
    iconClass: 'bg-blue-100 text-blue-600'
  }
]);

// 反馈相关
const feedbackLoading = ref(false);
const latestFeedback = ref([]);
const feedbackDialog = ref(false);
const currentFeedback = ref(null);
const replyMessage = ref('');

// 收入图表数据
const chartPeriod = ref('7');
const chartLoading = ref(true);
const incomeChartRef = ref(null);
let incomeChart = null; // echarts实例

// 获取最新反馈
const fetchLatestFeedback = () => {
  feedbackLoading.value = true;

  try {
    // 从本地存储获取反馈数据
    const storedFeedback = JSON.parse(localStorage.getItem('userFeedback') || '[]');

    // 过滤出未解决的反馈并按时间排序（降序）
    latestFeedback.value = storedFeedback
      .filter(item => item.status !== 'resolved')
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(0, 3); // 只显示最新的3条

    console.log('已加载最新反馈:', latestFeedback.value.length);

  } catch (error) {
    console.error('获取反馈数据失败:', error);
    latestFeedback.value = [];
  } finally {
    feedbackLoading.value = false;
  }
};

// 查看反馈详情
const viewFeedback = (feedback) => {
  // 跳转到反馈管理页面
  router.push('/admin/feedback');
};

// 反馈类型背景样式
const getTypeBgClass = (type) => {
  const typeMap = {
    scooter_issue: 'bg-red-100 text-red-600',
    account_issue: 'bg-amber-100 text-amber-600',
    payment_issue: 'bg-amber-100 text-amber-600',
    app_suggestion: 'bg-blue-100 text-blue-600',
    other: 'bg-gray-100 text-gray-600'
  };
  return typeMap[type] || 'bg-gray-100 text-gray-600';
};

// 类型标签类型映射
const getTypeTagType = (type) => {
  const typeMap = {
    scooter_issue: 'danger',
    account_issue: 'warning',
    payment_issue: 'warning',
    app_suggestion: 'info',
    other: ''
  };
  return typeMap[type] || '';
};

// 类型标签文本映射
const getTypeLabel = (type) => {
  const typeMap = {
    scooter_issue: 'Vehicle Issue',
    account_issue: 'Account Issue',
    payment_issue: 'Payment Issue',
    app_suggestion: 'Application Suggestion',
    other: 'Other Issues'
  };
  return typeMap[type] || 'Unknown';
};

// 状态标签类型映射
const getStatusTagType = (status) => {
  const statusMap = {
    pending: 'danger',
    in_progress: 'warning',
    resolved: 'success'
  };
  return statusMap[status] || 'info';
};

// 状态标签文本映射
const getStatusLabel = (status) => {
  const statusMap = {
    pending: 'Pending',
    in_progress: 'In Progress',
    resolved: 'Resolved'
  };
  return statusMap[status] || 'Unknown';
};

// 刷新数据
const refreshData = () => {
  isLoading.value = true;
  ElMessage.success('正在刷新数据...');

  // 模拟数据加载
  setTimeout(() => {
    // 更新一些随机数据
    statistics.users = Math.floor(Math.random() * 50) + 100;
    statistics.orders = Math.floor(Math.random() * 100) + 300;
    statistics.revenue = Math.floor(Math.random() * 1000) + 3000;

    isLoading.value = false;
    ElMessage.success('数据刷新成功');

    // 同时刷新反馈数据
    fetchLatestFeedback();
  }, 1500);
};

// 生成测试反馈数据
const generateTestFeedback = () => {
  const types = ['scooter_issue', 'account_issue', 'payment_issue', 'app_suggestion', 'other'];
  const statuses = ['pending', 'in_progress', 'resolved'];
  const users = ['Zhang San', 'Li Si', 'Wang Wu', 'Zhao Liu', 'Qian Qi', 'Sun Ba'];
  const contents = [
    'The brake of the vehicle is not sensitive enough',
    'The balance after recharge did not arrive immediately',
    'I hope you can add a monthly card function to use it more conveniently',
    'The vehicle location on the map is not accurate',
    'The application crashes and cannot be used normally',
    'The vehicle battery display is not accurate',
    'Account login exception, prompting password error',
    'Suggest adding a point redemption function'
  ];

  // 生成5条随机测试数据
  const testFeedback = [];
  for (let i = 0; i < 5; i++) {
    const type = types[Math.floor(Math.random() * types.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const username = users[Math.floor(Math.random() * users.length)];
    const content = contents[Math.floor(Math.random() * contents.length)];

    // 创建反馈对象
    const feedback = {
      id: `feedback-${Date.now()}-${i}`,
      type,
      content,
      username,
      contact: `138${Math.floor(10000000 + Math.random() * 90000000)}`,
      timestamp: new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)).toISOString(),
      status
    };

    // 如果是车辆故障，添加车辆ID
    if (type === 'scooter_issue') {
      feedback.scooterId = `SC-${10000 + Math.floor(Math.random() * 1000)}`;
    }

    // 如果是处理中，添加一些回复
    if (status === 'in_progress') {
      feedback.replies = [
        {
          content: 'Hello, we have received your feedback and are processing it...',
          timestamp: new Date(new Date(feedback.timestamp).getTime() + 30 * 60 * 1000).toISOString(),
          admin: true
        }
      ];
    }

    testFeedback.push(feedback);
  }

  // 获取现有反馈
  let existingFeedback = [];
  try {
    existingFeedback = JSON.parse(localStorage.getItem('userFeedback') || '[]');
  } catch (error) {
    console.error('解析现有反馈失败:', error);
  }

  // 合并现有反馈和测试反馈
  const mergedFeedback = [...existingFeedback, ...testFeedback];

  // 保存到localStorage
  localStorage.setItem('userFeedback', JSON.stringify(mergedFeedback));

  // 刷新显示
  fetchLatestFeedback();

  // 显示提示
  ElMessage({
    type: 'success',
    message: `已生成 ${testFeedback.length} 条测试反馈数据`,
    duration: 2000
  });
};

const goToHome = () => {
  router.push('/');
};

onMounted(() => {
  console.log('Dashboard component mounted, isAdmin:', userStore.isAdmin);

  // 获取最新反馈
  fetchLatestFeedback();

  // 初始化收入图表
  setTimeout(() => {
    renderIncomeChart();
  }, 300);

  // 监听窗口大小变化
  window.addEventListener('resize', handleChartResize);
});

onUnmounted(() => {
  // 销毁图表实例
  if (incomeChart) {
    incomeChart.dispose();
    incomeChart = null;
  }

  // 移除窗口大小变化监听
  window.removeEventListener('resize', handleChartResize);
});

// 格式化日期时间
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleString('zh-CN', {
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });
}

// 渲染收入图表
const renderIncomeChart = () => {
  if (!incomeChartRef.value) {
    console.error('找不到图表容器');
    return;
  }

  chartLoading.value = true;

  // 销毁旧图表
  if (incomeChart) {
    incomeChart.dispose();
  }

  // 创建新图表
  incomeChart = echarts.init(incomeChartRef.value);

  // 生成模拟数据
  const days = parseInt(chartPeriod.value);
  const dates = [];
  const totalData = [];
  const rentalData = [];
  const memberData = [];

  const today = new Date();
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date();
    date.setDate(today.getDate() - i);
    dates.push(`${date.getMonth() + 1}/${date.getDate()}`);

    // 生成随机数据
    const total = Math.floor(Math.random() * 1000) + 500;
    const rental = Math.floor(total * 0.7);
    const member = total - rental;

    totalData.push(total);
    rentalData.push(rental);
    memberData.push(member);
  }

  // 设置图表选项
  const option = {
    backgroundColor: '#fff',
    title: {
      text: 'Daily Income Statistics',
      left: 'center'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: ['Total Revenue', 'Rental Revenue', 'Member Revenue'],
      top: 30
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      top: 80,
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: dates
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: '¥{value}'
      }
    },
    series: [
      {
        name: 'Total Revenue',
        type: 'line',
        data: totalData,
        smooth: true,
        lineStyle: {
          width: 3
        },
        itemStyle: {
          color: '#409EFF'
        }
      },
      {
        name: 'Rental Revenue',
        type: 'bar',
        stack: 'income',
        data: rentalData,
        itemStyle: {
          color: '#67C23A'
        }
      },
      {
        name: 'Member Revenue',
        type: 'bar',
        stack: 'income',
        data: memberData,
        itemStyle: {
          color: '#E6A23C'
        }
      }
    ]
  };

  // 设置图表选项
  incomeChart.setOption(option);
  chartLoading.value = false;
  console.log('收入图表已渲染，周期:', days, '天');
};

// 处理窗口大小变化
const handleChartResize = () => {
  if (incomeChart) {
    incomeChart.resize();
  }
};
</script>

<style scoped>
.dashboard-card {
  @apply bg-white rounded-lg shadow p-4 flex flex-col items-center justify-center transition-all hover:shadow-md cursor-pointer;
}

.dashboard-card .el-icon {
  @apply text-2xl mb-2;
}

.dashboard-card span {
  @apply text-xs text-gray-700;
}

.chart {
  width: 100%;
  height: 100%;
}
</style>
