<template>
  <footer class="app-footer py-8 bg-gray-100 mt-10">
    <div class="container mx-auto px-6">
      <div class="flex flex-col md:flex-row justify-between">
        <div class="mb-6 md:mb-0">
          <div class="flex items-center mb-4">
            <div class="logo-icon text-blue-600 mr-3">
              <el-icon size="24"><Platform /></el-icon>
            </div>
            <h2 class="text-lg font-bold text-gray-800">Electric Scooter Rental System</h2>
          </div>
          <p class="text-gray-600 text-sm max-w-md">
            A new choice for green travel, a convenient, eco-friendly, and economical urban short-distance transportation tool.
          </p>
        </div>
        
        <div class="grid grid-cols-2 md:grid-cols-3 gap-8">
          <div>
            <h3 class="font-medium text-gray-800 mb-4">About Us</h3>
            <ul class="space-y-2">
              <li><a href="#" class="footer-link">Company Profile</a></li>
              <li><a href="#" class="footer-link">Contact Us</a></li>
              <li><a href="#" class="footer-link">Join Us</a></li>
            </ul>
          </div>
          
          <div>
            <h3 class="font-medium text-gray-800 mb-4">User Center</h3>
            <ul class="space-y-2">
              <li><router-link to="/profile" class="footer-link">Profile</router-link></li>
              <li><router-link to="/payment" class="footer-link">Recharge History</router-link></li>
              <li><router-link to="/help" class="footer-link">Help Center</router-link></li>
            </ul>
          </div>
          
          <div>
            <h3 class="font-medium text-gray-800 mb-4">Contact</h3>
            <ul class="space-y-2">
              <li class="flex items-center"><el-icon class="mr-2"><Phone /></el-icon> <span>400-123-4567</span></li>
              <li class="flex items-center"><el-icon class="mr-2"><Message /></el-icon> <span>support@escooter.com</span></li>
            </ul>
          </div>
        </div>
      </div>
      
      <div class="border-t border-gray-200 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
        <p class="text-sm text-gray-500 mb-4 md:mb-0">
          &copy; 2023 Electric Scooter Rental System. All rights reserved.
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
