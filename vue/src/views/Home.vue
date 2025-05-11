<template>
  <div class="home-page">
    <header class="bg-blue-600 text-white py-4">
      <div class="container mx-auto px-4">
        <h1 class="text-2xl font-bold">共享电动滑板车</h1>
      </div>
    </header>

    <main class="container mx-auto px-4 py-8">
      <div class="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
        <div class="p-6">
          <h2 class="text-xl font-semibold mb-4">欢迎使用共享电动滑板车</h2>
          <p class="text-gray-600 mb-4">便捷、环保、经济的短途出行选择</p>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <router-link to="/rent" class="bg-blue-500 hover:bg-blue-600 text-white rounded-lg p-4 flex items-center transition-colors">
              <div class="icon-wrapper mr-4 text-2xl">🛴</div>
              <div>
                <h3 class="font-medium">附近车辆</h3>
                <p class="text-sm text-blue-100">查看周边可用车辆</p>
              </div>
            </router-link>
            
            <router-link to="/scan" class="bg-green-500 hover:bg-green-600 text-white rounded-lg p-4 flex items-center transition-colors">
              <div class="icon-wrapper mr-4 text-2xl">📱</div>
              <div>
                <h3 class="font-medium">扫码用车</h3>
                <p class="text-sm text-green-100">扫描二维码快速租车</p>
              </div>
            </router-link>
          </div>
        </div>
      </div>
      
      <div class="bg-white rounded-xl shadow-lg overflow-hidden">
        <div class="p-6">
          <h2 class="text-xl font-semibold mb-4">使用指南</h2>
          
          <div class="space-y-4">
            <div class="flex items-start">
              <div class="step-number bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center font-medium mr-3">1</div>
              <div>
                <h3 class="font-medium">找到车辆</h3>
                <p class="text-gray-600 text-sm">通过地图或扫码找到附近的电动滑板车</p>
              </div>
            </div>
            
            <div class="flex items-start">
              <div class="step-number bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center font-medium mr-3">2</div>
              <div>
                <h3 class="font-medium">解锁车辆</h3>
                <p class="text-gray-600 text-sm">扫描车辆上的二维码或输入车辆编号解锁</p>
              </div>
            </div>
            
            <div class="flex items-start">
              <div class="step-number bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center font-medium mr-3">3</div>
              <div>
                <h3 class="font-medium">骑行结束</h3>
                <p class="text-gray-600 text-sm">将车辆停放在指定区域，点击结束行程</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';

onMounted(() => {
  console.log('首页已加载');
});
</script>

<style scoped>
.home-page {
  min-height: 100vh;
  background-color: #f3f4f6;
}

.icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style> 