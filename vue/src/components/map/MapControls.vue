<template>
  <div>
    <!-- 地图工具栏 -->
    <div class="bg-white/90 backdrop-blur-sm rounded-lg shadow-sm">
      <!-- 指南针 -->
      <div class="p-2 border-b border-gray-100">
        <el-icon size="20" class="text-gray-600"><Compass /></el-icon>
      </div>
      <!-- 定位按钮 -->
      <div class="p-2 border-b border-gray-100 cursor-pointer hover:bg-gray-50">
        <el-icon size="20" class="text-blue-600"><Aim /></el-icon>
      </div>
      <!-- 缩放控件 -->
      <div class="p-2 border-b border-gray-100 cursor-pointer hover:bg-gray-50">
        <el-icon size="20" class="text-gray-600"><ZoomIn /></el-icon>
      </div>
      <div class="p-2 cursor-pointer hover:bg-gray-50">
        <el-icon size="20" class="text-gray-600"><ZoomOut /></el-icon>
      </div>
    </div>
    <!-- 比例尺 -->
    <div class="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg text-xs text-gray-600 flex items-center space-x-2">
      <div class="h-0.5 w-12 bg-gray-400"></div>
      <span>500米</span>
    </div>
  </div>
</template>

<script setup>
import { Compass, Aim, ZoomIn, ZoomOut } from '@element-plus/icons-vue';
</script> 