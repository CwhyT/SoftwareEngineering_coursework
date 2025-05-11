<template>
  <div class="reports-page p-6">
    <h1 class="text-2xl font-bold mb-6">数据报表分析</h1>

    <!-- 收入趋势卡片 -->
    <div class="bg-white rounded-lg shadow p-4 mb-8">
      <div ref="incomeChartEl" style="width: 100%; height: 450px;"></div>
    </div>

<!--    &lt;!&ndash; 使用情况分析 &ndash;&gt;-->
<!--    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">-->
<!--      &lt;!&ndash; 区域使用量统计 &ndash;&gt;-->
<!--      <div class="bg-white rounded-lg shadow p-4">-->
<!--        <h2 class="text-lg font-bold mb-4">各区域使用量统计</h2>-->
<!--        <div v-if="areaLoading" class="flex justify-center items-center" style="height: 350px;">-->
<!--          <el-icon class="animate-spin text-blue-500 mr-2" size="24"><Loading /></el-icon>-->
<!--          <span>加载中...</span>-->
<!--        </div>-->
<!--        <div ref="areaChartEl" style="width: 100%; height: 350px;"></div>-->
<!--      </div>-->
<!--      -->
<!--      &lt;!&ndash; 收入来源分布 &ndash;&gt;-->
<!--      <div class="bg-white rounded-lg shadow p-4">-->
<!--        <h2 class="text-lg font-bold mb-4">收入来源分布</h2>-->
<!--        <div v-if="sourceLoading" class="flex justify-center items-center" style="height: 350px;">-->
<!--          <el-icon class="animate-spin text-blue-500 mr-2" size="24"><Loading /></el-icon>-->
<!--          <span>加载中...</span>-->
<!--        </div>-->
<!--        <div ref="sourceChartEl" style="width: 100%; height: 350px;"></div>-->
<!--      </div>-->
<!--    </div>-->
<!--      -->
<!--    &lt;!&ndash; 用户活跃度分析 &ndash;&gt;-->
<!--    <div class="bg-white rounded-lg shadow p-4 mb-6">-->
<!--      <h2 class="text-lg font-bold mb-4">用户活跃度分析</h2>-->
<!--      <div v-if="userLoading" class="flex justify-center items-center" style="height: 450px;">-->
<!--        <el-icon class="animate-spin text-blue-500 mr-2" size="24"><Loading /></el-icon>-->
<!--        <span>加载中...</span>-->
<!--      </div>-->
<!--      <div ref="userChartEl" style="width: 100%; height: 450px;"></div>-->
<!--    </div>-->
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

// 图表元素引用
const incomeChartEl = ref(null);
const areaChartEl = ref(null);
const sourceChartEl = ref(null);
const userChartEl = ref(null);

// 图表实例
let incomeChart = null;
let areaChart = null;
let sourceChart = null;
let userChart = null;

// 数据状态
const incomePeriod = ref('7');
const incomeLoading = ref(true);
const areaLoading = ref(true);
const sourceLoading = ref(true);
const userLoading = ref(true);

// 初始化图表
function initializeCharts() {
  nextTick(() => {
    if (incomeChartEl.value) {
      incomeChart = echarts.init(incomeChartEl.value);
      renderIncomeChart();
    }
  })

}

// 渲染收入趋势图表
function renderIncomeChart() {
  console.log(resultArr1.value,22)
  // 配置选项
  const option = {
    title: {
      text: '每日收入趋势',
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
      data: ['收入'],
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
        name: '收入',
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

// 渲染区域使用量图表
function renderAreaChart() {
  console.log('渲染区域使用量图表');
  if (!areaChart) return;

  areaLoading.value = true;

  // 配置选项
  const option = {
    title: {
      text: '各区域使用量分布',
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
      data: ['工作日', '周末'],
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
      data: ['市中心', '大学城', '科技园', '商业区', '居民区']
    },
    yAxis: {
      type: 'value',
      name: '使用次数',
      axisLabel: {
        formatter: '{value} 次'
      }
    },
    series: [
      {
        name: '工作日',
        type: 'bar',
        data: [320, 302, 301, 334, 390],
        itemStyle: {
          color: '#409EFF'
        }
      },
      {
        name: '周末',
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
  console.log('渲染收入来源图表');
  if (!sourceChart) return;

  sourceLoading.value = true;

  // 配置选项
  const option = {
    title: {
      text: '收入来源分布',
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
        name: '收入来源',
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
          { value: 1048, name: '单次租赁' },
          { value: 735, name: '会员订阅' },
          { value: 580, name: '长时租赁' },
          { value: 484, name: '优惠活动' },
          { value: 300, name: '其他' }
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
  console.log('渲染用户活跃度图表');
  if (!userChart) return;

  userLoading.value = true;

  // 生成数据
  const months = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
  const activeUsers = [120, 132, 101, 134, 90, 230, 210, 182, 191, 234, 290, 330];
  const newUsers = [45, 52, 35, 84, 38, 120, 85, 65, 35, 65, 80, 120];
  const retentionRate = [65, 70, 60, 80, 75, 82, 75, 70, 68, 72, 78, 80];

  // 配置选项
  const option = {
    title: {
      text: '用户活跃度分析',
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
      data: ['活跃用户', '新增用户', '留存率'],
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
        name: '用户数',
        min: 0,
        max: 400,
        interval: 50,
        axisLabel: {
          formatter: '{value} 人'
        }
      },
      {
        type: 'value',
        name: '留存率',
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
        name: '活跃用户',
        type: 'bar',
        data: activeUsers,
        itemStyle: {
          color: '#409EFF'
        }
      },
      {
        name: '新增用户',
        type: 'bar',
        data: newUsers,
        itemStyle: {
          color: '#67C23A'
        }
      },
      {
        name: '留存率',
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
    // 初始化所有图表
    initializeCharts();
  })
});

// 组件卸载时清理资源
onUnmounted(() => {
  console.log('Reports组件已卸载');

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
