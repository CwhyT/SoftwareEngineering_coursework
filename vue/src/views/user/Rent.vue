<template>
  <div class="rent-page bg-gray-100 min-h-screen p-4">
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-2xl font-bold">门店列表</h1>
    </div>
    <div v-if="stores.length > 0" class="space-y-5 mb-8">
      <div v-for="store in stores" :key="store.storeId" class="bg-white rounded-lg shadow p-5">
        <div class="flex items-center justify-between">
          <div>
            <div class="text-lg font-medium">门店编号: {{ store.storeId }}</div>
            <div class="text-sm text-gray-500 mt-2">负责人: {{ store.manager }}</div>
            <div class="text-sm text-gray-500 mt-2">电话: {{ store.phone }}</div>
            <div class="text-sm text-gray-500 mt-2">容量: {{ store.capacity }}</div>
          </div>
          <el-button type="primary" class="bg-blue-500 text-white border-0 font-bold px-6 py-2 text-base rounded-md" @click="goToStore(store.storeId)">
            到店租车
          </el-button>
        </div>
      </div>
    </div>
    <div v-else class="bg-white rounded-lg shadow p-6 text-center">
      <div class="text-gray-400 text-5xl mb-2">🔍</div>
      <div class="text-lg font-medium mb-2">暂无门店信息</div>
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
    console.error('门店接口请求失败', e);
    ElMessage.error('获取门店信息失败');
  }
});
</script> 