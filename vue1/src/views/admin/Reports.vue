<template>
  <div class="reports-page p-6">
    <h1 class="text-2xl font-bold mb-6">Data Analysis Report</h1>

    <!-- Income Trend Card -->
    <div class="bg-white rounded-lg shadow p-4 mb-8">
      <div ref="incomeChartEl" style="width: 100%; height: 450px;"></div>
    </div>

    <!-- Time Filter Area -->
    <div class="bg-white rounded-lg shadow p-4 mb-6">
      <div class="flex flex-col md:flex-row md:items-center md:space-x-4">
        <div class="mb-4 md:mb-0">
          <span class="text-sm font-medium text-gray-700 mr-2">Time Range:</span>
          <el-date-picker
              v-model="weekValue"
              type="week"
              format="YYYY [Week] ww"
              value-format="YYYY-MM-DD"
              range-separator="to"
              start-placeholder="Start Week"
              end-placeholder="End Week"
              unlink-panels
              :pickerOptions="pickerOptions"
              @change="handleTimeRangeChange"
          />
        </div>

        <div class="flex space-x-2">
          <el-button type="primary" @click="handleQuery">Query</el-button>
          <el-button @click="handleReset">Reset</el-button>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow p-4 mb-8">
      <div ref="incomeChartEl2" style="width: 100%; height: 450px;"></div>
    </div>
    <div class="bg-white rounded-lg shadow p-4 mb-8">
      <div ref="incomeChartEl3" style="width: 100%; height: 450px;"></div>
    </div>

  </div>
</template>

<script setup>
import {ref, onMounted, onUnmounted, nextTick} from 'vue';
import { Loading } from '@element-plus/icons-vue';
import * as echarts from 'echarts/core';
import {
  BarChart, LineChart, PieChart
} from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import {adminListApi} from "@/api/index.js";
import dayjs from "dayjs";

dayjs.en.weekStart = 1;

// 注册必要的组件
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  BarChart,
  LineChart,
  PieChart,
  CanvasRenderer
]);

// 时间范围选择
const pickerOptions = {
  firstDayOfWeek: 1 // 设置周选择器从周一开始
}
const weekValue = ref('');

// 图表元素引用
const incomeChartEl = ref(null);
const incomeChartEl2 = ref(null);

const incomeChartEl3 = ref(null);
// 图表实例
let incomeChart = null;
let incomeChart2 = null;
let incomeChart3 = null;

// 数据状态
const incomePeriod = ref('7');
const incomeLoading = ref(true);
const areaLoading = ref(true);
const sourceLoading = ref(true);
const userLoading = ref(true);

// 处理时间范围变化
const handleTimeRangeChange = (val) => {
  console.log('Selected time range:', val);
};

// 查询按钮点击事件
const handleQuery = () => {
  console.log('Query button clicked, time range:', weekValue.value);
  // Add query logic here
  adminListApi.orderLease({
    startTime: weekValue.value,
    endTime: dayjs(weekValue.value).endOf('week').format('YYYY-MM-DD')
  }).then(apiRes => {
    resultArr2.value = apiRes
    initOtherChars()
  })
};

// 重置按钮点击事件
const handleReset = () => {
  weekValue.value = ''
  // Add reset logic here
  adminListApi.orderLease({}).then(apiRes => {
    resultArr2.value = apiRes
    initOtherChars()
  })
};

// 初始化图表
function initializeCharts() {
  nextTick(() => {
    if (incomeChartEl.value) {
      incomeChart = echarts.init(incomeChartEl.value);
      renderIncomeChart();
    }
  })
}
function initOtherChars() {
  nextTick(() => {
    if(incomeChartEl2.value) {
      incomeChart2 = echarts.init(incomeChartEl2.value);
      renderIncomeChart2();
    }
    if(incomeChartEl3.value) {
      incomeChart3 = echarts.init(incomeChartEl3.value);
      renderIncomeChart3();
    }
  })
}

// 渲染收入趋势图表
function renderIncomeChart() {
  console.log(resultArr1.value,22)
  // 配置选项
  const option = {
    title: {
      text: 'Daily Income Trend',
      left: 'center',
      top: 10,
      textStyle: {
        fontSize: 16
      }
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['Income'],
      top: 40,
      left: 'center'
    },
    grid: {
      left: '5%',
      right: '5%',
      bottom: '5%',
      top: 100,
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: resultArr1.value.map(i => i.key)
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: '¥{value}'
      }
    },
    series: [
      {
        name: 'Income',
        type: 'bar',
        stack: 'income',
        data: resultArr1.value.map(i => i.value),
        itemStyle: {
          color: '#67C23A'
        }
      }
    ]
  };

  // 设置图表
  incomeChart.setOption(option);
}

function renderIncomeChart2() {
  // 配置选项
  const option = {
    title: {
      text: 'Weekly Rental Amount',
      left: 'center',
      top: 10,
      textStyle: {
        fontSize: 16
      }
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['Amount'],
      top: 40,
      left: 'center'
    },
    grid: {
      left: '5%',
      right: '5%',
      bottom: '5%',
      top: 100,
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: resultArr2.value.map(i => i.type)
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: '¥{value}'
      }
    },
    series: [
      {
        name: 'Income',
        type: 'bar',
        stack: 'income',
        data: resultArr2.value.map(i => i.money),
        itemStyle: {
          color: 'blue'
        }
      }
    ]
  };

  // 设置图表
  incomeChart2.setOption(option);
}

function renderIncomeChart3() {
  // 配置选项
  const option = {
    title: {
      text: 'Weekly Rental Count',
      left: 'center',
      top: 10,
      textStyle: {
        fontSize: 16
      }
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['Count'],
      top: 40,
      left: 'center'
    },
    grid: {
      left: '5%',
      right: '5%',
      bottom: '5%',
      top: 100,
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: resultArr2.value.map(i => i.type)
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: '{value} times'
      }
    },
    series: [
      {
        name: 'Count',
        type: 'bar',
        stack: 'income',
        data: resultArr2.value.map(i => i.orderNumber),
        itemStyle: {
          color: 'yellow'
        }
      }
    ]
  };

  // 设置图表
  incomeChart3.setOption(option);
}


// 渲染区域使用量图表
function renderAreaChart() {
  console.log('Rendering area usage chart');
  if (!areaChart) return;

  areaLoading.value = true;

  // 配置选项
  const option = {
    title: {
      text: 'Area Usage Distribution',
      left: 'center',
      top: 10,
      textStyle: {
        fontSize: 16
      }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: ['Weekday', 'Weekend'],
      top: 40,
      left: 'center'
    },
    grid: {
      left: '5%',
      right: '5%',
      bottom: '5%',
      top: 90,
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: ['Downtown', 'University District', 'Tech Park', 'Business District', 'Residential Area']
    },
    yAxis: {
      type: 'value',
      name: 'Usage Count',
      axisLabel: {
        formatter: '{value} times'
      }
    },
    series: [
      {
        name: 'Weekday',
        type: 'bar',
        data: [320, 302, 301, 334, 390],
        itemStyle: {
          color: '#409EFF'
        }
      },
      {
        name: 'Weekend',
        type: 'bar',
        data: [120, 132, 101, 134, 90],
        itemStyle: {
          color: '#FF9F43'
        }
      }
    ]
  };

  // 设置图表
  areaChart.setOption(option);
  areaLoading.value = false;
}

// 渲染收入来源图表
function renderSourceChart() {
  console.log('Rendering income source chart');
  if (!sourceChart) return;

  sourceLoading.value = true;

  // 配置选项
  const option = {
    title: {
      text: 'Income Source Distribution',
      left: 'center',
      top: 10,
      textStyle: {
        fontSize: 16
      }
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    legend: {
      orient: 'horizontal',
      top: 40,
      left: 'center',
      itemWidth: 15,
      itemHeight: 10,
      textStyle: {
        fontSize: 12
      }
    },
    series: [
      {
        name: 'Income Source',
        type: 'pie',
        radius: ['30%', '60%'],
        center: ['50%', '60%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 18,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: 1048, name: 'Single Rental' },
          { value: 735, name: 'Member Subscription' },
          { value: 580, name: 'Long-term Rental' },
          { value: 484, name: 'Promotion' },
          { value: 300, name: 'Others' }
        ]
      }
    ]
  };

  // 设置图表
  sourceChart.setOption(option);
  sourceLoading.value = false;
}

// 渲染用户活跃度图表
function renderUserChart() {
  console.log('Rendering user activity chart');
  if (!userChart) return;
  userLoading.value = true;
  // 生成数据
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const activeUsers = [120, 132, 101, 134, 90, 230, 210, 182, 191, 234, 290, 330];
  const newUsers = [45, 52, 35, 84, 38, 120, 85, 65, 35, 65, 80, 120];
  const retentionRate = [65, 70, 60, 80, 75, 82, 75, 70, 68, 72, 78, 80];

  // 配置选项
  const option = {
    title: {
      text: 'User Activity Analysis',
      left: 'center',
      top: 10,
      textStyle: {
        fontSize: 16
      }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        crossStyle: {
          color: '#999'
        }
      }
    },
    legend: {
      data: ['Active Users', 'New Users', 'Retention Rate'],
      top: 40,
      left: 'center'
    },
    grid: {
      left: '5%',
      right: '7%',
      bottom: '5%',
      top: 100,
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        data: months,
        axisPointer: {
          type: 'shadow'
        }
      }
    ],
    yAxis: [
      {
        type: 'value',
        name: 'User Count',
        min: 0,
        max: 400,
        interval: 50,
        axisLabel: {
          formatter: '{value} users'
        }
      },
      {
        type: 'value',
        name: 'Retention Rate',
        min: 0,
        max: 100,
        interval: 10,
        axisLabel: {
          formatter: '{value} %'
        }
      }
    ],
    series: [
      {
        name: 'Active Users',
        type: 'bar',
        data: activeUsers,
        itemStyle: {
          color: '#409EFF'
        }
      },
      {
        name: 'New Users',
        type: 'bar',
        data: newUsers,
        itemStyle: {
          color: '#67C23A'
        }
      },
      {
        name: 'Retention Rate',
        type: 'line',
        yAxisIndex: 1,
        data: retentionRate,
        smooth: true,
        itemStyle: {
          color: '#E6A23C'
        }
      }
    ]
  };

  // 设置图表
  userChart.setOption(option);
  userLoading.value = false;
}

// 处理窗口大小变化
function handleResize() {
  if (incomeChart) incomeChart.resize();
  if (areaChart) areaChart.resize();
  if (sourceChart) sourceChart.resize();
  if (userChart) userChart.resize();
}
const resultArr1 = ref([])
const resultArr2 = ref([])


// 组件挂载时初始化图表
onMounted(() => {

  // 监听窗口大小变化
  window.addEventListener('resize', handleResize);
  const groupBy = (arr, key) => {
    return arr.reduce((acc, obj) => {
      const groupKey = obj[key];
      if (!acc[groupKey]) {
        acc[groupKey] = [];
      }
      acc[groupKey].push(obj);
      return acc;
    }, {});
  };
  adminListApi.orderList().then(res => {
    const orderList = res
    orderList.forEach(i => {
      i.diyKey = i.createdAt.split('T')[0]
    })
    const r = groupBy(orderList,'diyKey')

    const resultArr = []
    for(let key in r) {
      let zje = 0
      r[key].forEach(rr => {
        zje+=rr.totalAmount
      })
      resultArr.push({
        key,
        value: zje
      })
    }
    resultArr1.value = resultArr
    initializeCharts();

    adminListApi.orderLease({}).then(apiRes => {
      resultArr2.value = apiRes
      initOtherChars()
    })
    // 初始化所有图表
  })
});

// 组件卸载时清理资源
onUnmounted(() => {
  console.log('Reports component unmounted');

  // 销毁图表实例
  if (incomeChart) incomeChart.dispose();
  if (areaChart) areaChart.dispose();
  if (sourceChart) sourceChart.dispose();
  if (userChart) userChart.dispose();

  // 移除事件监听
  window.removeEventListener('resize', handleResize);
});
</script>

<style scoped>
.reports-page {
  max-width: 1200px;
  margin: 0 auto;
}
</style>
