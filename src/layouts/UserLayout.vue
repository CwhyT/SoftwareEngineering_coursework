<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 顶部导航栏 -->
    <el-header class="bg-white shadow-sm">
      <div class="container mx-auto px-4 h-full flex items-center justify-between">
        <router-link to="/" class="flex items-center space-x-2">
          <img src="@/assets/logo.png" alt="Logo" class="h-8 w-8">
          <span class="text-xl font-bold text-primary">E-Scooter</span>
        </router-link>
        
        <nav class="hidden md:flex items-center space-x-6">
          <router-link 
            v-for="item in navItems" 
            :key="item.path"
            :to="item.path"
            class="text-gray-600 hover:text-primary transition-colors"
            active-class="text-primary font-medium"
          >
            {{ item.name }}
          </router-link>
        </nav>

        <div class="flex items-center space-x-4">
          <template v-if="isAuthenticated">
            <el-dropdown>
              <span class="flex items-center space-x-2 cursor-pointer">
                <el-avatar :size="32" :src="userInfo?.avatar || ''">
                  {{ userInfo?.nickname?.[0] || userInfo?.username?.[0] || 'U' }}
                </el-avatar>
                <span class="text-gray-600">{{ userInfo?.nickname || userInfo?.username }}</span>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item @click="$router.push('/profile')">
                    个人中心
                  </el-dropdown-item>
                  <el-dropdown-item @click="handleLogout">
                    退出登录
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </template>
          <template v-else>
            <router-link 
              to="/login"
              class="text-gray-600 hover:text-primary transition-colors"
            >
              登录
            </router-link>
            <router-link 
              to="/register"
              class="btn btn-primary"
            >
              注册
            </router-link>
          </template>
        </div>
      </div>
    </el-header>

    <!-- 移动端导航菜单 -->
    <div class="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t">
      <div class="grid grid-cols-4 py-2">
        <router-link
          v-for="item in navItems"
          :key="item.path"
          :to="item.path"
          class="flex flex-col items-center space-y-1"
          active-class="text-primary"
        >
          <el-icon><component :is="item.icon" /></el-icon>
          <span class="text-xs">{{ item.name }}</span>
        </router-link>
      </div>
    </div>

    <!-- 主要内容区域 -->
    <main class="container mx-auto px-4 py-6 mb-16 md:mb-0">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'
import { ElMessage } from 'element-plus'
import { 
  Location, 
  Bicycle, 
  User, 
  ChatDotSquare 
} from '@element-plus/icons-vue'

const router = useRouter()
const userStore = useUserStore()

const { userInfo, isAuthenticated } = storeToRefs(userStore)

// 开发模式下静态数据
const staticUserInfo = {
  id: 1,
  username: 'test_user',
  nickname: '测试用户',
  balance: 100,
  avatar: ''
}

// 在开发模式下直接使用静态数据
if (import.meta.env.DEV) {
  userInfo.value = staticUserInfo
}

const navItems = [
  { path: '/', name: '首页', icon: Location },
  { path: '/rent', name: '租赁', icon: Bicycle },
  { path: '/profile', name: '我的', icon: User },
  { path: '/feedback', name: '反馈', icon: ChatDotSquare }
]

// 简化mounted钩子
onMounted(() => {
  // 开发模式不需要获取用户信息
  if (!import.meta.env.DEV && isAuthenticated.value) {
    userStore.fetchUserInfo()
  }
})

const handleLogout = async () => {
  await userStore.logout()
  router.push('/login')
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
</style> 