<template>
  <div class="user-management">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>User Management</span>
          <el-button type="primary" @click="refreshUsers">Refresh</el-button>
        </div>
      </template>

      <!-- 用户统计 -->
      <el-row :gutter="20" class="stats-row">
        <el-col :span="6">
          <el-card shadow="hover">
            <template #header>
              <div class="stat-header">Total Users</div>
            </template>
            <div class="stat-value">{{ stats.totalUsers }}</div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card shadow="hover">
            <template #header>
              <div class="stat-header">Active Users</div>
            </template>
            <div class="stat-value">{{ stats.activeUsers }}</div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card shadow="hover">
            <template #header>
              <div class="stat-header">Administrators</div>
            </template>
            <div class="stat-value">{{ stats.adminUsers }}</div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card shadow="hover">
            <template #header>
              <div class="stat-header">New Today</div>
            </template>
            <div class="stat-value">{{ stats.newUsersToday }}</div>
          </el-card>
        </el-col>
      </el-row>

      <!-- 用户列表 -->
      <el-table :data="users" style="width: 100%" v-loading="loading">
        <el-table-column prop="username" label="Username" />
        <el-table-column prop="email" label="Email" />
        <el-table-column prop="phone" label="Phone" />
        <el-table-column prop="role" label="Role">
          <template #default="scope">
            <el-tag :type="scope.row.role === 'admin' ? 'danger' : 'success'">
              {{ scope.row.role === 'admin' ? 'Administrator' : 'User' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="isActive" label="Status">
          <template #default="scope">
            <el-tag :type="scope.row.isActive ? 'success' : 'info'">
              {{ scope.row.isActive ? 'Active' : 'Disabled' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createdAt" label="Registration Time">
          <template #default="scope">
            {{ new Date(scope.row.createdAt).toLocaleString() }}
          </template>
        </el-table-column>
        <el-table-column label="Actions" width="200">
          <template #default="scope">
            <el-button size="small" @click="handleEdit(scope.row)">Edit</el-button>
            <el-button
              size="small"
              type="danger"
              @click="handleDelete(scope.row)"
            >Delete</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 编辑用户对话框 -->
    <el-dialog
      v-model="dialogVisible"
      title="Edit User"
      width="30%"
    >
      <el-form :model="currentUser" label-width="80px">
        <el-form-item label="Username">
          <el-input v-model="currentUser.username" />
        </el-form-item>
        <el-form-item label="Email">
          <el-input v-model="currentUser.email" />
        </el-form-item>
        <el-form-item label="Phone">
          <el-input v-model="currentUser.phone" />
        </el-form-item>
        <el-form-item label="Role">
          <el-select v-model="currentUser.role">
            <el-option label="User" value="user" />
            <el-option label="Administrator" value="admin" />
          </el-select>
        </el-form-item>
        <el-form-item label="Status">
          <el-switch
            v-model="currentUser.isActive"
            active-text="Active"
            inactive-text="Disabled"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="handleSave">Save</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { userApi } from '@/api/user';

const users = ref([]);
const loading = ref(false);
const dialogVisible = ref(false);
const currentUser = ref({});
const stats = ref({
  totalUsers: 0,
  activeUsers: 0,
  adminUsers: 0,
  newUsersToday: 0
});

// 获取用户列表
const fetchUsers = async () => {
  try {
    loading.value = true;
    const response = await userApi.getAllUsers();
    users.value = response.data.data;
  } catch (error) {
    ElMessage.error('Failed to fetch user list');
  } finally {
    loading.value = false;
  }
};

// 获取用户统计
const fetchStats = async () => {
  try {
    const response = await userApi.getUserStats();
    stats.value = response.data.data;
  } catch (error) {
    ElMessage.error('Failed to fetch user statistics');
  }
};

// 刷新数据
const refreshUsers = () => {
  fetchUsers();
  fetchStats();
};

// 编辑用户
const handleEdit = (user) => {
  currentUser.value = { ...user };
  dialogVisible.value = true;
};

// 保存用户信息
const handleSave = async () => {
  try {
    await userApi.updateUser(currentUser.value._id, currentUser.value);
    ElMessage.success('User information updated successfully');
    dialogVisible.value = false;
    refreshUsers();
  } catch (error) {
    ElMessage.error('Failed to update user information');
  }
};

// 删除用户
const handleDelete = (user) => {
  ElMessageBox.confirm(
    `Are you sure you want to delete user ${user.username}?`,
    'Warning',
    {
      confirmButtonText: 'Confirm',
      cancelButtonText: 'Cancel',
      type: 'warning',
    }
  ).then(async () => {
    try {
      await userApi.deleteUser(user._id);
      ElMessage.success('User deleted successfully');
      refreshUsers();
    } catch (error) {
      ElMessage.error('Failed to delete user');
    }
  });
};

onMounted(() => {
  refreshUsers();
});
</script>

<style scoped>
.user-management {
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