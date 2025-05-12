<template>
  <div class="order-history-page flex flex-col items-center py-8">
    <div class="w-full max-w-3xl">
      <div class="bg-white rounded-xl shadow-md overflow-hidden mb-6">
        <div class="p-4 border-b border-gray-100 flex items-center">
          <el-icon class="mr-2"><List /></el-icon>
          <h3 class="font-medium text-gray-800">Order History</h3>
        </div>
        <div class="p-5">
          <div v-if="orders.length === 0" class="py-6 text-center text-gray-500">
            <el-icon size="28" class="mb-2"><List /></el-icon>
            <p>No Orders</p>
          </div>
          <div v-else>
            <div v-for="order in orders" :key="order.orderId" class="mb-4 p-4 bg-gray-50 rounded-lg">
              <div class="flex justify-between items-center mb-2">
                <div class="font-medium text-gray-800">Order No.: {{ order.index + 1 }}</div>
                <div class="text-sm text-gray-500">{{ formatDate(order.createdAt) }}</div>
              </div>
              <div class="text-sm text-gray-600 mb-1">Total Amount: ¥{{ order.totalAmount }}</div>
              <div class="text-sm text-gray-600 mb-1">Status: {{ getStatusString(order.status) }}</div>
              <div class="text-sm text-gray-600 mb-1">Start Time: {{ formatDate(order.startTime) }}</div>
              <div class="text-sm text-gray-600">End Time: {{ formatDate(order.endTime) }}</div>
              <el-button v-if="isFutureTime(formatDate(order.startTime)) && order.status === 'created'" @click="closeDd(order.orderId)" style="margin: 5px; color: white">Cancel Order</el-button>
              <el-button v-if="isFutureTime(formatDate(order.startTime)) && order.status === 'created'" style="margin: 5px 0; color: white" @click="openExtendDialog(order)">Extend Order</el-button>

            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 延长订单对话框 -->
    <el-dialog v-model="extendDialogVisible" title="Extend Order" width="500px">
      <div class="p-4">
        <div class="mb-4">
          <p class="text-gray-600 mb-2">Current Order Information:</p>
          <p>Original End Time: {{ formatDate(currentOrder.endTime) }}</p>
        </div>

        <div class="mb-4">
          <p class="text-gray-600 mb-2">Please Select New End Time:</p>
          <el-date-picker
              v-model="newEndTime"
              type="datetime"
              placeholder="Select new end time"
              style="width: 100%"
              format="YYYY-MM-DD HH:mm:00"
              value-format="YYYY-MM-DD HH:mm:00"
              :disabled-date="disablePastDates"
          />
        </div>

        <div class="text-sm text-gray-500 mt-4">
          <p>Note: Extending the order may incur additional charges. Please confirm the new end time.</p>
        </div>
      </div>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="extendDialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="confirmExtendOrder">Confirm Extension</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { userApi } from '@/api/user';
import { List } from '@element-plus/icons-vue';
import {ElMessage, ElMessageBox} from "element-plus";
import {adminListApi} from "@/api/index.js";
import dayjs from "dayjs";

const orders = ref([]);
const extendDialogVisible = ref(false);
const currentOrder = ref({});
const newEndTime = ref('');

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
    throw new Error('Unsupported time format, please provide a Date object, timestamp, or ISO string');
  }

  // 2. 检查是否有效时间
  if (isNaN(inputDate.getTime())) {
    throw new Error('Invalid time format');
  }

  // 3. 与当前时间比较
  const now = new Date();
  return inputDate > now;
}

const disablePastDates = (date) => {
  const today = dayjs().startOf('day');
  return date < today.toDate();
};

// 打开延长订单对话框
const openExtendDialog = (order) => {
  currentOrder.value = order;
  newEndTime.value = order.endTime
  extendDialogVisible.value = true;
};

// 确认延长订单
const confirmExtendOrder = async () => {
  if (!newEndTime.value) {
    ElMessage.warning('Please select a new end time');
    return;
  }

  if (newEndTime.value <= new Date(currentOrder.value.endTime)) {
    ElMessage.warning('New end time must be later than the original end time');
    return;
  }

  try {
    // 这里调用API延长订单
    console.log({
      orderId: currentOrder.value.orderId,
      newEndTime: newEndTime
    })
    const response = await adminListApi.orderEdit({
      orderId: currentOrder.value.orderId,
      endTime: newEndTime.value,
      rentHours: getHoursBetween(currentOrder.value.startTime,newEndTime.value)
    });
    ElMessage.success('Order successfully extended');
    extendDialogVisible.value = false;
    loadOrders(); // 重新加载订单列表
  } catch (error) {
    console.error('Failed to extend order, please try again:', error);
    ElMessage.error('Failed to extend order, please try again');
  }
};

function getHoursBetween(startTime, endTime) {
  // 将输入转换为 Date 对象
  const start = new Date(startTime);
  const end = new Date(endTime);

  // 检查日期有效性
  if (isNaN(start) || isNaN(end)) {
    throw new Error("Invalid date format");
  }

  // 计算毫秒差
  const diffMs = end - start;

  // 转换为小时（含小数）
  const diffHours = diffMs / (1000 * 60 * 60);

  // 返回结果（保留两位小数）
  return Number(diffHours.toFixed(2));
}

const formatDate = (dateString) => {
  console.log('Date formatting input:', dateString);
  if (!dateString) {
    console.log('Date is empty, returning unknown');
    return 'Unknown';
  }
  try {
    const date = new Date(dateString);
    console.log('Date formatting input:', date);
    if (isNaN(date.getTime())) {
      console.log('Invalid date, returning unknown');
      return 'Unknown';
    }
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}`;
    console.log('Formatted date:', formattedDate);
    return formattedDate;
  } catch (e) {
    console.error('Date formatting error:', e);
    return 'Unknown';
  }
};

function getStatusString(status, isChinese = false) {
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
  ElMessageBox.confirm('Are you sure you want to cancel this order?', 'Prompt', {
    confirmButtonText: 'Confirm',
    cancelButtonText: 'Cancel',
    type: 'warning'
  }).then(()=>{
    adminListApi.CancelOrder({
      orderId: id,
      loginId: localStorage.getItem('loginId'),
      status: 'cancel'
    }).then(res => {
      ElMessage.success('Success')
      loadOrders()
    })
  })
}

const loadOrders = async () => {
  try {
    const response = await userApi.getOrders();
    console.log('Complete API response:', response);
    console.log('API response data type:', typeof response);

    // 检查响应数据结构
    if (response?.data) {
      console.log('Data field in response:', response.data);
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
        console.log('Complete order data:', order);
        console.log('Order time data:', {
          orderId: order.orderId,
          startTime: order.startTime,
          endTime: order.endTime,
          createdAt: order.createdAt
        });
      });
    } else {
      console.error('API response data format error:', response);
      orders.value = [];
    }
  } catch (e) {
    console.error('Error loading order data:', e);
    orders.value = [];
  }
};

onMounted(() => {
  loadOrders();
});
</script>
