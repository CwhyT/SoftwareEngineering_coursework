<template>
  <div class="profile-page flex flex-col items-center py-8">
    <div class="w-full max-w-3xl">
      <!-- 快捷功能 -->
      <div class="bg-white rounded-xl shadow-md overflow-hidden mb-6">
        <div class="p-4 border-b border-gray-100">
          <h3 class="font-medium text-gray-800 flex items-center">
            <el-icon class="mr-2"><List /></el-icon>
            快捷功能
          </h3>
        </div>
        <div class="p-5">
          <div class="grid grid-cols-2 gap-4">
            <router-link to="/payment" class="bg-blue-50 hover:bg-blue-100 p-4 rounded-lg transition-colors duration-200 flex items-center">
              <el-icon class="mr-3 text-blue-600" size="20"><Wallet /></el-icon>
              <div>
                <div class="font-medium text-gray-800">我的钱包</div>
                <div class="text-xs text-gray-500 mt-1">余额: ¥ {{ userInfo.money || '0.00' }}</div>
              </div>
            </router-link>
            <router-link to="/coupons" class="bg-blue-50 hover:bg-blue-100 p-4 rounded-lg transition-colors duration-200 flex items-center">
              <el-icon class="mr-3 text-blue-600" size="20"><Discount /></el-icon>
              <div>
                <div class="font-medium text-gray-800">我的优惠券</div>
                <div class="text-xs text-gray-500 mt-1">可用: {{ columns.filter(i =>  i.status === 0).length || 0 }} 张</div>
              </div>
            </router-link>
          </div>
        </div>
      </div>
      <!-- 账户概览 -->
      <div class="bg-white rounded-xl shadow-md overflow-hidden mb-6">
        <div class="p-4 border-b border-gray-100 flex items-center">
          <el-icon class="mr-2"><DataLine /></el-icon>
          <h3 class="font-medium text-gray-800">账户概览</h3>
        </div>
        <div class="p-5">
          <div class="grid grid-cols-2 gap-5">
            <div class="bg-gray-50 p-4 rounded-lg">
              <div class="text-sm text-gray-500 mb-1">用户名</div>
              <div class="font-medium text-gray-800">{{ userStore.user?.username || '未设置' }}</div>
            </div>
            <div class="bg-gray-50 p-4 rounded-lg">
              <div class="text-sm text-gray-500 mb-1">出生日期</div>
              <div class="font-medium text-gray-800">{{ userStore.user?.birthDate ? formatDate(userStore.user.birthDate) : '未设置' }}</div>
            </div>
            <div class="bg-gray-50 p-4 rounded-lg">
              <div class="text-sm text-gray-500 mb-1">邮箱</div>
              <div class="font-medium text-gray-800">{{ userStore.user?.email || '未设置' }}</div>
            </div>
            <div class="bg-gray-50 p-4 rounded-lg">
              <div class="text-sm text-gray-500 mb-1">手机号</div>
              <div class="font-medium text-gray-800">{{ userStore.user?.phoneNumber || '未设置' }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-8 flex justify-center">
        <router-link to="/orders">
          <el-button type="primary" size="large" icon="Document" round>
            查看历史订单
          </el-button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue';
import { useUserStore } from '@/stores/user';
import { userApi } from '@/api/user';
import { List, DataLine, Wallet, Discount } from '@element-plus/icons-vue';
import {adminListApi} from "@/api/index.js";

const userStore = useUserStore();
const orders = reactive([]);
const userMoney = (() => {
  return JSON.parse(localStorage.getItem('user')).money

})
const formatDate = (dateString) => {
  if (!dateString) return '未知';
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  } catch (e) {
    return dateString;
  }
};

const loadOrders = async () => {
  try {
    const response = await userApi.getOrders();
    if (response?.data?.success && Array.isArray(response.data.data)) {
      orders.value = response.data.data;
      console.log('历史订单数据:', orders.value);
    } else {
      orders.value = [];
    }
  } catch (e) {
    orders.value = [];
  }
};
const columns = ref([])
const userInfo = ref({})
onMounted(() => {
  loadOrders();
  adminListApi.couponList().then(res => {
    columns.value = res.data
  })

  userApi.getProfile().then(res => {
    userInfo.value = res
  })
});
</script>

<style scoped>
.avatar-container {
  transition: transform 0.3s;
}

.avatar-container:hover {
  transform: scale(1.05);
}

.level-badge {
  display: inline-block;
}
</style>
