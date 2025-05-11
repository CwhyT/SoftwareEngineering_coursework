<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
    <router-link to="/rent" class="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all group">
      <div class="flex items-center space-x-4">
        <div class="bg-blue-100 p-4 rounded-xl group-hover:bg-blue-200/80">
          <el-icon size="32" class="text-blue-600"><MapLocation /></el-icon>
        </div>
        <div>
          <h3 class="text-lg font-medium text-gray-800">附近滑板车</h3>
          <p class="text-sm text-gray-500 mt-1">查看周边可用车辆</p>
        </div>
      </div>
    </router-link>
    
    <router-link to="/payment" class="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all group">
      <div class="flex items-center space-x-4">
        <div class="bg-green-100 p-4 rounded-xl group-hover:bg-green-200/80">
          <el-icon size="32" class="text-green-600"><Wallet /></el-icon>
        </div>
        <div>
          <h3 class="text-lg font-medium text-gray-800">充值优惠</h3>
          <p class="text-sm text-gray-500 mt-1">限时充值特惠活动</p>
        </div>
      </div>
    </router-link>
    
    <router-link to="/profile" class="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all group">
      <div class="flex items-center space-x-4">
        <div class="bg-orange-100 p-4 rounded-xl group-hover:bg-orange-200/80">
          <el-icon size="32" class="text-orange-600"><User /></el-icon>
        </div>
        <div>
          <h3 class="text-lg font-medium text-gray-800">个人中心</h3>
          <p class="text-sm text-gray-500 mt-1">管理账户与订单</p>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script setup>
import { MapLocation, Wallet, User } from '@element-plus/icons-vue';
</script> 