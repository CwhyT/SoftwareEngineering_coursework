<template>
  <div class="admin-layout flex h-screen bg-gray-100">
    <!-- 侧边栏 -->
    <div class="sidebar bg-gray-900 text-white w-64 flex-shrink-0 hidden md:block">
      <!-- 品牌标志 -->
      <div class="px-6 py-4 border-b border-gray-800">
        <div class="flex items-center">
          <div class="w-8 h-8 bg-amber-500 rounded-md flex items-center justify-center mr-3">
            <el-icon size="20"><Setting /></el-icon>
          </div>
          <div>
            <h1 class="text-lg font-semibold">Admin Panel</h1>
            <div class="text-xs text-gray-400">Electric Scooter Rental System</div>
          </div>
        </div>
      </div>

      <!-- 导航菜单 -->
      <div class="py-4">
        <div @click="navigateTo('/admin/store')" class="menu-item" :class="{ 'active': isActive('/admin/store') }">
          <el-icon><Connection /></el-icon>
          <span>Store Management</span>
        </div>
        <div @click="navigateTo('/admin/vehicles')" class="menu-item" :class="{ 'active': isActive('/admin/vehicles') }">
          <el-icon><Connection /></el-icon>
          <span>Vehicle Management</span>
        </div>
        <div @click="navigateTo('/admin/users')" class="menu-item" :class="{ 'active': isActive('/admin/users') }">
          <el-icon><User /></el-icon>
          <span>User Management</span>
        </div>
        <div @click="navigateTo('/admin/orders')" class="menu-item" :class="{ 'active': isActive('/admin/orders') }">
          <el-icon><List /></el-icon>
          <span>Order Management</span>
        </div>

        <div @click="navigateTo('/admin/maintenance')" class="menu-item" :class="{ 'active': isActive('/admin/maintenance') }">
          <el-icon><Tools /></el-icon>
          <span>Feedback Management</span>
        </div>

        <div @click="navigateTo('/admin/database')" class="menu-item" :class="{ 'active': isActive('/admin/database') }">
          <el-icon><DataBoard /></el-icon>
          <span>Coupon Management</span>
        </div>

        <div @click="navigateTo('/admin/reports')" class="menu-item" :class="{ 'active': isActive('/admin/reports') }">
          <el-icon><TrendCharts /></el-icon>
          <span>Data Reports</span>
        </div>

        <div @click="navigateTo('/')" class="menu-item !justify-between mt-4">
          <div class="flex items-center">
            <el-icon><Back /></el-icon>
            <span>Back to User Home</span>
          </div>
        </div>

        <div @click="logout" class="menu-item text-red-300 hover:text-red-200 cursor-pointer">
          <el-icon><Right /></el-icon>
          <span>Logout</span>
        </div>
      </div>
    </div>

    <!-- 内容区域 -->
    <div class="flex-1 flex flex-col overflow-hidden">
      <!-- 顶部导航栏 -->
      <header class="bg-white shadow-sm">
        <div class="flex items-center justify-between h-16 px-6">
          <!-- 移动菜单按钮 -->
          <div class="flex items-center">
            <button @click="toggleMobileMenu" class="lg:hidden mr-2 text-gray-500">
              <el-icon size="24"><Menu /></el-icon>
            </button>
          </div>

          <!-- 右侧用户信息 -->
          <div class="flex items-center">
            <NotificationPanel class="mr-4" />

            <div class="flex items-center">
              <div class="avatar w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center mr-2">
                {{ userStore.username.slice(0, 1) }}
              </div>
              <div class="hidden md:block">
                <div class="text-sm font-medium">{{ userStore.username }}</div>
                <div class="text-xs text-gray-500">Administrator</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <!-- 移动端菜单 -->
      <div v-if="mobileMenuOpen" class="md:hidden fixed inset-0 bg-gray-900 bg-opacity-50 z-40">
        <div class="w-64 h-full bg-gray-900 p-4 transform transition-transform duration-300 ease-in-out">
          <div class="flex justify-between items-center mb-6">
            <div class="text-white text-lg font-semibold">Admin Panel</div>
            <button @click="toggleMobileMenu" class="text-white">
              <el-icon size="20"><Close /></el-icon>
            </button>
          </div>

          <div @click="navigateAndCloseMobile('/admin/users')" class="mobile-menu-item" :class="{ 'active': isActive('/admin/users') }">
            <el-icon><User /></el-icon>
            <span>User Management</span>
          </div>

          <div @click="navigateAndCloseMobile('/admin/store')" class="mobile-menu-item" :class="{ 'active': isActive('/admin/store') }">
            <el-icon><Connection /></el-icon>
            <span>Store Management</span>
          </div>

          <div @click="navigateAndCloseMobile('/admin/vehicles')" class="mobile-menu-item" :class="{ 'active': isActive('/admin/vehicles') }">
            <el-icon><Connection /></el-icon>
            <span>Vehicle Management</span>
          </div>

          <div @click="navigateAndCloseMobile('/admin/orders')" class="mobile-menu-item" :class="{ 'active': isActive('/admin/orders') }">
            <el-icon><List /></el-icon>
            <span>Order Management</span>
          </div>

          <div @click="navigateAndCloseMobile('/admin/database')" class="mobile-menu-item" :class="{ 'active': isActive('/admin/database') }">
            <el-icon><DataBoard /></el-icon>
            <span>Coupon Management</span>
          </div>

          <div @click="logout" class="mobile-menu-item text-red-300 cursor-pointer">
            <el-icon><Right /></el-icon>
            <span>Logout</span>
          </div>
        </div>
      </div>

      <!-- 主要内容 -->
      <main class="flex-1 overflow-auto bg-gray-50 pb-8">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import {
  Menu,
  Close,
  Setting,
  User,
  ArrowRight,
  ArrowDown,
  Right,
  Bell,
  List,
  DataBoard,
  Connection,
  Tools,
  TrendCharts,
  SwitchButton,
  ChatLineRound,
  Back
} from '@element-plus/icons-vue';
import { useUserStore } from '@/stores/user';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import NotificationPanel from '@/components/NotificationPanel.vue';

const userStore = useUserStore();
const router = useRouter();
const mobileMenuOpen = ref(false);
const currentRoute = ref(router.currentRoute.value.path);

// 验证管理员权限
onMounted(() => {
  // console.log('AdminLayout mounted, isAdmin:', userStore.isAdmin);
  // if (!userStore.isAdmin) {
  //   ElMessage({
  //     type: 'error',
  //     message: 'You do not have admin privileges to access this page',
  //     duration: 3000
  //   });
  //   router.push('/');
  //   return;
  // }

  // 再次从localStorage验证，防止前端状态被篡改
  // try {
  //   const userData = localStorage.getItem('user');
  //   if (!userData) {
  //     redirectToHome();
  //     return;
  //   }
  //
  //   const user = JSON.parse(userData);
  //   if (user.role !== 'admin') {
  //     redirectToHome();
  //     return;
  //   }
  // } catch (e) {
  //   redirectToHome();
  // }
});

// 重定向到首页
function redirectToHome() {
  ElMessage({
    type: 'error',
    message: '权限验证失败，无法访问管理页面',
    duration: 3000
  });
  router.push('/');
}

// 退出登录
const logout = () => {
  // userStore.clearUser();
  ElMessage({
    type: 'success',
    message: '退出登录成功',
    duration: 1500
  });
  router.push('/login');
};

// 移动端菜单控制
const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value;
};

const closeMobileMenu = () => {
  mobileMenuOpen.value = false;
};

// 导航方法
const navigateTo = (path) => {
  console.log('导航到:', path);
  currentRoute.value = path;
  router.push(path);
};

// 判断路由是否活跃
const isActive = (path) => {
  return router.currentRoute.value.path === path;
};

// 导航并关闭移动菜单
const navigateAndCloseMobile = (path) => {
  console.log('导航到:', path);
  currentRoute.value = path;
  router.push(path);
  closeMobileMenu();
};
</script>

<style scoped>
.menu-item {
  @apply flex items-center px-6 py-3 text-gray-300 hover:text-white hover:bg-gray-800 transition-colors;
}

.menu-item.active {
  @apply bg-gray-800 text-white border-l-4 border-amber-500 pl-5;
}

.menu-item el-icon {
  @apply mr-3;
}

/* 无悬停效果的菜单项 */
.menu-item-no-hover {
  @apply flex items-center px-6 py-3 text-red-300;
}

.menu-item-no-hover el-icon {
  @apply mr-3;
}

.mobile-menu-item {
  @apply flex items-center py-3 px-3 text-gray-300 hover:text-white hover:bg-gray-800 rounded-md mb-1 transition-colors;
}

.mobile-menu-item.active {
  @apply bg-gray-800 text-white border-l-4 border-amber-500 pl-2;
}

.mobile-menu-item el-icon {
  @apply mr-3;
}

/* 确保内容区域可以正确滚动 */
main {
  height: calc(100vh - 64px); /* 减去顶部导航栏的高度 */
  overflow-y: auto;
}

.mobile-menu-item-no-hover {
  @apply flex items-center py-3 px-3 text-red-300 rounded-md mb-1;
}

.mobile-menu-item-no-hover el-icon {
  @apply mr-3;
}
</style>
