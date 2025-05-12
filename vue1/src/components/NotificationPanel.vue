<template>
  <div class="notification-panel">
    <el-popover
      placement="bottom-end"
      :width="350"
      trigger="click"
      popper-class="notification-popover"
    >
      <template #reference>
        <el-badge :value="unreadCount" :hidden="unreadCount === 0">
          <el-icon size="20" class="text-gray-500 cursor-pointer"><Bell /></el-icon>
        </el-badge>
      </template>
      
      <template #default>
        <div class="notification-header">
          <h3 class="text-lg font-medium">Notifications</h3>
          <el-button 
            v-if="notifications.length > 0" 
            type="primary" 
            link 
            @click="markAllAsRead"
          >
            Mark All as Read
          </el-button>
        </div>
        
        <div class="notification-list">
          <template v-if="notifications.length > 0">
            <div 
              v-for="notification in notifications" 
              :key="notification.id"
              class="notification-item"
              :class="{ 'unread': !notification.read }"
              @click="handleNotificationClick(notification)"
            >
              <div class="notification-icon" :class="notification.type">
                <el-icon><component :is="getNotificationIcon(notification.type)" /></el-icon>
              </div>
              <div class="notification-content">
                <div class="notification-title">{{ notification.title }}</div>
                <div class="notification-message">{{ notification.message }}</div>
                <div class="notification-time">{{ formatTime(notification.timestamp) }}</div>
              </div>
            </div>
          </template>
          <el-empty v-else description="No notifications" />
        </div>
        
        <div v-if="notifications.length > 0" class="notification-footer">
          <el-button type="primary" link @click="viewAllNotifications">
            View All
          </el-button>
        </div>
      </template>
    </el-popover>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Bell, Warning, Check, InfoFilled, CircleCloseFilled } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

// Notification data
const notifications = ref([
  {
    id: 1,
    type: 'warning',
    title: 'System Maintenance Notice',
    message: 'System will be under maintenance from 22:00-23:00 tonight',
    timestamp: new Date('2024-03-25T20:00:00'),
    read: false
  },
  {
    id: 2,
    type: 'success',
    title: 'Order Completed',
    message: 'Your order #12345 has been completed, thank you for using our service',
    timestamp: new Date('2024-03-25T15:30:00'),
    read: false
  },
  {
    id: 3,
    type: 'info',
    title: 'New Feature Available',
    message: 'We have added QR code scanning for scooter rental, welcome to try it out',
    timestamp: new Date('2024-03-24T10:00:00'),
    read: true
  }
])

// Calculate unread notification count
const unreadCount = computed(() => {
  return notifications.value.filter(n => !n.read).length
})

// Get notification icon
const getNotificationIcon = (type) => {
  const icons = {
    warning: Warning,
    success: Check,
    info: InfoFilled,
    error: CircleCloseFilled
  }
  return icons[type] || InfoFilled
}

// Format time
const formatTime = (timestamp) => {
  const now = new Date()
  const date = new Date(timestamp)
  const diff = now - date
  
  // Less than 1 minute
  if (diff < 60000) {
    return 'Just now'
  }
  // Less than 1 hour
  if (diff < 3600000) {
    return `${Math.floor(diff / 60000)} minutes ago`
  }
  // Less than 24 hours
  if (diff < 86400000) {
    return `${Math.floor(diff / 3600000)} hours ago`
  }
  // Less than 30 days
  if (diff < 2592000000) {
    return `${Math.floor(diff / 86400000)} days ago`
  }
  // More than 30 days
  return date.toLocaleDateString()
}

// Handle notification click
const handleNotificationClick = (notification) => {
  if (!notification.read) {
    notification.read = true
  }
  
  // Handle different navigation logic based on notification type
  switch (notification.type) {
    case 'warning':
      ElMessage.info('System maintenance notice')
      break
    case 'success':
      ElMessage.success('Order completed')
      break
    case 'info':
      ElMessage.info('New feature is now available')
      break
    default:
      break
  }
}

// Mark all notifications as read
const markAllAsRead = () => {
  notifications.value.forEach(notification => {
    notification.read = true
  })
  ElMessage.success('All marked as read')
}

// View all notifications
const viewAllNotifications = () => {
  ElMessage.info('View all notifications feature is under development')
}
</script>

<style scoped>
.notification-panel {
  display: inline-block;
}

.notification-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid #ebeef5;
}

.notification-list {
  max-height: 400px;
  overflow-y: auto;
}

.notification-item {
  display: flex;
  padding: 12px 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.notification-item:hover {
  background-color: #f5f7fa;
}

.notification-item.unread {
  background-color: #f0f9ff;
}

.notification-icon {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
}

.notification-icon.warning {
  background-color: #fdf6ec;
  color: #e6a23c;
}

.notification-icon.success {
  background-color: #f0f9eb;
  color: #67c23a;
}

.notification-icon.info {
  background-color: #f4f4f5;
  color: #909399;
}

.notification-icon.error {
  background-color: #fef0f0;
  color: #f56c6c;
}

.notification-content {
  flex: 1;
}

.notification-title {
  font-weight: 500;
  margin-bottom: 4px;
}

.notification-message {
  color: #606266;
  font-size: 13px;
  margin-bottom: 4px;
}

.notification-time {
  color: #909399;
  font-size: 12px;
}

.notification-footer {
  padding: 8px 16px;
  border-top: 1px solid #ebeef5;
  text-align: center;
}
</style> 