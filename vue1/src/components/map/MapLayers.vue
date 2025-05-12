<template>
  <div class="bg-white/90 backdrop-blur-sm rounded-lg shadow-sm">
    <div class="p-2 border-b border-gray-100 cursor-pointer hover:bg-gray-50 flex items-center space-x-2">
      <el-icon size="16" class="text-gray-600"><MapIcon /></el-icon>
      <span class="text-sm">Standard</span>
    </div>
    <div class="p-2 cursor-pointer hover:bg-gray-50 flex items-center space-x-2">
      <el-icon size="16" class="text-gray-600"><Picture /></el-icon>
      <span class="text-sm">Satellite</span>
    </div>
  </div>
</template>

<script setup>
import { MapLocation as MapIcon, Picture } from '@element-plus/icons-vue';
</script> 