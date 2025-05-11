<template>
  <div class="order-history-page flex flex-col items-center py-8">
    <div class="w-full max-w-3xl">
      <div class="bg-white rounded-xl shadow-md overflow-hidden mb-6">
        <div class="p-4 border-b border-gray-100 flex items-center">
          <el-icon class="mr-2"><List /></el-icon>
          <h3 class="font-medium text-gray-800">历史订单</h3>
        </div>
        <div class="p-5">
          <div v-if="orders.length === 0" class="py-6 text-center text-gray-500">
            <el-icon size="28" class="mb-2"><List /></el-icon>
            <p>暂无订单</p>
          </div>
          <div v-else>
            <div v-for="order in orders" :key="order.orderId" class="mb-4 p-4 bg-gray-50 rounded-lg">
              <div class="flex justify-between items-center mb-2">
                <div class="font-medium text-gray-800">订单号: {{ order.index + 1 }}</div>
                <div class="text-sm text-gray-500">{{ formatDate(order.createdAt) }}</div>
              </div>
              <div class="text-sm text-gray-600 mb-1">总金额: ¥{{ order.totalAmount }}</div>
              <div class="text-sm text-gray-600 mb-1">状态: {{ getStatusString(order.status) }}</div>
              <div class="text-sm text-gray-600 mb-1">开始时间: {{ formatDate(order.startTime) }}</div>
              <div class="text-sm text-gray-600">结束时间: {{ formatDate(order.endTime) }}</div>
              <el-button v-if="isFutureTime(formatDate(order.startTime)) && order.status === 'created'" @click="closeDd(order.orderId)" style="margin: 5px 0; color: white">取消订单</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { userApi } from '@/api/user';
import { List } from '@element-plus/icons-vue';
import {ElMessage, ElMessageBox} from "element-plus";
import {adminListApi} from "@/api/index.js";

const orders = ref([]);

function isFutureTime(inputTime) {
  // 1. 统一转换为 Date 对象
  let inputDate;
  if (inputTime instanceof Date) {
    inputDate = inputTime;
  } else if (typeof inputTime === 'number') {
    inputDate = new Date(inputTime); // 时间戳
  } else if (typeof inputTime === 'string') {
    inputDate = new Date(inputTime); // ISO 字符串或其他可解析格式
  } else {
    throw new Error('不支持的时间格式，请传入 Date 对象、时间戳或 ISO 字符串');
  }

  // 2. 检查是否有效时间
  if (isNaN(inputDate.getTime())) {
    throw new Error('无效的时间格式');
  }

  // 3. 与当前时间比较
  const now = new Date();
  return inputDate > now;
}

const formatDate = (dateString) => {
  console.log('格式化日期输入:', dateString);
  if (!dateString) {
    console.log('日期为空，返回未知');
    return '未知';
  }
  try {
    const date = new Date(dateString);
    console.log('转换后的日期对象:', date);
    if (isNaN(date.getTime())) {
      console.log('无效的日期，返回未知');
      return '未知';
    }
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}`;
    console.log('格式化后的日期:', formattedDate);
    return formattedDate;
  } catch (e) {
    console.error('日期格式化错误:', e);
    return '未知';
  }
};

function getStatusString(status, isChinese = true) {
  const statusMap = {
    created: isChinese ? '已创建' : 'Created',
    cancel: isChinese ? '已取消' : 'Canceled',
    close: isChinese ? '已完成' : 'Completed'
  };

  // 处理未知状态
  return statusMap[status.toLowerCase()] ||
      (isChinese ? '未知状态' : 'Unknown Status');
}

const closeDd = (id) => {

  ElMessageBox.confirm('确定取消订单？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(()=>{
    adminListApi.CancelOrder({
      orderId: id,
      loginId: localStorage.getItem('loginId'),
      status: 'cancel'
    }).then(res => {
      ElMessage.success('成功')
      loadOrders()
    })
  })
}

const loadOrders = async () => {
  try {
    const response = await userApi.getOrders();
    console.log('API完整响应:', response);
    console.log('API响应数据类型:', typeof response);

    // 检查响应数据结构
    if (response?.data) {
      console.log('响应中的data字段:', response.data);
      // 如果data是数组，直接使用
      if (Array.isArray(response.data)) {
        orders.value = response.data;
        orders.value.forEach((item,index) => {
          item.index = index
        })
        orders.value = orders.value.reverse()
      }
      // 如果data是对象且包含data字段
      else if (response.data.data && Array.isArray(response.data.data)) {
        orders.value = response.data.data;
      }
      // 如果data是对象且包含orders字段
      else if (response.data.orders && Array.isArray(response.data.orders)) {
        orders.value = response.data.orders;
      }

      // 打印每个订单的完整数据
      orders.value.forEach(order => {
        console.log('订单完整数据:', order);
        console.log('订单时间数据:', {
          orderId: order.orderId,
          startTime: order.startTime,
          endTime: order.endTime,
          createdAt: order.createdAt
        });
      });
    } else {
      console.error('API返回数据格式错误:', response);
      orders.value = [];
    }
  } catch (e) {
    console.error('加载订单数据出错:', e);
    orders.value = [];
  }
};

onMounted(() => {
  loadOrders();
});
</script>
