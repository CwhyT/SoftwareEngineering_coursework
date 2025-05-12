<template>
  <div class="nav-test p-6">
    <h1 class="text-2xl font-bold mb-6">Navigation Test Page</h1>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
      <el-card shadow="hover" class="nav-card">
        <template #header>
          <div class="flex justify-between items-center">
            <h3 class="text-lg font-medium">User Pages</h3>
          </div>
        </template>
        <div class="flex flex-col gap-3">
          <el-button type="primary" @click="navigateTo('/')">Home</el-button>
          <el-button type="success" @click="navigateTo('/rent')" class="mt-2">Nearby Vehicles</el-button>
          <el-button type="warning" @click="navigateTo('/scan')" class="mt-2">Scan to Rent</el-button>
          <el-button @click="navigateTo('/payment')" class="mt-2">Recharge & Offers</el-button>
          <el-button @click="navigateTo('/profile')" class="mt-2">Profile</el-button>
        </div>
      </el-card>
      
      <el-card shadow="hover" class="nav-card">
        <template #header>
          <div class="flex justify-between items-center">
            <h3 class="text-lg font-medium">Admin Pages</h3>
          </div>
        </template>
        <div class="flex flex-col gap-3">
          <el-button type="primary" @click="navigateTo('/admin')" class="mt-2">Admin Dashboard</el-button>
          <el-button @click="navigateTo('/admin/users')" class="mt-2">User Management</el-button>
          <el-button @click="navigateTo('/admin/scooters')" class="mt-2">Vehicle Management</el-button>
        </div>
      </el-card>
    </div>
    
    <el-card shadow="hover">
      <template #header>
        <div class="flex justify-between items-center">
          <h3 class="text-lg font-medium">Authentication Pages</h3>
        </div>
      </template>
      <div class="flex gap-3">
        <el-button type="info" @click="navigateTo('/auth/login')" class="mt-2">Login</el-button>
        <el-button type="info" @click="navigateTo('/auth/register')" class="mt-2">Register</el-button>
      </div>
    </el-card>
    
    <div class="mt-8 p-4 bg-gray-100 rounded">
      <h3 class="font-medium mb-2">Current Route Information:</h3>
      <pre class="text-sm">{{ currentRoute }}</pre>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// Monitor current route
const currentRoute = computed(() => {
  return {
    fullPath: router.currentRoute.value.fullPath,
    name: router.currentRoute.value.name,
    params: router.currentRoute.value.params,
    query: router.currentRoute.value.query,
  };
});

// Navigate to specified route
const navigateTo = (path) => {
  try {
    console.log('Attempting to navigate to:', path);
    router.push(path);
  } catch (error) {
    console.error('Navigation error:', error);
    alert(`Navigation error: ${error.message}`);
  }
};

// Log current route when component is mounted
onMounted(() => {
  console.log('NavTest component mounted', router.currentRoute.value);
});
</script>

<style scoped>
.nav-card {
  height: 100%;
}
</style> 