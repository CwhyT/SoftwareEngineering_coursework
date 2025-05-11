<template>
  <header class="app-header bg-white shadow-sm">
    <!-- 管理控制台顶部按钮 - 仅管理员可见 -->
    <div v-if="userStore.isAdmin" class="bg-orange-500 text-white py-2 px-4 text-center">
      <a href="/admin/vehicles" class="inline-flex items-center font-medium hover:underline">
        <el-icon class="mr-1" :size="18"><Setting /></el-icon>
        点击进入管理控制台
        <el-icon class="ml-1" :size="18"><ArrowRight /></el-icon>
      </a>
    </div>

    <div class="container mx-auto px-4 py-3">
      <div class="flex items-center justify-between">
        <!-- Logo和应用名称 -->
        <div class="flex items-center space-x-4">
          <router-link to="/" class="flex items-center">
            <div class="logo-icon text-blue-600 mr-3">
              <ScooterIcon :size="32" color="#2563eb" />
            </div>
            <div>
              <h1 class="text-xl font-bold text-gray-800">电动滑板车租赁</h1>
              <span class="text-xs text-gray-500">便捷出行 · 绿色环保</span>
            </div>
          </router-link>
        </div>

        <!-- 导航菜单 -->
        <nav class="hidden md:flex space-x-6">
          <router-link to="/" class="nav-link">首页</router-link>
          <router-link to="/rent" class="nav-link">附近车辆</router-link>
          <router-link to="/scan" class="nav-link">扫码租车</router-link>
          <router-link to="/payment" class="nav-link">充值优惠</router-link>
          <router-link to="/profile" class="nav-link">个人中心</router-link>

          <!-- 管理控制台按钮 -->
          <a
            v-if="userStore.isAdmin"
            href="/admin/vehicles"
            class="nav-link flex items-center font-bold text-amber-500 hover:text-amber-600 border border-amber-500 hover:border-amber-600 rounded-md px-2"
          >
            <el-icon class="mr-1"><Setting /></el-icon>
            管理控制台
          </a>
        </nav>

        <!-- 用户信息 / 登录按钮 -->
        <div class="hidden md:flex items-center space-x-4">
          <template v-if="userStore.isAuthenticated">
            <el-dropdown>
              <div class="flex items-center cursor-pointer px-2 py-1 rounded hover:bg-gray-100">
                <el-avatar :size="32" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" />
                <span class="ml-2">{{ userStore.user.username }}</span>
                <el-icon class="ml-1"><ArrowDown /></el-icon>
              </div>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item @click="router.push('/profile')">
                    <el-icon><User /></el-icon>个人中心
                  </el-dropdown-item>
                  <el-dropdown-item v-if="userStore.isAdmin">
                    <a
                      href="/admin/vehicles"
                      target="_self"
                      style="color: inherit; text-decoration: none; display: flex; align-items: center; width: 100%; height: 100%"
                      @click.stop
                    >
                      <el-icon><Setting /></el-icon>
                      <span class="ml-1">进入管理后台</span>
                    </a>
                  </el-dropdown-item>
                  <el-dropdown-item divided @click="handleLogout">
                    <el-icon><SwitchButton /></el-icon>退出登录
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </template>
          <template v-else>
            <router-link to="/auth/login" class="login-button">
              <el-button type="primary">登录</el-button>
            </router-link>
            <router-link to="/auth/register">
              <el-button>注册</el-button>
            </router-link>
          </template>
        </div>

        <!-- 移动端菜单按钮 -->
        <button @click="mobileMenuOpen = !mobileMenuOpen" class="md:hidden text-gray-700">
          <el-icon v-if="!mobileMenuOpen" size="24"><Menu /></el-icon>
          <el-icon v-else size="24"><Close /></el-icon>
        </button>
      </div>

      <!-- 移动端导航菜单 -->
      <div v-if="mobileMenuOpen" class="md:hidden mt-4 pb-2">
        <div class="flex flex-col space-y-3">
          <router-link to="/" class="mobile-nav-link" @click="mobileMenuOpen = false">首页</router-link>
          <router-link to="/rent" class="mobile-nav-link" @click="mobileMenuOpen = false">附近车辆</router-link>
          <router-link to="/scan" class="mobile-nav-link" @click="mobileMenuOpen = false">扫码租车</router-link>
          <router-link to="/payment" class="mobile-nav-link" @click="mobileMenuOpen = false">充值优惠</router-link>
          <router-link to="/profile" class="mobile-nav-link" @click="mobileMenuOpen = false">个人中心</router-link>

          <!-- 管理员专属选项 -->
          <a
            v-if="userStore.isAdmin"
            href="/admin/vehicles"
            class="mobile-nav-link admin-link"
            @click="mobileMenuOpen = false"
          >
            <div class="flex items-center">
              <el-icon class="mr-2"><Setting /></el-icon>
              管理后台
            </div>
          </a>

          <!-- 移动端登录/注册/退出按钮 -->
          <div class="pt-2 border-t border-gray-200">
            <template v-if="userStore.isAuthenticated">
              <div class="flex items-center px-1 py-2">
                <el-avatar :size="28" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" />
                <span class="ml-2">{{ userStore.user.username }}</span>
              </div>
              <button @click="handleLogout" class="w-full text-left py-2 text-red-600">
                退出登录
              </button>
            </template>
            <template v-else>
              <div class="flex space-x-2">
                <router-link to="/auth/login" class="flex-1" @click="mobileMenuOpen = false">
                  <el-button type="primary" class="w-full">登录</el-button>
                </router-link>
                <router-link to="/auth/register" class="flex-1" @click="mobileMenuOpen = false">
                  <el-button class="w-full">注册</el-button>
                </router-link>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';
import { Menu, Close, User, ArrowDown, Setting, SwitchButton, ArrowRight } from '@element-plus/icons-vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import ScooterIcon from '@/components/ScooterIcon.vue';

const router = useRouter();
const userStore = useUserStore();
const mobileMenuOpen = ref(false);

// 处理退出登录
const handleLogout = () => {
  ElMessageBox.confirm('确定要退出登录吗?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async () => {
    await userStore.logout();
    router.push('/');
    mobileMenuOpen.value = false;
  }).catch(() => {
    // 用户取消操作
  });
};

// 跳转到管理后台
const goToAdmin = () => {
  // if (userStore.isAdmin) {
    // 使用直接跳转，不依赖vue-router
    window.location.href = '/admin/vehicles';
  // } else {
  //   ElMessage.warning('您没有管理员权限');
  // }
};
</script>

<style scoped>
.nav-link {
  font-size: 0.95rem;
  color: #4b5563;
  font-weight: 500;
  padding: 0.5rem 0;
  transition: color 0.3s ease;
}

.nav-link:hover,
.nav-link.router-link-active {
  color: #2563eb;
}

.admin-link {
  color: #2563eb;
  display: flex;
  align-items: center;
}

.mobile-nav-link {
  display: block;
  padding: 0.75rem 0;
  font-size: 1rem;
  color: #4b5563;
  font-weight: 500;
  border-bottom: 1px solid #f3f4f6;
}

.mobile-nav-link:hover,
.mobile-nav-link.router-link-active {
  color: #2563eb;
}

.login-button {
  margin-right: 0.5rem;
}
</style>
