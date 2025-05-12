<template>
  <div class="user-layout min-h-screen flex flex-col bg-gray-50">
    <!-- Navigation bar -->
    <header class="bg-white shadow-sm">
      <div class="container mx-auto px-4">
        <div class="flex justify-between items-center h-16">
          <!-- Left Logo and Title -->
          <div class="flex items-center">
            <router-link to="/" class="flex items-center">
              <ScooterIcon class="mr-2" />
              <span class="text-lg font-medium">Scooter Sharing App</span>
            </router-link>
          </div>

          <!-- Right Navigation Links - Desktop -->
          <nav class="hidden md:flex items-center space-x-4 px-2 py-1 rounded-lg">
            <router-link to="/" class="nav-link" active-class="nav-link-active">Home</router-link>
            <router-link v-if="userStore.isAuthenticated" to="/rent" class="nav-link" active-class="nav-link-active">Rent</router-link>
            <router-link to="/help" class="nav-link" active-class="nav-link-active">Help</router-link>
            <router-link to="/about" class="nav-link" active-class="nav-link-active">About Us</router-link>
          </nav>

          <!-- User Actions Area -->
          <div class="flex items-center space-x-4">
            <template v-if="!userStore.isAuthenticated">
              <router-link to="/auth/login" class="nav-btn bg-blue-100 text-blue-600 border border-blue-600">
                Login
              </router-link>
              <router-link to="/auth/register" class="nav-btn bg-blue-600 text-white">
                Register
              </router-link>
            </template>
            <template v-else>
              <el-dropdown trigger="click" @visible-change="dropdownVisibleChange">
                <div class="flex items-center space-x-2 cursor-pointer px-2 py-1 rounded-lg hover:bg-blue-700 transition-colors duration-200">
                  <div class="relative">
                    <div v-if="userStore.user?.avatar" class="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-md">
                      <img :src="userStore.user.avatar" alt="User Avatar" class="w-full h-full object-cover" />
                    </div>
                    <div v-else class="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center border-2 border-white shadow-md">
                      <span class="text-white font-semibold">{{ userStore.username.charAt(0).toUpperCase() }}</span>
                    </div>
                  </div>
                  <div class="hidden sm:block">
                    <div class="text-white text-sm font-medium">{{ userStore.username }}</div>
                  </div>
                  <el-icon class="text-white transition-transform duration-200" :class="{'rotate-180': dropdownVisible}"><ArrowDown /></el-icon>
                </div>
                <template #dropdown>
                  <el-dropdown-menu class="user-dropdown-menu !p-0 !min-w-64">
                    <div class="bg-gradient-to-r from-blue-600 to-blue-800 py-4 px-5 text-white rounded-t">
                      <div class="flex items-start mb-3">
                        <div class="relative mr-3">
                          <div v-if="userStore.user?.avatar" class="w-14 h-14 rounded-full overflow-hidden border-2 border-white">
                            <img :src="userStore.user.avatar" alt="User Avatar" class="w-full h-full object-cover" />
                          </div>
                          <div v-else class="w-14 h-14 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center border-2 border-white">
                            <span class="text-white text-xl font-semibold">{{ userStore.username.charAt(0).toUpperCase() }}</span>
                          </div>
                        </div>
                        <div class="flex-1">
                          <div class="font-bold text-lg mb-1">{{ userStore.username }}</div>
                          <div class="flex items-center text-sm text-blue-200">
                            <el-icon class="mr-1"><InfoFilled /></el-icon>
                            <span>{{ userStore.user?.email || '' }}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <el-dropdown-item :command="'/profile'" @click="$router.push('/profile')">
                      <div class="flex flex-col items-center p-2 hover:bg-blue-50 rounded-lg transition">
                        <el-icon class="text-blue-600 mb-1" :size="20"><User /></el-icon>
                        <span class="text-sm">Profile</span>
                      </div>
                    </el-dropdown-item>
                    <div class="p-3 border-t border-gray-200">
                      <el-dropdown-item>
                        <div class="flex items-center p-2 mt-2 bg-red-50 rounded-lg text-red-600 hover:bg-red-100 transition" @click="handleLogout">
                          <el-icon class="mr-2" :size="18"><SwitchButton /></el-icon>
                          <span>Logout</span>
                        </div>
                      </el-dropdown-item>
                    </div>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </template>

            <!-- Mobile Menu Button -->
            <button @click="mobileMenuOpen = !mobileMenuOpen" class="md:hidden">
              <el-icon size="24"><Menu /></el-icon>
            </button>
          </div>
        </div>
      </div>

      <!-- Mobile Menu -->
      <div v-show="mobileMenuOpen" class="md:hidden fixed inset-0 bg-gray-900 bg-opacity-50 z-40" @click="closeMobileMenu">
        <div class="absolute right-0 top-0 h-full w-64 bg-white shadow-lg" @click.stop>
          <div class="p-4 border-b relative">
            <button @click="closeMobileMenu" class="absolute top-4 right-4 text-gray-500">
              <el-icon size="20"><Close /></el-icon>
            </button>
            <h3 class="text-lg font-medium text-gray-900">Navigation Menu</h3>
          </div>

          <div class="p-4">
            <router-link to="/" class="block px-3 py-2 rounded bg-blue-600 text-white mb-2" @click="closeMobileMenu">Home</router-link>
            <router-link v-if="userStore.isAuthenticated" to="/rent" class="block px-3 py-2 rounded bg-blue-600 text-white mb-2" @click="closeMobileMenu">Rent</router-link>
            <router-link v-if="userStore.isAuthenticated" to="/scan" class="block px-3 py-2 rounded bg-blue-600 text-white mb-2" @click="closeMobileMenu">Scan</router-link>
            <router-link to="/help" class="block px-3 py-2 rounded bg-blue-600 text-white mb-2" @click="closeMobileMenu">Help</router-link>
            <router-link to="/about" class="block px-3 py-2 rounded bg-blue-600 text-white mb-2" @click="closeMobileMenu">About Us</router-link>

            <div v-if="userStore.isAuthenticated" class="py-1 border-t border-blue-600 mt-2 pt-2">
              <button @click="handleLogout(); closeMobileMenu()" class="block px-3 py-2 rounded bg-red-500 text-white w-full text-left flex items-center">
                <el-icon class="mr-2 text-white"><SwitchButton /></el-icon>
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>

    <main class="main-content flex-grow">
      <router-view></router-view>
    </main>

    <footer class="bg-gray-800 text-white py-8">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 class="text-lg font-bold mb-4">Scooter Sharing</h3>
            <p class="text-gray-400">Convenient, eco-friendly, and economical urban short-distance transportation solution</p>
          </div>
          <div>
            <h3 class="text-lg font-bold mb-4">Quick Links</h3>
            <ul class="space-y-2">
              <li><router-link to="/about" class="text-gray-400">About Us</router-link></li>
              <li><router-link to="/help" class="text-gray-400">Help Center</router-link></li>
              <li><a href="#" class="text-gray-400">Contact Us</a></li>
            </ul>
          </div>
          <div>
            <h3 class="text-lg font-bold mb-4">Contact</h3>
            <p class="text-gray-400">Phone: 400-123-4567</p>
            <p class="text-gray-400">Email: support@scooter-sharing.com</p>
          </div>
        </div>
        <div class="mt-8 pt-4 border-t border-gray-700 text-center text-gray-500">
          <p>&copy; 2024 Scooter Sharing App - Software Engineering Course Project</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';
import { ElMessageBox, ElMessage } from 'element-plus';
import {
  Menu,
  ArrowDown,
  User,
  Setting,
  SwitchButton,
  Wallet,
  Money,
  Timer,
  Star,
  InfoFilled,
  Switch,
  DataBoard,
  Close,
  Warning,
  Discount,
  ChatLineRound,
  Lock
} from '@element-plus/icons-vue';
import ScooterIcon from '@/components/ScooterIcon.vue';

const router = useRouter();
const userStore = useUserStore();
const mobileMenuOpen = ref(false);
const dropdownVisible = ref(false);

// Handle dropdown menu state change
const dropdownVisibleChange = (visible) => {
  dropdownVisible.value = visible;
};

// Handle logout
const handleLogout = () => {
  ElMessageBox.confirm('Are you sure you want to logout?', 'Prompt', {
    confirmButtonText: 'Confirm',
    cancelButtonText: 'Cancel',
    type: 'warning'
  }).then(() => {
    userStore.logout();
    router.push('/');
  }).catch(() => {});
};

// Handle close mobile menu
const closeMobileMenu = () => {
  mobileMenuOpen.value = false;
};
</script>

<style scoped>
.user-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding-top: 50px;
}

.main-content {
  flex: 1;
}

.nav-link {
  @apply px-3 py-2 rounded-md text-sm font-medium text-white bg-blue-600 mx-1;
}

.nav-link-active {
  @apply bg-blue-500;
}

.nav-btn {
  @apply px-3 py-1.5 rounded-md text-sm font-medium;
}

.mobile-nav-link {
  @apply block px-3 py-2 rounded-md text-base font-medium text-white bg-blue-600;
}

.mobile-nav-link-active {
  @apply bg-blue-600;
}

.user-dropdown-menu {
  min-width: 200px;
}
</style>
