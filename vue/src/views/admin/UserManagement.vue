<template>
  <div class="user-management">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>用户管理</span>
          <el-button type="primary" @click="refreshUsers">刷新</el-button>
        </div>
      </template>

      <!-- 用户统计 -->
      <el-row :gutter="20" class="stats-row">
        <el-col :span="6">
          <el-card shadow="hover">
            <template #header>
              <div class="stat-header">总用户数</div>
            </template>
            <div class="stat-value">{{ stats.totalUsers }}</div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card shadow="hover">
            <template #header>
              <div class="stat-header">活跃用户</div>
            </template>
            <div class="stat-value">{{ stats.activeUsers }}</div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card shadow="hover">
            <template #header>
              <div class="stat-header">管理员</div>
            </template>
            <div class="stat-value">{{ stats.adminUsers }}</div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card shadow="hover">
            <template #header>
              <div class="stat-header">今日新增</div>
            </template>
            <div class="stat-value">{{ stats.newUsersToday }}</div>
          </el-card>
        </el-col>
      </el-row>

      <!-- 用户列表 -->
      <el-table :data="users" style="width: 100%" v-loading="loading">
        <el-table-column prop="username" label="用户名" />
        <el-table-column prop="email" label="邮箱" />
        <el-table-column prop="phone" label="手机号" />
        <el-table-column prop="role" label="角色">
          <template #default="scope">
            <el-tag :type="scope.row.role === 'admin' ? 'danger' : 'success'">
              {{ scope.row.role === 'admin' ? '管理员' : '用户' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="isActive" label="状态">
          <template #default="scope">
            <el-tag :type="scope.row.isActive ? 'success' : 'info'">
              {{ scope.row.isActive ? '活跃' : '禁用' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createdAt" label="注册时间">
          <template #default="scope">
            {{ new Date(scope.row.createdAt).toLocaleString() }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template #default="scope">
            <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button
              size="small"
              type="danger"
              @click="handleDelete(scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 编辑用户对话框 -->
    <el-dialog
      v-model="dialogVisible"
      title="编辑用户"
      width="30%"
    >
      <el-form :model="currentUser" label-width="80px">
        <el-form-item label="用户名">
          <el-input v-model="currentUser.username" />
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="currentUser.email" />
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="currentUser.phone" />
        </el-form-item>
        <el-form-item label="角色">
          <el-select v-model="currentUser.role">
            <el-option label="用户" value="user" />
            <el-option label="管理员" value="admin" />
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-switch
            v-model="currentUser.isActive"
            active-text="活跃"
            inactive-text="禁用"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleSave">保存</el-button>
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
    ElMessage.error('获取用户列表失败');
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
    ElMessage.error('获取用户统计失败');
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
    ElMessage.success('用户信息更新成功');
    dialogVisible.value = false;
    refreshUsers();
  } catch (error) {
    ElMessage.error('更新用户信息失败');
  }
};

// 删除用户
const handleDelete = (user) => {
  ElMessageBox.confirm(
    `确定要删除用户 ${user.username} 吗？`,
    '警告',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  ).then(async () => {
    try {
      await userApi.deleteUser(user._id);
      ElMessage.success('用户删除成功');
      refreshUsers();
    } catch (error) {
      ElMessage.error('删除用户失败');
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