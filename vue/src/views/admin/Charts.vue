<template>
  <div class="chart-test-page p-6">
    <h1 class="text-2xl font-bold mb-6">图表测试页面</h1>
    
    <!-- 折线图 -->
    <div class="bg-white rounded-lg shadow p-4 mb-6">
      <h2 class="text-lg font-bold mb-4">收入趋势折线图</h2>
      <div class="flex justify-end mb-4">
        <el-select v-model="linePeriod" size="small" @change="renderLineChart">
          <el-option label="最近7天" value="7" />
          <el-option label="最近30天" value="30" />
        </el-select>
      </div>
      <div ref="lineChartRef" style="width: 100%; height: 400px;"></div>
    </div>
    
    <!-- 饼图 -->
    <div class="bg-white rounded-lg shadow p-4 mb-6">
      <h2 class="text-lg font-bold mb-4">收入来源分布</h2>
      <div ref="pieChartRef" style="width: 100%; height: 400px;"></div>
    </div>
    
    <!-- 柱状图 -->
    <div class="bg-white rounded-lg shadow p-4 mb-6">
      <h2 class="text-lg font-bold mb-4">各区域车辆使用量</h2>
      <div ref="barChartRef" style="width: 100%; height: 400px;"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import * as echarts from 'echarts';

// 图表引用
const lineChartRef = ref(null);
const pieChartRef = ref(null);
const barChartRef = ref(null);

// 图表实例
let lineChart = null;
let pieChart = null;
let barChart = null;

// 数据配置
const linePeriod = ref('7');

// =================== 折线图 ===================
function renderLineChart() {
  console.log('正在渲染折线图...');
  if (!lineChartRef.value) return;
  
  // 销毁旧图表
  if (lineChart) {
    lineChart.dispose();
  }
  
  // 创建新图表
  lineChart = echarts.init(lineChartRef.value);
  
  // 生成数据
  const days = parseInt(linePeriod.value);
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
  
  // 设置选项
  const option = {
    title: {
      text: '每日收入趋势',
      left: 'center'
    },
    tooltip: {
      trigger: 'axis'
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
        type: 'line',
        data: rentalData,
        smooth: true,
        itemStyle: {
          color: '#67C23A'
        }
      },
      {
        name: '会员收入',
        type: 'line',
        data: memberData,
        smooth: true,
        itemStyle: {
          color: '#E6A23C'
        }
      }
    ]
  };
  
  // 设置图表
  lineChart.setOption(option);
  console.log('折线图渲染完成');
}

// =================== 饼图 ===================
function renderPieChart() {
  console.log('正在渲染饼图...');
  if (!pieChartRef.value) return;
  
  // 销毁旧图表
  if (pieChart) {
    pieChart.dispose();
  }
  
  // 创建新图表
  pieChart = echarts.init(pieChartRef.value);
  
  // 设置选项
  const option = {
    title: {
      text: '收入来源分布',
      left: 'center'
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    legend: {
      orient: 'horizontal',
      top: 40,
      data: ['单次租赁', '会员订阅', '长时租赁', '优惠活动', '其他']
    },
    series: [
      {
        name: '收入来源',
        type: 'pie',
        radius: ['40%', '70%'],
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
  pieChart.setOption(option);
  console.log('饼图渲染完成');
}

// =================== 柱状图 ===================
function renderBarChart() {
  console.log('正在渲染柱状图...');
  if (!barChartRef.value) return;
  
  // 销毁旧图表
  if (barChart) {
    barChart.dispose();
  }
  
  // 创建新图表
  barChart = echarts.init(barChartRef.value);
  
  // 设置选项
  const option = {
    title: {
      text: '各区域车辆使用量',
      left: 'center'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      top: 40,
      data: ['工作日', '周末']
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
  barChart.setOption(option);
  console.log('柱状图渲染完成');
}

// 处理窗口大小变化
function handleResize() {
  console.log('处理窗口大小变化');
  if (lineChart) lineChart.resize();
  if (pieChart) pieChart.resize();
  if (barChart) barChart.resize();
}

// 组件挂载时初始化
onMounted(() => {
  console.log('Charts组件已挂载');
  
  // 给DOM一点渲染时间
  setTimeout(() => {
    renderLineChart();
    renderPieChart();
    renderBarChart();
  }, 300);
  
  // 监听窗口大小变化
  window.addEventListener('resize', handleResize);
});

// 组件卸载时清理资源
onUnmounted(() => {
  console.log('Charts组件已卸载');
  
  // 销毁图表实例
  if (lineChart) lineChart.dispose();
  if (pieChart) pieChart.dispose();
  if (barChart) barChart.dispose();
  
  // 移除事件监听
  window.removeEventListener('resize', handleResize);
});
</script>

<style scoped>
.chart-test-page {
  max-width: 1200px;
  margin: 0 auto;
}
</style> 