<template>
  <header class="app-header bg-white shadow-sm">
    <!-- Admin console top button - only visible to admins -->
    <div v-if="userStore.isAdmin" class="bg-orange-500 text-white py-2 px-4 text-center">
      <a href="/admin/vehicles" class="inline-flex items-center font-medium hover:underline">
        <el-icon class="mr-1" :size="18"><Setting /></el-icon>
        Click to enter admin console
        <el-icon class="ml-1" :size="18"><ArrowRight /></el-icon>
      </a>
    </div>

    <div class="container mx-auto px-4 py-3">
      <div class="flex items-center justify-between">
        <!-- Logo and app name -->
        <div class="flex items-center space-x-4">
          <router-link to="/" class="flex items-center">
            <div class="logo-icon text-blue-600 mr-3">
              <ScooterIcon :size="32" color="#2563eb" />
            </div>
            <div>
              <h1 class="text-xl font-bold text-gray-800">Electric Scooter Rental</h1>
              <span class="text-xs text-gray-500">Convenient Travel · Green Environment</span>
            </div>
          </router-link>
        </div>

        <!-- Navigation menu -->
        <nav class="hidden md:flex space-x-6">
          <router-link to="/" class="nav-link">Home</router-link>
          <router-link to="/rent" class="nav-link">Nearby Vehicles</router-link>
          <router-link to="/scan" class="nav-link">Scan to Rent</router-link>
          <router-link to="/payment" class="nav-link">Recharge Offers</router-link>
          <router-link to="/profile" class="nav-link">Profile</router-link>

          <!-- Admin console button -->
          <a
            v-if="userStore.isAdmin"
            href="/admin/vehicles"
            class="nav-link flex items-center font-bold text-amber-500 hover:text-amber-600 border border-amber-500 hover:border-amber-600 rounded-md px-2"
          >
            <el-icon class="mr-1"><Setting /></el-icon>
            Admin Console
          </a>
        </nav>

        <!-- User info / Login buttons -->
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
                    <el-icon><User /></el-icon>Profile
                  </el-dropdown-item>
                  <el-dropdown-item v-if="userStore.isAdmin">
                    <a
                      href="/admin/vehicles"
                      target="_self"
                      style="color: inherit; text-decoration: none; display: flex; align-items: center; width: 100%; height: 100%"
                      @click.stop
                    >
                      <el-icon><Setting /></el-icon>
                      <span class="ml-1">Enter Admin Panel</span>
                    </a>
                  </el-dropdown-item>
                  <el-dropdown-item divided @click="handleLogout">
                    <el-icon><SwitchButton /></el-icon>Logout
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </template>
          <template v-else>
            <router-link to="/auth/login" class="login-button">
              <el-button type="primary">Login</el-button>
            </router-link>
            <router-link to="/auth/register">
              <el-button>Register</el-button>
            </router-link>
          </template>
        </div>

        <!-- Mobile menu button -->
        <button @click="mobileMenuOpen = !mobileMenuOpen" class="md:hidden text-gray-700">
          <el-icon v-if="!mobileMenuOpen" size="24"><Menu /></el-icon>
          <el-icon v-else size="24"><Close /></el-icon>
        </button>
      </div>

      <!-- Mobile navigation menu -->
      <div v-if="mobileMenuOpen" class="md:hidden mt-4 pb-2">
        <div class="flex flex-col space-y-3">
          <router-link to="/" class="mobile-nav-link" @click="mobileMenuOpen = false">Home</router-link>
          <router-link to="/rent" class="mobile-nav-link" @click="mobileMenuOpen = false">Nearby Vehicles</router-link>
          <router-link to="/scan" class="mobile-nav-link" @click="mobileMenuOpen = false">Scan to Rent</router-link>
          <router-link to="/payment" class="mobile-nav-link" @click="mobileMenuOpen = false">Recharge Offers</router-link>
          <router-link to="/profile" class="mobile-nav-link" @click="mobileMenuOpen = false">Profile</router-link>

          <!-- Admin exclusive options -->
          <a
            v-if="userStore.isAdmin"
            href="/admin/vehicles"
            class="mobile-nav-link admin-link"
            @click="mobileMenuOpen = false"
          >
            <div class="flex items-center">
              <el-icon class="mr-2"><Setting /></el-icon>
              Admin Panel
            </div>
          </a>

          <!-- Mobile login/register/logout buttons -->
          <div class="pt-2 border-t border-gray-200">
            <template v-if="userStore.isAuthenticated">
              <div class="flex items-center px-1 py-2">
                <el-avatar :size="28" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" />
                <span class="ml-2">{{ userStore.user.username }}</span>
              </div>
              <button @click="handleLogout" class="w-full text-left py-2 text-red-600">
                Logout
              </button>
            </template>
            <template v-else>
              <div class="flex space-x-2">
                <router-link to="/auth/login" class="flex-1" @click="mobileMenuOpen = false">
                  <el-button type="primary" class="w-full">Login</el-button>
                </router-link>
                <router-link to="/auth/register" class="flex-1" @click="mobileMenuOpen = false">
                  <el-button class="w-full">Register</el-button>
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

// Handle logout
const handleLogout = () => {
  ElMessageBox.confirm('Are you sure you want to logout?', 'Prompt', {
    confirmButtonText: 'Confirm',
    cancelButtonText: 'Cancel',
    type: 'warning'
  }).then(async () => {
    await userStore.logout();
    router.push('/');
    mobileMenuOpen.value = false;
  }).catch(() => {
    // User cancelled operation
  });
};

// Navigate to admin panel
const goToAdmin = () => {
  // if (userStore.isAdmin) {
    // Use direct navigation, not dependent on vue-router
    window.location.href = '/admin/vehicles';
  // } else {
  //   ElMessage.warning('You do not have admin privileges');
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
