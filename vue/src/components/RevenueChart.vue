<template>
  <div class="chart-container" style="width: 100%; height: 400px;">
    <div v-if="loading" class="loading-container">
      <el-icon class="loading-icon"><Loading /></el-icon>
      <div class="loading-text">图表加载中...</div>
    </div>
    <div ref="chartEl" class="chart"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch, getCurrentInstance } from 'vue';
import * as echarts from 'echarts';
import { Loading } from '@element-plus/icons-vue';

const props = defineProps({
  period: {
    type: String,
    default: '7'
  }
});

const chartEl = ref(null);
const loading = ref(true);
let chart = null;

// 生成随机收入数据
function generateData(days) {
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
  
  return { dates, totalData, rentalData, memberData };
}

// 初始化图表
function initChart() {
  console.log('初始化图表', chartEl.value);
  if (!chartEl.value) return;
  
  // 销毁旧图表实例
  if (chart) {
    chart.dispose();
  }
  
  // 显示加载状态
  loading.value = true;
  
  // 初始化图表
  chart = echarts.init(chartEl.value);
  
  // 添加监听窗口大小变化
  window.addEventListener('resize', handleResize);
  
  // 渲染图表
  renderChart();
}

// 渲染图表数据
function renderChart() {
  if (!chart) return;
  
  const days = parseInt(props.period);
  console.log('渲染图表，周期:', days, '天');
  
  // 生成数据
  const { dates, totalData, rentalData, memberData } = generateData(days);
  
  // 设置图表选项
  const option = {
    backgroundColor: '#fff',
    title: {
      text: '每日收入统计',
      left: 'center'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: ['总收入', '租赁收入', '会员收入'],
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
        name: '总收入',
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
        name: '租赁收入',
        type: 'bar',
        stack: 'income',
        data: rentalData,
        itemStyle: {
          color: '#67C23A'
        }
      },
      {
        name: '会员收入',
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
  chart.setOption(option);
  
  // 隐藏加载状态
  loading.value = false;
  
  console.log('图表渲染完成，数据点数量:', dates.length);
}

// 处理窗口大小变化
function handleResize() {
  if (chart) {
    chart.resize();
  }
}

// 监听period属性变化
watch(() => props.period, (newPeriod) => {
  console.log('周期变更为:', newPeriod);
  renderChart();
});

onMounted(() => {
  console.log('RevenueChart组件挂载');
  // 给DOM渲染一点时间
  setTimeout(() => {
    initChart();
  }, 100);
});

onUnmounted(() => {
  console.log('RevenueChart组件卸载');
  // 移除事件监听
  window.removeEventListener('resize', handleResize);
  
  // 销毁图表实例
  if (chart) {
    chart.dispose();
    chart = null;
  }
});
</script>

<style scoped>
.chart-container {
  position: relative;
  width: 100%;
  height: 400px;
}

.chart {
  width: 100%;
  height: 100%;
}

.loading-container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.8);
  z-index: 10;
}

.loading-icon {
  font-size: 32px;
  animation: spin 1s linear infinite;
  margin-bottom: 8px;
}

.loading-text {
  font-size: 14px;
  color: #606266;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style> 