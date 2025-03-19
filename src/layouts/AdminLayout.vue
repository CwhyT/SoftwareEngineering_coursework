<template>
  <div class="min-h-screen flex">
    <!-- 侧边栏 -->
    <el-aside width="240px" class="bg-white shadow-lg">
      <div class="p-4 border-b">
        <div class="flex items-center space-x-2">
          <img src="@/assets/logo.png" alt="Logo" class="h-8 w-8">
          <span class="text-xl font-bold text-primary">E-Scooter Admin</span>
        </div>
      </div>
      
      <el-menu
        :default-active="$route.path"
        class="border-none"
        @select="handleSelect"
      >
        <el-menu-item 
          v-for="item in menuItems" 
          :key="item.path"
          :index="item.path"
        >
          <el-icon><component :is="item.icon" /></el-icon>
          <span>{{ item.name }}</span>
        </el-menu-item>
      </el-menu>
    </el-aside>

    <!-- 主要内容区域 -->
    <div class="flex-1 flex flex-col overflow-hidden">
      <el-header class="bg-white shadow-sm flex items-center justify-between px-6">
        <div class="flex items-center">
          <el-breadcrumb>
            <el-breadcrumb-item>首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{ currentPage }}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>

        <div class="flex items-center space-x-4">
          <el-dropdown>
            <span class="flex items-center space-x-2 cursor-pointer">
              <el-avatar :size="32">A</el-avatar>
              <span>管理员</span>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="handleLogout">
                  退出登录
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-header>

      <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </main>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { ElMessage } from 'element-plus'
import {
  DataLine,
  User,
  Money,
  ChatDotSquare
} from '@element-plus/icons-vue'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()

const menuItems = [
  { path: '/admin', name: '仪表盘', icon: DataLine },
  { path: '/admin/users', name: '用户管理', icon: User },
  { path: '/admin/revenue', name: '收入统计', icon: Money },
  { path: '/admin/feedback', name: '反馈管理', icon: ChatDotSquare }
]

const currentPage = computed(() => {
  const currentMenuItem = menuItems.find(item => item.path === route.path)
  return currentMenuItem ? currentMenuItem.name : ''
})

const handleSelect = (path) => {
  router.push(path)
}

const handleLogout = async () => {
  await userStore.logout()
  router.push('/admin/login')
  ElMessage.success('已退出登录')
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.el-menu {
  border-right: none;
}
</style> 