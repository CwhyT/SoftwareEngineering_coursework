<template>
  <div class="p-6">
    <!-- 统计卡片 -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <el-card 
        v-for="stat in stats" 
        :key="stat.title"
        :body-style="{ padding: '20px' }"
        class="hover:shadow-lg transition-shadow"
      >
        <div class="flex items-center">
          <el-icon class="text-3xl mr-4" :class="stat.iconClass">
            <component :is="stat.icon" />
          </el-icon>
          <div>
            <div class="text-gray-500 text-sm mb-1">{{ stat.title }}</div>
            <div class="text-2xl font-bold">{{ stat.value }}</div>
            <div class="text-sm mt-2" :class="stat.trend >= 0 ? 'text-success' : 'text-danger'">
              {{ stat.trend >= 0 ? '+' : '' }}{{ stat.trend }}%
              <span class="text-gray-500 ml-1">较上周</span>
            </div>
          </div>
        </div>
      </el-card>
    </div>

    <!-- 图表区域 -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- 收入趋势图 -->
      <el-card class="mb-6">
        <template #header>
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <el-icon class="mr-2"><TrendCharts /></el-icon>
              <span>收入趋势</span>
            </div>
            <el-radio-group v-model="revenueTimeRange" size="small">
              <el-radio-button label="week">本周</el-radio-button>
              <el-radio-button label="month">本月</el-radio-button>
              <el-radio-button label="year">全年</el-radio-button>
            </el-radio-group>
          </div>
        </template>
        <div ref="revenueChartRef" class="h-[400px]"></div>
      </el-card>

      <!-- 用户活跃度图 -->
      <el-card class="mb-6">
        <template #header>
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <el-icon class="mr-2"><User /></el-icon>
              <span>用户活跃度</span>
            </div>
            <el-radio-group v-model="userTimeRange" size="small">
              <el-radio-button label="week">本周</el-radio-button>
              <el-radio-button label="month">本月</el-radio-button>
            </el-radio-group>
          </div>
        </template>
        <div ref="userChartRef" class="h-[400px]"></div>
      </el-card>

      <!-- 设备使用率图 -->
      <el-card class="mb-6">
        <template #header>
          <div class="flex items-center">
            <el-icon class="mr-2"><DataLine /></el-icon>
            <span>设备使用率</span>
          </div>
        </template>
        <div ref="deviceChartRef" class="h-[400px]"></div>
      </el-card>

      <!-- 问题反馈统计 -->
      <el-card class="mb-6">
        <template #header>
          <div class="flex items-center">
            <el-icon class="mr-2"><ChatDotSquare /></el-icon>
            <span>问题反馈统计</span>
          </div>
        </template>
        <div ref="feedbackChartRef" class="h-[400px]"></div>
      </el-card>
    </div>

    <!-- 最近活动 -->
    <el-card>
      <template #header>
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <el-icon class="mr-2"><List /></el-icon>
            <span>最近活动</span>
          </div>
          <el-button text @click="loadMoreActivities">
            查看更多
          </el-button>
        </div>
      </template>

      <el-timeline>
        <el-timeline-item
          v-for="activity in recentActivities"
          :key="activity.id"
          :timestamp="activity.time"
          :type="activity.type"
        >
          {{ activity.content }}
        </el-timeline-item>
      </el-timeline>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useAdminStore } from '@/stores/admin'
import * as echarts from 'echarts'
import {
  User,
  Money,
  DataLine,
  ChatDotSquare,
  List,
  TrendCharts
} from '@element-plus/icons-vue'

const adminStore = useAdminStore()

// 统计数据
const stats = ref([
  {
    title: '总用户数',
    value: '0',
    icon: 'User',
    iconClass: 'text-primary',
    trend: 0
  },
  {
    title: '今日收入',
    value: '¥0',
    icon: 'Money',
    iconClass: 'text-success',
    trend: 0
  },
  {
    title: '活跃设备',
    value: '0',
    icon: 'DataLine',
    iconClass: 'text-warning',
    trend: 0
  },
  {
    title: '待处理反馈',
    value: '0',
    icon: 'ChatDotSquare',
    iconClass: 'text-danger',
    trend: 0
  }
])

// 图表相关
const revenueTimeRange = ref('week')
const userTimeRange = ref('week')
const revenueChartRef = ref(null)
const userChartRef = ref(null)
const deviceChartRef = ref(null)
const feedbackChartRef = ref(null)
let revenueChart = null
let userChart = null
let deviceChart = null
let feedbackChart = null

// 最近活动
const recentActivities = ref([])

// 初始化收入趋势图
const initRevenueChart = async () => {
  if (!revenueChartRef.value) return
  
  revenueChart = echarts.init(revenueChartRef.value)
  
  try {
    const result = await adminStore.fetchRevenueTrend(revenueTimeRange.value)
    if (result.success) {
      const { dates, values } = result.data
      const option = {
        tooltip: {
          trigger: 'axis'
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: dates || ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '收入',
            type: 'line',
            smooth: true,
            data: values || [820, 932, 901, 934, 1290, 1330, 1320],
            areaStyle: {
              opacity: 0.1
            },
            lineStyle: {
              width: 3
            }
          }
        ]
      }
      revenueChart.setOption(option)
    }
  } catch (error) {
    console.error('加载收入趋势图失败', error)
  }
}

// 初始化用户活跃度图
const initUserChart = async () => {
  if (!userChartRef.value) return

  userChart = echarts.init(userChartRef.value)
  
  try {
    const result = await adminStore.fetchUserActivity(userTimeRange.value)
    if (result.success) {
      const { dates, newUsers, activeUsers } = result.data
      const option = {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['新增用户', '活跃用户']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: dates || ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '新增用户',
            type: 'line',
            stack: 'Total',
            data: newUsers || [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: '活跃用户',
            type: 'line',
            stack: 'Total',
            data: activeUsers || [220, 182, 191, 234, 290, 330, 310]
          }
        ]
      }
      userChart.setOption(option)
    }
  } catch (error) {
    console.error('加载用户活跃度图失败', error)
  }
}

// 初始化设备使用率图
const initDeviceChart = async () => {
  if (!deviceChartRef.value) return

  deviceChart = echarts.init(deviceChartRef.value)
  
  try {
    const result = await adminStore.fetchDeviceUsage()
    if (result.success) {
      const { data } = result
      const option = {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        series: [
          {
            name: '设备状态',
            type: 'pie',
            radius: '50%',
            data: data || [
              { value: 1048, name: '使用中' },
              { value: 735, name: '空闲' },
              { value: 580, name: '维修中' },
              { value: 484, name: '离线' }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
      deviceChart.setOption(option)
    }
  } catch (error) {
    console.error('加载设备使用率图失败', error)
  }
}

// 初始化反馈统计图
const initFeedbackChart = async () => {
  if (!feedbackChartRef.value) return

  feedbackChart = echarts.init(feedbackChartRef.value)
  
  try {
    const result = await adminStore.fetchFeedbackStats()
    if (result.success) {
      const { categories, values } = result.data
      const option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: categories || ['设备故障', '软件问题', '账户问题', '计费问题', '其他'],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '问题数量',
            type: 'bar',
            barWidth: '60%',
            data: values || [10, 52, 200, 334, 390]
          }
        ]
      }
      feedbackChart.setOption(option)
    }
  } catch (error) {
    console.error('加载反馈统计图失败', error)
  }
}

// 获取仪表盘数据
const fetchDashboardData = async () => {
  const result = await adminStore.fetchDashboardStats()
  if (result.success) {
    // 更新统计数据
    stats.value[0].value = adminStore.dashboardStats.totalUsers
    stats.value[0].trend = adminStore.dashboardStats.usersTrend
    
    stats.value[1].value = `¥${adminStore.dashboardStats.totalRevenue}`
    stats.value[1].trend = adminStore.dashboardStats.revenueTrend
    
    stats.value[2].value = adminStore.dashboardStats.activeRentals
    stats.value[2].trend = adminStore.dashboardStats.rentalsTrend
    
    stats.value[3].value = adminStore.dashboardStats.pendingFeedbacks
    stats.value[3].trend = adminStore.dashboardStats.feedbacksTrend
    
    // 获取最近活动
    fetchRecentActivities()
  }
}

// 获取最近活动
const fetchRecentActivities = async () => {
  const result = await adminStore.fetchRecentActivities()
  if (result.success) {
    recentActivities.value = adminStore.recentActivities
  }
}

// 加载更多活动
const loadMoreActivities = async () => {
  // 计算下一页
  const nextPage = Math.ceil(recentActivities.value.length / 10) + 1
  
  // 调用API获取更多活动
  const result = await adminStore.fetchRecentActivities(nextPage)
  if (result.success) {
    // 数据已在store中更新
  }
}

// 监听时间范围变化
watch([revenueTimeRange], async () => {
  // 根据时间范围更新收入图表数据
  if (revenueChart) {
    await initRevenueChart()
  }
})

watch([userTimeRange], async () => {
  // 根据时间范围更新用户活跃度图表数据
  if (userChart) {
    await initUserChart()
  }
})

// 监听窗口大小变化，重绘图表
window.addEventListener('resize', () => {
  revenueChart?.resize()
  userChart?.resize()
  deviceChart?.resize()
  feedbackChart?.resize()
})

onMounted(async () => {
  await fetchDashboardData()
  initRevenueChart()
  initUserChart()
  initDeviceChart()
  initFeedbackChart()
})
</script>

<style scoped>
.el-card {
  transition: all 0.3s ease;
}
</style> 