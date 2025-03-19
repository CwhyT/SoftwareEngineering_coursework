<template>
  <div class="p-6">
    <div class="mb-6 flex justify-between items-center">
      <h1 class="text-2xl font-bold text-gray-900">收入统计</h1>
      <div class="flex space-x-4">
        <el-date-picker
          v-model="dateRange"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :shortcuts="dateShortcuts"
          value-format="YYYY-MM-DD"
          @change="handleDateChange"
        />
        <el-button type="primary" @click="exportData">导出数据</el-button>
      </div>
    </div>

    <!-- 统计卡片 -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <el-card 
        v-for="stat in stats" 
        :key="stat.title"
        :body-style="{ padding: '20px' }"
        class="hover:shadow-lg transition-shadow"
      >
        <div class="flex items-center justify-between">
          <div>
            <div class="text-gray-500 text-sm mb-1">{{ stat.title }}</div>
            <div class="text-2xl font-bold">{{ stat.value }}</div>
            <div class="text-sm mt-1" :class="stat.changeRate >= 0 ? 'text-success' : 'text-danger'">
              {{ stat.changeRate >= 0 ? '+' : '' }}{{ stat.changeRate }}%
              <span class="text-gray-500 ml-1">较上期</span>
            </div>
          </div>
          <el-icon class="text-4xl opacity-70" :class="stat.iconClass">
            <component :is="stat.icon" />
          </el-icon>
        </div>
      </el-card>
    </div>

    <!-- 主图表区域 -->
    <el-card class="mb-6">
      <template #header>
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <el-icon class="mr-2"><TrendCharts /></el-icon>
            <span>收入趋势</span>
          </div>
          <el-radio-group v-model="mainChartType" size="small" @change="updateMainChart">
            <el-radio-button label="daily">日视图</el-radio-button>
            <el-radio-button label="weekly">周视图</el-radio-button>
            <el-radio-button label="monthly">月视图</el-radio-button>
          </el-radio-group>
        </div>
      </template>
      <div ref="mainChartRef" class="h-[400px]"></div>
    </el-card>

    <!-- 图表区域 -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- 付款方式分布 -->
      <el-card class="mb-6">
        <template #header>
          <div class="flex items-center">
            <el-icon class="mr-2"><Wallet /></el-icon>
            <span>付款方式分布</span>
          </div>
        </template>
        <div ref="paymentChartRef" class="h-[300px]"></div>
      </el-card>

      <!-- 用户消费排行 -->
      <el-card class="mb-6">
        <template #header>
          <div class="flex items-center">
            <el-icon class="mr-2"><User /></el-icon>
            <span>用户消费排行</span>
          </div>
        </template>
        <div ref="userChartRef" class="h-[300px]"></div>
      </el-card>
    </div>

    <!-- 收入明细表格 -->
    <el-card>
      <template #header>
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <el-icon class="mr-2"><List /></el-icon>
            <span>收入明细</span>
          </div>
        </div>
      </template>

      <el-table
        :data="revenueList"
        border
        style="width: 100%"
        v-loading="loading"
      >
        <el-table-column prop="id" label="交易ID" width="120" />
        <el-table-column prop="user" label="用户" min-width="180">
          <template #default="{ row }">
            <div class="flex items-center">
              <el-avatar :size="32" :src="row.userAvatar">
                {{ row.userNickname?.[0] || row.username?.[0] || 'U' }}
              </el-avatar>
              <span class="ml-2">{{ row.userNickname || row.username }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="type" label="交易类型" width="120">
          <template #default="{ row }">
            <el-tag :type="getTransactionTypeTag(row.type)">
              {{ getTransactionTypeText(row.type) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="amount" label="金额" width="120">
          <template #default="{ row }">
            ¥{{ row.amount }}
          </template>
        </el-table-column>
        <el-table-column prop="paymentMethod" label="支付方式" width="120">
          <template #default="{ row }">
            {{ getPaymentMethodText(row.paymentMethod) }}
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" width="100">
          <template #default="{ row }">
            <el-tag :type="row.status === 'success' ? 'success' : (row.status === 'pending' ? 'warning' : 'danger')">
              {{ getStatusText(row.status) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createdAt" label="交易时间" min-width="180">
          <template #default="{ row }">
            {{ formatDate(row.createdAt) }}
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <div class="flex justify-center mt-6">
        <el-pagination
          v-model:currentPage="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 50, 100]"
          :background="true"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, watch } from 'vue'
import { useAdminStore } from '@/stores/admin'
import * as echarts from 'echarts'
import { ElMessage } from 'element-plus'
import {
  Money,
  TrendCharts,
  Wallet,
  User,
  List
} from '@element-plus/icons-vue'

const adminStore = useAdminStore()

// 时间范围相关
const dateRange = ref([])
const dateShortcuts = [
  {
    text: '近一周',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
      return [start, end]
    },
  },
  {
    text: '近一个月',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      return [start, end]
    },
  },
  {
    text: '近三个月',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
      return [start, end]
    },
  },
]

// 统计数据
const stats = ref([
  {
    title: '总收入',
    value: '¥0',
    changeRate: 0,
    icon: 'Money',
    iconClass: 'text-primary'
  },
  {
    title: '总订单数',
    value: '0',
    changeRate: 0,
    icon: 'Tickets',
    iconClass: 'text-success'
  },
  {
    title: '平均订单金额',
    value: '¥0',
    changeRate: 0,
    icon: 'PriceTag',
    iconClass: 'text-warning'
  },
  {
    title: '退款金额',
    value: '¥0',
    changeRate: 0,
    icon: 'RefreshRight',
    iconClass: 'text-danger'
  }
])

// 图表相关
const mainChartType = ref('daily')
const mainChartRef = ref(null)
const paymentChartRef = ref(null)
const userChartRef = ref(null)
let mainChart = null
let paymentChart = null
let userChart = null

// 明细表格相关
const revenueList = ref([])
const loading = ref(false)
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)

// 处理日期变化
const handleDateChange = () => {
  // 更新收入统计
  fetchRevenueStats()
  
  // 更新图表
  updateMainChart()
  updatePaymentChart()
  updateUserChart()
  
  // 更新收入明细
  fetchRevenueList()
}

// 获取收入统计数据
const fetchRevenueStats = async () => {
  try {
    const params = {}
    if (dateRange.value && dateRange.value.length === 2) {
      params.startDate = dateRange.value[0]
      params.endDate = dateRange.value[1]
    }
    
    const response = await fetch('/api/admin/revenue/stats', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(params)
    })
    
    if (response.ok) {
      const data = await response.json()
      
      // 更新统计卡片
      stats.value[0].value = `¥${data.totalRevenue || 0}`
      stats.value[0].changeRate = data.revenueChangeRate || 0
      
      stats.value[1].value = data.totalOrders || 0
      stats.value[1].changeRate = data.ordersChangeRate || 0
      
      stats.value[2].value = `¥${data.averageOrderAmount || 0}`
      stats.value[2].changeRate = data.averageOrderChangeRate || 0
      
      stats.value[3].value = `¥${data.refundAmount || 0}`
      stats.value[3].changeRate = data.refundChangeRate || 0
    } else {
      throw new Error('获取收入统计数据失败')
    }
  } catch (error) {
    console.error('获取收入统计失败', error)
    ElMessage.error(error.message || '获取收入统计失败')
  }
}

// 初始化并更新主图表
const initMainChart = () => {
  if (!mainChartRef.value) return
  
  mainChart = echarts.init(mainChartRef.value)
  window.addEventListener('resize', () => {
    mainChart?.resize()
  })
  
  updateMainChart()
}

// 更新主图表数据
const updateMainChart = async () => {
  if (!mainChart) return
  
  try {
    const params = {
      type: mainChartType.value
    }
    
    if (dateRange.value && dateRange.value.length === 2) {
      params.startDate = dateRange.value[0]
      params.endDate = dateRange.value[1]
    }
    
    const response = await fetch('/api/admin/revenue/trend', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(params)
    })
    
    if (response.ok) {
      const data = await response.json()
      
      const option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['收入', '订单数']
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
            data: data.dates || [],
            axisPointer: {
              type: 'shadow'
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '收入(元)',
            min: 0,
            axisLabel: {
              formatter: '{value} 元'
            }
          },
          {
            type: 'value',
            name: '订单数',
            min: 0,
            axisLabel: {
              formatter: '{value}'
            }
          }
        ],
        series: [
          {
            name: '收入',
            type: 'bar',
            data: data.revenue || []
          },
          {
            name: '订单数',
            type: 'line',
            yAxisIndex: 1,
            data: data.orders || []
          }
        ]
      }
      
      mainChart.setOption(option)
    } else {
      throw new Error('获取收入趋势数据失败')
    }
  } catch (error) {
    console.error('更新收入趋势图表失败', error)
    ElMessage.error(error.message || '更新收入趋势图表失败')
  }
}

// 初始化并更新支付方式图表
const initPaymentChart = () => {
  if (!paymentChartRef.value) return
  
  paymentChart = echarts.init(paymentChartRef.value)
  window.addEventListener('resize', () => {
    paymentChart?.resize()
  })
  
  updatePaymentChart()
}

// 更新支付方式图表
const updatePaymentChart = async () => {
  if (!paymentChart) return
  
  try {
    const params = {}
    if (dateRange.value && dateRange.value.length === 2) {
      params.startDate = dateRange.value[0]
      params.endDate = dateRange.value[1]
    }
    
    const response = await fetch('/api/admin/revenue/payment-methods', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(params)
    })
    
    if (response.ok) {
      const data = await response.json()
      
      const option = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 10,
          data: data.map(item => item.name) || []
        },
        series: [
          {
            name: '支付方式',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '14',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: data || [
              { value: 335, name: '支付宝' },
              { value: 310, name: '微信支付' },
              { value: 234, name: '余额支付' },
              { value: 135, name: '其他' }
            ]
          }
        ]
      }
      
      paymentChart.setOption(option)
    } else {
      throw new Error('获取支付方式数据失败')
    }
  } catch (error) {
    console.error('更新支付方式图表失败', error)
    ElMessage.error(error.message || '更新支付方式图表失败')
  }
}

// 初始化并更新用户消费排行图表
const initUserChart = () => {
  if (!userChartRef.value) return
  
  userChart = echarts.init(userChartRef.value)
  window.addEventListener('resize', () => {
    userChart?.resize()
  })
  
  updateUserChart()
}

// 更新用户消费排行图表
const updateUserChart = async () => {
  if (!userChart) return
  
  try {
    const params = {}
    if (dateRange.value && dateRange.value.length === 2) {
      params.startDate = dateRange.value[0]
      params.endDate = dateRange.value[1]
    }
    
    const response = await fetch('/api/admin/revenue/top-users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(params)
    })
    
    if (response.ok) {
      const data = await response.json()
      
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
        xAxis: {
          type: 'value',
          name: '消费金额(元)',
          axisLabel: {
            formatter: '{value} 元'
          }
        },
        yAxis: {
          type: 'category',
          data: data.map(item => item.username) || [],
          axisLabel: {
            formatter: function(value) {
              if (value.length > 10) {
                return value.substring(0, 10) + '...'
              }
              return value
            }
          }
        },
        series: [
          {
            name: '消费金额',
            type: 'bar',
            data: data.map(item => item.amount) || []
          }
        ]
      }
      
      userChart.setOption(option)
    } else {
      throw new Error('获取用户消费排行数据失败')
    }
  } catch (error) {
    console.error('更新用户消费排行图表失败', error)
    ElMessage.error(error.message || '更新用户消费排行图表失败')
  }
}

// 获取收入明细
const fetchRevenueList = async () => {
  loading.value = true
  
  try {
    const params = {
      page: currentPage.value,
      pageSize: pageSize.value
    }
    
    if (dateRange.value && dateRange.value.length === 2) {
      params.startDate = dateRange.value[0]
      params.endDate = dateRange.value[1]
    }
    
    const response = await fetch('/api/admin/revenue/transactions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(params)
    })
    
    if (response.ok) {
      const data = await response.json()
      revenueList.value = data.items || []
      total.value = data.total || 0
    } else {
      throw new Error('获取收入明细失败')
    }
  } catch (error) {
    console.error('获取收入明细失败', error)
    ElMessage.error(error.message || '获取收入明细失败')
  } finally {
    loading.value = false
  }
}

// 分页变化
const handleSizeChange = (size) => {
  pageSize.value = size
  fetchRevenueList()
}

const handleCurrentChange = (page) => {
  currentPage.value = page
  fetchRevenueList()
}

// 导出数据
const exportData = () => {
  const params = {}
  if (dateRange.value && dateRange.value.length === 2) {
    params.startDate = dateRange.value[0]
    params.endDate = dateRange.value[1]
  }
  
  const queryString = new URLSearchParams(params).toString()
  const url = `/api/admin/revenue/export?${queryString}`
  window.open(url, '_blank')
}

// 辅助函数
const getTransactionTypeText = (type) => {
  const types = {
    rental: '租赁费用',
    deposit: '押金',
    refund: '退款',
    recharge: '充值'
  }
  return types[type] || type
}

const getTransactionTypeTag = (type) => {
  const types = {
    rental: 'primary',
    deposit: 'warning',
    refund: 'danger',
    recharge: 'success'
  }
  return types[type] || 'info'
}

const getPaymentMethodText = (method) => {
  const methods = {
    alipay: '支付宝',
    wechat: '微信支付',
    balance: '余额支付'
  }
  return methods[method] || method
}

const getStatusText = (status) => {
  const statuses = {
    success: '成功',
    pending: '处理中',
    failed: '失败'
  }
  return statuses[status] || status
}

const formatDate = (date) => {
  if (!date) return '-'
  return new Date(date).toLocaleString()
}

// 初始化
onMounted(() => {
  // 设置默认日期范围为过去30天
  const end = new Date()
  const start = new Date()
  start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
  dateRange.value = [
    start.toISOString().split('T')[0],
    end.toISOString().split('T')[0]
  ]
  
  // 初始化各个图表
  initMainChart()
  initPaymentChart()
  initUserChart()
  
  // 获取数据
  fetchRevenueStats()
  fetchRevenueList()
})

// 监听窗口大小变化，重绘图表
window.addEventListener('resize', () => {
  mainChart?.resize()
  paymentChart?.resize()
  userChart?.resize()
})
</script>

<style scoped>
/* 自定义样式 */
</style> 