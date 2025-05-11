<template>
  <div class="order-management">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>订单管理</span>
          <el-button @click="refreshOrders">刷新</el-button>
        </div>
      </template>

      <!-- 订单统计 -->
      <el-row :gutter="20" class="stats-row">
        <el-col :span="6">
          <el-card shadow="hover">
            <template #header>
              <div class="stat-header">总订单数</div>
            </template>
            <div class="stat-value">{{ stats.totalOrders }}</div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card shadow="hover">
            <template #header>
              <div class="stat-header">已完成</div>
            </template>
            <div class="stat-value">{{ stats.completedOrders }}</div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card shadow="hover">
            <template #header>
              <div class="stat-header">进行中</div>
            </template>
            <div class="stat-value">{{ stats.inProgressOrders }}</div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card shadow="hover">
            <template #header>
              <div class="stat-header">总收入</div>
            </template>
            <div class="stat-value">¥{{ stats.totalRevenue.toFixed(2) }}</div>
          </el-card>
        </el-col>
      </el-row>

      <!-- 订单列表 -->
      <el-table :data="orders" style="width: 100%" v-loading="loading">
        <el-table-column prop="orderId" label="订单ID" />
        <el-table-column prop="user.username" label="用户" />
        <el-table-column prop="scooter.scooterId" label="车辆ID" />
        <el-table-column prop="startTime" label="开始时间">
          <template #default="scope">
            {{ new Date(scope.row.startTime).toLocaleString() }}
          </template>
        </el-table-column>
        <el-table-column prop="endTime" label="结束时间">
          <template #default="scope">
            {{ scope.row.endTime ? new Date(scope.row.endTime).toLocaleString() : '-' }}
          </template>
        </el-table-column>
        <el-table-column prop="duration" label="时长(分钟)">
          <template #default="scope">
            {{ scope.row.duration ? scope.row.duration.toFixed(1) : '-' }}
          </template>
        </el-table-column>
        <el-table-column prop="amount" label="金额">
          <template #default="scope">
            {{ scope.row.amount ? `¥${scope.row.amount.toFixed(2)}` : '-' }}
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态">
          <template #default="scope">
            <el-tag :type="getStatusType(scope.row.status)">
              {{ getStatusText(scope.row.status) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template #default="scope">
            <el-button
              v-if="scope.row.status === 'in_progress'"
              size="small"
              type="success"
              @click="handleEndOrder(scope.row)"
            >结束订单</el-button>
            <el-button
              v-if="scope.row.status === 'in_progress'"
              size="small"
              type="danger"
              @click="handleCancelOrder(scope.row)"
            >取消订单</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 结束订单对话框 -->
    <el-dialog
      v-model="endDialogVisible"
      title="结束订单"
      width="30%"
    >
      <el-form :model="endForm" label-width="80px">
        <el-form-item label="结束位置">
          <el-input v-model="endForm.endLocation" placeholder="经度,纬度" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="endDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleEndSave">确认结束</el-button>
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
    ElMessage.error('获取订单列表失败');
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
    ElMessage.error('获取订单统计失败');
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
    ElMessage.success('订单结束成功');
    endDialogVisible.value = false;
    refreshOrders();
  } catch (error) {
    ElMessage.error('结束订单失败');
  }
};

// 取消订单
const handleCancelOrder = (order) => {
  ElMessageBox.confirm(
    `确定要取消订单 ${order.orderId} 吗？`,
    '警告',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  ).then(async () => {
    try {
      await orderApi.cancelOrder(order._id);
      ElMessage.success('订单取消成功');
      refreshOrders();
    } catch (error) {
      ElMessage.error('取消订单失败');
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
    completed: '已完成',
    in_progress: '进行中',
    cancelled: '已取消'
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