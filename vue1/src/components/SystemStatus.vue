<template>
  <div class="system-status" :class="{ 'collapsed': isCollapsed }">
    <div class="status-header" @click="toggleCollapse">
      System Status Monitor
      <el-icon :class="{'rotate-icon': !isCollapsed}"><ArrowDown /></el-icon>
    </div>
    
    <div v-if="!isCollapsed" class="status-content">
      <div class="status-section">
        <h3>Route Information</h3>
        <div class="info-item">
          <span class="label">Current Route:</span>
          <span class="value">{{ currentRoute.path }}</span>
        </div>
        <div class="info-item">
          <span class="label">Route Name:</span>
          <span class="value">{{ currentRoute.name }}</span>
        </div>
        <div v-if="Object.keys(currentRoute.params).length" class="info-item">
          <span class="label">Params:</span>
          <span class="value">{{ JSON.stringify(currentRoute.params) }}</span>
        </div>
        <div v-if="Object.keys(currentRoute.query).length" class="info-item">
          <span class="label">Query Params:</span>
          <span class="value">{{ JSON.stringify(currentRoute.query) }}</span>
        </div>
      </div>
      
      <div class="status-section">
        <h3>Pinia State</h3>
        <div class="info-item">
          <span class="label">Logged In:</span>
          <span class="value" :class="userStore.isAuthenticated ? 'status-success' : 'status-error'">
            {{ userStore.isAuthenticated ? 'Yes' : 'No' }}
          </span>
        </div>
        <div class="info-item">
          <span class="label">Username:</span>
          <span class="value">{{ userStore.user?.username || 'Not logged in' }}</span>
        </div>
        <div class="info-item">
          <span class="label">Balance:</span>
          <span class="value">¥{{ userStore.userBalance.toFixed(2) }}</span>
        </div>
        <div class="info-item">
          <span class="label">Admin:</span>
          <span class="value" :class="userStore.isAdmin ? 'status-admin' : ''">
            {{ userStore.isAdmin ? 'Yes' : 'No' }}
          </span>
        </div>
      </div>
      
      <div class="status-section">
        <h3>Actions</h3>
        <div class="action-buttons">
          <el-button size="small" type="primary" @click="userStore.login({username: 'testuser', password: 'password'})">
            Simulate User Login
          </el-button>
          <el-button size="small" type="warning" @click="userStore.switchToAdmin()">
            Switch to Admin
          </el-button>
          <el-button size="small" type="danger" @click="userStore.logout()">
            Logout
          </el-button>
        </div>
        
        <div class="action-buttons mt-2">
          <el-button size="small" type="success" @click="refreshPage">
            Refresh Page
          </el-button>
          <el-button size="small" @click="router.push('/navtest')">
            Navigation Test
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';
import { ArrowDown } from '@element-plus/icons-vue';

const router = useRouter();
const userStore = useUserStore();
const isCollapsed = ref(false);

const currentRoute = computed(() => router.currentRoute.value);

const toggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value;
};

const refreshPage = () => {
  window.location.reload();
};
</script>

<style scoped>
.system-status {
  position: fixed;
  right: 20px;
  top: 70px;
  background-color: rgba(0, 0, 0, 0.85);
  color: #33ff33;
  border-radius: 6px;
  font-family: monospace;
  font-size: 12px;
  width: 300px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  z-index: 9999;
  user-select: none;
  opacity: 0.9;
  transition: all 0.3s ease;
}

.system-status:hover {
  opacity: 1;
}

.system-status.collapsed {
  width: 150px;
}

.status-header {
  padding: 8px 12px;
  background-color: #1976d2;
  color: white;
  cursor: pointer;
  font-weight: bold;
  border-radius: 6px 6px 0 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.status-content {
  padding: 10px;
  max-height: 400px;
  overflow-y: auto;
}

.status-section {
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.status-section:last-child {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}

.status-section h3 {
  color: #ffcc00;
  margin: 0 0 8px 0;
  font-size: 14px;
}

.info-item {
  display: flex;
  justify-content: space-between;
  margin: 4px 0;
}

.label {
  color: #aaaaaa;
}

.value {
  color: #ffffff;
  max-width: 180px;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: right;
}

.status-success {
  color: #4caf50;
}

.status-error {
  color: #f44336;
}

.status-admin {
  color: #ff9800;
}

.action-buttons {
  display: flex;
  gap: 4px;
}

.mt-2 {
  margin-top: 8px;
}

.rotate-icon {
  transform: rotate(180deg);
  transition: transform 0.3s;
}
</style> 