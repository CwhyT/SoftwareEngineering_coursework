<template>
  <div class="chart-container" style="width: 100%; height: 400px;">
    <div v-if="loading" class="loading-container">
      <el-icon class="loading-icon"><Loading /></el-icon>
      <div class="loading-text">Loading chart...</div>
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

// Generate random revenue data
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
    
    // Generate random data
    const total = Math.floor(Math.random() * 1000) + 500;
    const rental = Math.floor(total * 0.7);
    const member = total - rental;
    
    totalData.push(total);
    rentalData.push(rental);
    memberData.push(member);
  }
  
  return { dates, totalData, rentalData, memberData };
}

// Initialize chart
function initChart() {
  console.log('Initializing chart', chartEl.value);
  if (!chartEl.value) return;
  
  // Destroy old chart instance
  if (chart) {
    chart.dispose();
  }
  
  // Show loading state
  loading.value = true;
  
  // Initialize chart
  chart = echarts.init(chartEl.value);
  
  // Add window resize listener
  window.addEventListener('resize', handleResize);
  
  // Render chart
  renderChart();
}

// Render chart data
function renderChart() {
  if (!chart) return;
  
  const days = parseInt(props.period);
  console.log('Rendering chart, period:', days, 'days');
  
  // Generate data
  const { dates, totalData, rentalData, memberData } = generateData(days);
  
  // Set chart options
  const option = {
    backgroundColor: '#fff',
    title: {
      text: 'Daily Revenue Statistics',
      left: 'center'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: ['Total Revenue', 'Rental Revenue', 'Membership Revenue'],
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
        name: 'Membership Revenue',
        type: 'bar',
        stack: 'income',
        data: memberData,
        itemStyle: {
          color: '#E6A23C'
        }
      }
    ]
  };
  
  // Set chart options
  chart.setOption(option);
  
  // Hide loading state
  loading.value = false;
  
  console.log('Chart rendered, data points:', dates.length);
}

// Handle window resize
function handleResize() {
  if (chart) {
    chart.resize();
  }
}

// Watch period property changes
watch(() => props.period, (newPeriod) => {
  console.log('Period changed to:', newPeriod);
  renderChart();
});

onMounted(() => {
  console.log('RevenueChart component mounted');
  // Give DOM some time to render
  setTimeout(() => {
    initChart();
  }, 100);
});

onUnmounted(() => {
  console.log('RevenueChart component unmounted');
  // Remove event listener
  window.removeEventListener('resize', handleResize);
  
  // Dispose chart instance
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