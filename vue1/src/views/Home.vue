<template>
  <div class="home-page">
    <header class="bg-blue-600 text-white py-4">
      <div class="container mx-auto px-4">
        <h1 class="text-2xl font-bold">Shared Electric Scooter</h1>
      </div>
    </header>

    <main class="container mx-auto px-4 py-8">
      <div class="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
        <div class="p-6">
          <h2 class="text-xl font-semibold mb-4">Welcome to Shared Electric Scooter</h2>
          <p class="text-gray-600 mb-4">Convenient, eco-friendly, and economical short-distance travel option</p>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <router-link to="/rent" class="bg-blue-500 hover:bg-blue-600 text-white rounded-lg p-4 flex items-center transition-colors">
              <div class="icon-wrapper mr-4 text-2xl">🛴</div>
              <div>
                <h3 class="font-medium">Nearby Vehicles</h3>
                <p class="text-sm text-blue-100">View available vehicles nearby</p>
              </div>
            </router-link>
            
            <router-link to="/scan" class="bg-green-500 hover:bg-green-600 text-white rounded-lg p-4 flex items-center transition-colors">
              <div class="icon-wrapper mr-4 text-2xl">📱</div>
              <div>
                <h3 class="font-medium">Scan to Ride</h3>
                <p class="text-sm text-green-100">Scan QR code to rent quickly</p>
              </div>
            </router-link>
          </div>
        </div>
      </div>
      
      <div class="bg-white rounded-xl shadow-lg overflow-hidden">
        <div class="p-6">
          <h2 class="text-xl font-semibold mb-4">User Guide</h2>
          
          <div class="space-y-4">
            <div class="flex items-start">
              <div class="step-number bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center font-medium mr-3">1</div>
              <div>
                <h3 class="font-medium">Find a Vehicle</h3>
                <p class="text-gray-600 text-sm">Locate nearby electric scooters through map or scanning</p>
              </div>
            </div>
            
            <div class="flex items-start">
              <div class="step-number bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center font-medium mr-3">2</div>
              <div>
                <h3 class="font-medium">Unlock Vehicle</h3>
                <p class="text-gray-600 text-sm">Scan QR code or enter vehicle number to unlock</p>
              </div>
            </div>
            
            <div class="flex items-start">
              <div class="step-number bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center font-medium mr-3">3</div>
              <div>
                <h3 class="font-medium">End Ride</h3>
                <p class="text-gray-600 text-sm">Park in designated area and click to end trip</p>
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
  console.log('Home page loaded');
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