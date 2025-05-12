<template>
  <div class="order-management">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>Order Management</span>
          <el-button @click="refreshOrders">Refresh</el-button>
        </div>
      </template>

      <!-- Order Statistics -->
      <el-row :gutter="20" class="stats-row">
        <el-col :span="6">
          <el-card shadow="hover">
            <template #header>
              <div class="stat-header">Total Orders</div>
            </template>
            <div class="stat-value">{{ stats.totalOrders }}</div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card shadow="hover">
            <template #header>
              <div class="stat-header">Completed</div>
            </template>
            <div class="stat-value">{{ stats.completedOrders }}</div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card shadow="hover">
            <template #header>
              <div class="stat-header">In Progress</div>
            </template>
            <div class="stat-value">{{ stats.inProgressOrders }}</div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card shadow="hover">
            <template #header>
              <div class="stat-header">Total Revenue</div>
            </template>
            <div class="stat-value">¥{{ stats.totalRevenue.toFixed(2) }}</div>
          </el-card>
        </el-col>
      </el-row>

      <!-- Order List -->
      <el-table :data="orders" style="width: 100%" v-loading="loading">
        <el-table-column prop="orderId" label="Order ID" />
        <el-table-column prop="user.username" label="User" />
        <el-table-column prop="scooter.scooterId" label="Vehicle ID" />
        <el-table-column prop="startTime" label="Start Time">
          <template #default="scope">
            {{ new Date(scope.row.startTime).toLocaleString() }}
          </template>
        </el-table-column>
        <el-table-column prop="endTime" label="End Time">
          <template #default="scope">
            {{ scope.row.endTime ? new Date(scope.row.endTime).toLocaleString() : '-' }}
          </template>
        </el-table-column>
        <el-table-column prop="duration" label="Duration (min)">
          <template #default="scope">
            {{ scope.row.duration ? scope.row.duration.toFixed(1) : '-' }}
          </template>
        </el-table-column>
        <el-table-column prop="amount" label="Amount">
          <template #default="scope">
            {{ scope.row.amount ? `¥${scope.row.amount.toFixed(2)}` : '-' }}
          </template>
        </el-table-column>
        <el-table-column prop="status" label="Status">
          <template #default="scope">
            <el-tag :type="getStatusType(scope.row.status)">
              {{ getStatusText(scope.row.status) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="Actions" width="200">
          <template #default="scope">
            <el-button
              v-if="scope.row.status === 'in_progress'"
              size="small"
              type="success"
              @click="handleEndOrder(scope.row)"
            >End Order</el-button>
            <el-button
              v-if="scope.row.status === 'in_progress'"
              size="small"
              type="danger"
              @click="handleCancelOrder(scope.row)"
            >Cancel Order</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- End Order Dialog -->
    <el-dialog
      v-model="endDialogVisible"
      title="End Order"
      width="30%"
    >
      <el-form :model="endForm" label-width="80px">
        <el-form-item label="End Location">
          <el-input v-model="endForm.endLocation" placeholder="Longitude,Latitude" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="endDialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="handleEndSave">Confirm</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { orderApi } from '@/api/order';

const orders = ref([]);
const loading = ref(false);
const endDialogVisible = ref(false);
const endForm = ref({
  id: '',
  endLocation: ''
});

const stats = ref({
  totalOrders: 0,
  completedOrders: 0,
  inProgressOrders: 0,
  cancelledOrders: 0,
  totalRevenue: 0
});

// 获取订单列表
const fetchOrders = async () => {
  try {
    loading.value = true;
    const response = await orderApi.getAllOrders();
    orders.value = response.data.data;
  } catch (error) {
    ElMessage.error('Failed to fetch order list');
  } finally {
    loading.value = false;
  }
};

// 获取订单统计
const fetchStats = async () => {
  try {
    const response = await orderApi.getOrderStats();
    stats.value = response.data.data;
  } catch (error) {
    ElMessage.error('Failed to fetch order statistics');
  }
};

// 刷新数据
const refreshOrders = () => {
  fetchOrders();
  fetchStats();
};

// 结束订单
const handleEndOrder = (order) => {
  endForm.value = {
    id: order._id,
    endLocation: ''
  };
  endDialogVisible.value = true;
};

// 保存结束订单
const handleEndSave = async () => {
  try {
    await orderApi.endOrder(endForm.value.id, {
      endLocation: endForm.value.endLocation.split(',').map(Number)
    });
    ElMessage.success('Order ended successfully');
    endDialogVisible.value = false;
    refreshOrders();
  } catch (error) {
    ElMessage.error('Failed to end order');
  }
};

// 取消订单
const handleCancelOrder = (order) => {
  ElMessageBox.confirm(
    `Are you sure you want to cancel order ${order.orderId}?`,
    'Warning',
    {
      confirmButtonText: 'Confirm',
      cancelButtonText: 'Cancel',
      type: 'warning',
    }
  ).then(async () => {
    try {
      await orderApi.cancelOrder(order._id);
      ElMessage.success('Order cancelled successfully');
      refreshOrders();
    } catch (error) {
      ElMessage.error('Failed to cancel order');
    }
  });
};

// 获取状态类型
const getStatusType = (status) => {
  const types = {
    completed: 'success',
    in_progress: 'warning',
    cancelled: 'info'
  };
  return types[status] || 'info';
};

// 获取状态文本
const getStatusText = (status) => {
  const texts = {
    completed: 'Completed',
    in_progress: 'In Progress',
    cancelled: 'Cancelled'
  };
  return texts[status] || status;
};

onMounted(() => {
  refreshOrders();
});
</script>

<style scoped>
.order-management {
  padding: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.stats-row {
  margin-bottom: 20px;
}

.stat-header {
  font-size: 14px;
  color: #666;
}

.stat-value {
  font-size: 24px;
  font-weight: bold;
  color: #409EFF;
  text-align: center;
}
</style> 