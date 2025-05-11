<template>
  <div class="nav-test p-6">
    <h1 class="text-2xl font-bold mb-6">导航测试页面</h1>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
      <el-card shadow="hover" class="nav-card">
        <template #header>
          <div class="flex justify-between items-center">
            <h3 class="text-lg font-medium">用户页面</h3>
          </div>
        </template>
        <div class="flex flex-col gap-3">
          <el-button type="primary" @click="navigateTo('/')">首页</el-button>
          <el-button type="success" @click="navigateTo('/rent')" class="mt-2">附近车辆</el-button>
          <el-button type="warning" @click="navigateTo('/scan')" class="mt-2">扫码租车</el-button>
          <el-button @click="navigateTo('/payment')" class="mt-2">充值优惠</el-button>
          <el-button @click="navigateTo('/profile')" class="mt-2">个人中心</el-button>
        </div>
      </el-card>
      
      <el-card shadow="hover" class="nav-card">
        <template #header>
          <div class="flex justify-between items-center">
            <h3 class="text-lg font-medium">管理员页面</h3>
          </div>
        </template>
        <div class="flex flex-col gap-3">
          <el-button type="primary" @click="navigateTo('/admin')" class="mt-2">管理员控制面板</el-button>
          <el-button @click="navigateTo('/admin/users')" class="mt-2">用户管理</el-button>
          <el-button @click="navigateTo('/admin/scooters')" class="mt-2">车辆管理</el-button>
        </div>
      </el-card>
    </div>
    
    <el-card shadow="hover">
      <template #header>
        <div class="flex justify-between items-center">
          <h3 class="text-lg font-medium">认证页面</h3>
        </div>
      </template>
      <div class="flex gap-3">
        <el-button type="info" @click="navigateTo('/auth/login')" class="mt-2">登录</el-button>
        <el-button type="info" @click="navigateTo('/auth/register')" class="mt-2">注册</el-button>
      </div>
    </el-card>
    
    <div class="mt-8 p-4 bg-gray-100 rounded">
      <h3 class="font-medium mb-2">当前路由信息:</h3>
      <pre class="text-sm">{{ currentRoute }}</pre>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// 监控当前路由
const currentRoute = computed(() => {
  return {
    fullPath: router.currentRoute.value.fullPath,
    name: router.currentRoute.value.name,
    params: router.currentRoute.value.params,
    query: router.currentRoute.value.query,
  };
});

// 导航到指定路由
const navigateTo = (path) => {
  try {
    console.log('尝试导航到:', path);
    router.push(path);
  } catch (error) {
    console.error('导航错误:', error);
    alert(`导航错误: ${error.message}`);
  }
};

// 在组件挂载时记录当前路由
onMounted(() => {
  console.log('NavTest组件已挂载', router.currentRoute.value);
});
</script>

<style scoped>
.nav-card {
  height: 100%;
}
</style> 