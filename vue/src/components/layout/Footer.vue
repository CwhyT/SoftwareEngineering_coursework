<template>
  <footer class="app-footer py-8 bg-gray-100 mt-10">
    <div class="container mx-auto px-6">
      <div class="flex flex-col md:flex-row justify-between">
        <div class="mb-6 md:mb-0">
          <div class="flex items-center mb-4">
            <div class="logo-icon text-blue-600 mr-3">
              <el-icon size="24"><Platform /></el-icon>
            </div>
            <h2 class="text-lg font-bold text-gray-800">电动滑板车租赁系统</h2>
          </div>
          <p class="text-gray-600 text-sm max-w-md">
            绿色出行新选择，便捷、环保、经济的城市短途代步工具。
          </p>
        </div>
        
        <div class="grid grid-cols-2 md:grid-cols-3 gap-8">
          <div>
            <h3 class="font-medium text-gray-800 mb-4">关于我们</h3>
            <ul class="space-y-2">
              <li><a href="#" class="footer-link">公司简介</a></li>
              <li><a href="#" class="footer-link">联系我们</a></li>
              <li><a href="#" class="footer-link">加入我们</a></li>
            </ul>
          </div>
          
          <div>
            <h3 class="font-medium text-gray-800 mb-4">用户中心</h3>
            <ul class="space-y-2">
              <li><router-link to="/profile" class="footer-link">个人资料</router-link></li>
              <li><router-link to="/payment" class="footer-link">充值记录</router-link></li>
              <li><router-link to="/help" class="footer-link">帮助中心</router-link></li>
            </ul>
          </div>
          
          <div>
            <h3 class="font-medium text-gray-800 mb-4">联系方式</h3>
            <ul class="space-y-2">
              <li class="flex items-center"><el-icon class="mr-2"><Phone /></el-icon> <span>400-123-4567</span></li>
              <li class="flex items-center"><el-icon class="mr-2"><Message /></el-icon> <span>support@escooter.com</span></li>
            </ul>
          </div>
        </div>
      </div>
      
      <div class="border-t border-gray-200 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
        <p class="text-sm text-gray-500 mb-4 md:mb-0">
          &copy; 2023 电动滑板车租赁系统 版权所有
        </p>
        <div class="flex space-x-4">
          <a href="#" class="text-gray-400 hover:text-gray-600">
            <el-icon size="20"><ChromeFilled /></el-icon>
          </a>
          <a href="#" class="text-gray-400 hover:text-gray-600">
            <el-icon size="20"><Apple /></el-icon>
          </a>
          <a href="#" class="text-gray-400 hover:text-gray-600">
            <el-icon size="20"><Share /></el-icon>
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { Platform, Phone, Message, ChromeFilled, Apple, Share } from '@element-plus/icons-vue';
</script>

<style scoped>
.footer-link {
  color: #6b7280;
  font-size: 0.9rem;
  transition: color 0.3s;
}

.footer-link:hover {
  color: #3b82f6;
}
</style>
