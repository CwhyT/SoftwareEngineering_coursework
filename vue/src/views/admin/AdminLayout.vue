<template>
  <div class="admin-layout">
    <el-container>
      <el-aside width="240px" class="admin-sidebar">
        <div class="logo-container">
          <img src="@/assets/logo.png" alt="Logo" class="logo" />
          <h2>管理控制台</h2>
        </div>
        <el-menu
          :default-active="activeMenu"
          class="sidebar-menu"
          router
          background-color="#001529"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-menu-item index="/admin/dashboard">
            <el-icon><DataBoard /></el-icon>
            <span>控制面板</span>
          </el-menu-item>

          <el-menu-item index="/admin/scooters">
            <el-icon><Van /></el-icon>
            <span>车辆管理</span>
          </el-menu-item>

          <el-menu-item index="/admin/users">
            <el-icon><User /></el-icon>
            <span>用户管理</span>
          </el-menu-item>

          <el-menu-item index="/admin/orders">
            <el-icon><Tickets /></el-icon>
            <span>订单管理</span>
          </el-menu-item>

          <el-menu-item index="/admin/stations">
            <el-icon><Location /></el-icon>
            <span>站点管理</span>
          </el-menu-item>

          <el-menu-item index="/admin/feedback">
            <el-icon><ChatDotRound /></el-icon>
            <span>反馈管理</span>
          </el-menu-item>

<!--          <el-menu-item index="/admin/settings">-->
<!--            <el-icon><Setting /></el-icon>-->
<!--            <span>系统设置</span>-->
<!--          </el-menu-item>-->
        </el-menu>
      </el-aside>

      <el-container>
        <el-header class="admin-header">
          <div class="header-content">
            <el-breadcrumb :separator-icon="ArrowRight">
              <el-breadcrumb-item :to="{ path: '/admin/dashboard' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item v-if="activeBreadcrumb">{{ activeBreadcrumb }}</el-breadcrumb-item>
            </el-breadcrumb>

            <div class="user-actions">
              <el-dropdown trigger="click">
                <div class="user-info">
                  <img
                    src="https://randomuser.me/api/portraits/men/85.jpg"
                    alt="Admin"
                    class="avatar"
                  />
                  <span>管理员</span>
                  <el-icon><ArrowDown /></el-icon>
                </div>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item>个人信息</el-dropdown-item>
                    <el-dropdown-item>修改密码</el-dropdown-item>
                    <el-dropdown-item divided @click="logout">退出登录</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
          </div>
        </el-header>

        <el-main class="admin-main">
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import {
  DataBoard,
  Van,
  User,
  Tickets,
  Location,
  Setting,
  ArrowRight,
  ArrowDown,
  ChatDotRound
} from '@element-plus/icons-vue';

const router = useRouter();
const route = useRoute();
const activeMenu = ref('');

// 活跃的面包屑文本
const activeBreadcrumb = computed(() => {
  const breadcrumbMap = {
    '/admin/dashboard': '控制面板',
    '/admin/scooters': '车辆管理',
    '/admin/users': '用户管理',
    '/admin/orders': '订单管理',
    '/admin/stations': '站点管理',
    '/admin/feedback': '反馈管理',
    '/admin/settings': '系统设置'
  };

  return breadcrumbMap[route.path] || '';
});

// 监听路由变化
watch(
  () => route.path,
  (path) => {
    activeMenu.value = path;
  }
);

// 退出登录
const logout = () => {
  // 这里实现登出逻辑
  router.push('/login');
};

onMounted(() => {
  activeMenu.value = route.path;
});
</script>

<style scoped>
.admin-layout {
  height: 100vh;
  display: flex;
}

.admin-sidebar {
  background-color: #001529;
  color: white;
  height: 100vh;
  overflow-y: auto;
}

.logo-container {
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #002140;
}

.logo {
  height: 50px;
  margin-bottom: 10px;
}

.logo-container h2 {
  color: white;
  margin: 0;
  font-size: 16px;
}

.sidebar-menu {
  border-right: none;
}

.admin-header {
  background-color: #fff;
  border-bottom: 1px solid #e6e6e6;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  display: flex;
  align-items: center;
  height: 64px;
  padding: 0 16px;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.user-actions {
  display: flex;
  align-items: center;
}

.user-info {
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 0 8px;
}

.avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin-right: 8px;
}

.admin-main {
  background-color: #f0f2f5;
  padding: 24px;
  overflow-y: auto;
  height: calc(100vh - 64px);
}
</style>
