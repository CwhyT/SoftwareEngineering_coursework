<template>
  <div class="rent-page bg-gray-100 min-h-screen p-4">
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-2xl font-bold">Store List</h1>
    </div>
    <div v-if="stores.length > 0" class="space-y-5 mb-8">
      <div v-for="store in stores" :key="store.storeId" class="bg-white rounded-lg shadow p-5">
        <div class="flex items-center justify-between">
          <div>
            <div class="text-lg font-medium">Store ID: {{ store.storeId }}</div>
            <div class="text-sm text-gray-500 mt-2">Manager: {{ store.manager }}</div>
            <div class="text-sm text-gray-500 mt-2">Phone: {{ store.phone }}</div>
            <div class="text-sm text-gray-500 mt-2">Capacity: {{ store.capacity }}</div>
          </div>
          <el-button type="primary" class="bg-blue-500 text-white border-0 font-bold px-6 py-2 text-base rounded-md" @click="goToStore(store.storeId)">
            Rent at Store
          </el-button>
        </div>
      </div>
    </div>
    <div v-else class="bg-white rounded-lg shadow p-6 text-center">
      <div class="text-gray-400 text-5xl mb-2">🔍</div>
      <div class="text-lg font-medium mb-2">No store information available</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { ElMessage } from 'element-plus';

const stores = ref([]);
const router = useRouter();

function goToStore(storeId) {
  router.push(`/rent/store/${storeId}`);
}

onMounted(async () => {
  try {
    const res = await axios.get('/api/stores');
    stores.value = Array.isArray(res.data) ? res.data : (res.data.data || []);
  } catch (e) {
    console.error('Store API request failed', e);
    ElMessage.error('Failed to get store information');
  }
});
</script> 