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
          <h3 class="text-lg font-medium">通知</h3>
          <el-button 
            v-if="notifications.length > 0" 
            type="primary" 
            link 
            @click="markAllAsRead"
          >
            全部标记为已读
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
          <el-empty v-else description="暂无通知" />
        </div>
        
        <div v-if="notifications.length > 0" class="notification-footer">
          <el-button type="primary" link @click="viewAllNotifications">
            查看全部
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

// 通知数据
const notifications = ref([
  {
    id: 1,
    type: 'warning',
    title: '系统维护通知',
    message: '系统将于今晚22:00-23:00进行例行维护',
    timestamp: new Date('2024-03-25T20:00:00'),
    read: false
  },
  {
    id: 2,
    type: 'success',
    title: '订单完成',
    message: '您的订单 #12345 已完成，感谢使用',
    timestamp: new Date('2024-03-25T15:30:00'),
    read: false
  },
  {
    id: 3,
    type: 'info',
    title: '新功能上线',
    message: '我们新增了扫码租车功能，欢迎体验',
    timestamp: new Date('2024-03-24T10:00:00'),
    read: true
  }
])

// 计算未读通知数量
const unreadCount = computed(() => {
  return notifications.value.filter(n => !n.read).length
})

// 获取通知图标
const getNotificationIcon = (type) => {
  const icons = {
    warning: Warning,
    success: Check,
    info: InfoFilled,
    error: CircleCloseFilled
  }
  return icons[type] || InfoFilled
}

// 格式化时间
const formatTime = (timestamp) => {
  const now = new Date()
  const date = new Date(timestamp)
  const diff = now - date
  
  // 小于1分钟
  if (diff < 60000) {
    return '刚刚'
  }
  // 小于1小时
  if (diff < 3600000) {
    return `${Math.floor(diff / 60000)}分钟前`
  }
  // 小于24小时
  if (diff < 86400000) {
    return `${Math.floor(diff / 3600000)}小时前`
  }
  // 小于30天
  if (diff < 2592000000) {
    return `${Math.floor(diff / 86400000)}天前`
  }
  // 大于30天
  return date.toLocaleDateString()
}

// 处理通知点击
const handleNotificationClick = (notification) => {
  if (!notification.read) {
    notification.read = true
  }
  
  // 根据通知类型处理不同的跳转逻辑
  switch (notification.type) {
    case 'warning':
      ElMessage.info('系统维护通知')
      break
    case 'success':
      ElMessage.success('订单已完成')
      break
    case 'info':
      ElMessage.info('新功能已上线')
      break
    default:
      break
  }
}

// 标记所有通知为已读
const markAllAsRead = () => {
  notifications.value.forEach(notification => {
    notification.read = true
  })
  ElMessage.success('已全部标记为已读')
}

// 查看所有通知
const viewAllNotifications = () => {
  ElMessage.info('查看全部通知功能开发中')
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