<template>
  <div class="messages-page py-8">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-white rounded-xl shadow-md overflow-hidden">
        <div class="p-6">
          <div class="flex justify-between items-center mb-6">
            <h1 class="text-2xl font-bold text-gray-800">Messages</h1>
            <div class="flex space-x-2">
              <el-button type="primary" plain size="small" @click="markAllAsRead">
                <el-icon class="mr-1"><Check /></el-icon>
                Mark All as Read
              </el-button>
              <el-button type="danger" plain size="small" @click="clearAllMessages">
                <el-icon class="mr-1"><Delete /></el-icon>
                Clear All
              </el-button>
            </div>
          </div>

          <!-- 消息分类标签页 -->
          <el-tabs v-model="activeTab" class="message-tabs">
            <el-tab-pane name="all" label="All Messages">
              <div class="message-list">
                <template v-if="filteredMessages.length > 0">
                  <div v-for="(message, index) in filteredMessages" :key="message.id" 
                       :class="['message-item', {'border-b border-gray-200': index !== filteredMessages.length - 1}]">
                    <MessageItem 
                      :message="message" 
                      @mark-read="markAsRead(message.id)" 
                      @delete="deleteMessage(message.id)" 
                    />
                  </div>
                </template>
                <div v-else class="empty-state">
                  <el-empty description="No Messages" />
                </div>
              </div>
            </el-tab-pane>
            
            <el-tab-pane name="system" label="System Notifications">
              <div class="message-list">
                <template v-if="getMessagesByType('system').length > 0">
                  <div v-for="(message, index) in getMessagesByType('system')" :key="message.id" 
                       :class="['message-item', {'border-b border-gray-200': index !== getMessagesByType('system').length - 1}]">
                    <MessageItem 
                      :message="message" 
                      @mark-read="markAsRead(message.id)" 
                      @delete="deleteMessage(message.id)" 
                    />
                  </div>
                </template>
                <div v-else class="empty-state">
                  <el-empty description="No System Notifications" />
                </div>
              </div>
            </el-tab-pane>
            
            <el-tab-pane name="activity" label="Activity Messages">
              <div class="message-list">
                <template v-if="getMessagesByType('activity').length > 0">
                  <div v-for="(message, index) in getMessagesByType('activity')" :key="message.id" 
                       :class="['message-item', {'border-b border-gray-200': index !== getMessagesByType('activity').length - 1}]">
                    <MessageItem 
                      :message="message" 
                      @mark-read="markAsRead(message.id)" 
                      @delete="deleteMessage(message.id)" 
                    />
                  </div>
                </template>
                <div v-else class="empty-state">
                  <el-empty description="No Activity Messages" />
                </div>
              </div>
            </el-tab-pane>
            
            <el-tab-pane name="trip" label="Trip Reminders">
              <div class="message-list">
                <template v-if="getMessagesByType('trip').length > 0">
                  <div v-for="(message, index) in getMessagesByType('trip')" :key="message.id" 
                       :class="['message-item', {'border-b border-gray-200': index !== getMessagesByType('trip').length - 1}]">
                    <MessageItem 
                      :message="message" 
                      @mark-read="markAsRead(message.id)" 
                      @delete="deleteMessage(message.id)" 
                    />
                  </div>
                </template>
                <div v-else class="empty-state">
                  <el-empty description="No Trip Reminders" />
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import { Check, Delete, Bell, ChatLineRound, Timer, Promotion } from '@element-plus/icons-vue';
import MessageItem from '@/components/messages/MessageItem.vue';

// 当前选中的标签页
const activeTab = ref('all');

// 消息列表数据
const messages = ref([
  {
    id: 1,
    type: 'system',
    title: 'Account Security Alert',
    content: 'Your account was successfully logged in at 2024-04-12 14:30. If this was not you, please change your password immediately.',
    time: '2024-04-12 14:30',
    isRead: false,
    icon: 'warning'
  },
  {
    id: 2,
    type: 'activity',
    title: 'Exclusive Offer!',
    content: 'Dear user, a $5 riding coupon has been added to your account, valid for 7 days. Please use it in time.',
    time: '2024-04-11 10:15',
    isRead: true,
    icon: 'gift'
  },
  {
    id: 3,
    type: 'trip',
    title: 'Trip End Reminder',
    content: 'Your trip has ended. $3.5 has been deducted from your account balance. Trip duration: 25 minutes, distance: 3.2 km.',
    time: '2024-04-10 18:45',
    isRead: false,
    icon: 'bike'
  },
  {
    id: 4,
    type: 'system',
    title: 'System Maintenance Notice',
    content: 'The system will undergo routine maintenance from 2024-04-15 03:00-05:00. Some features may be unavailable during this period. Please plan accordingly.',
    time: '2024-04-10 09:30',
    isRead: false,
    icon: 'tools'
  },
  {
    id: 5,
    type: 'activity',
    title: 'Weekend Riding Promotion',
    content: 'Ride for 30 minutes this weekend (April 13-14) to earn 10 points. More rides, more points, no upper limit!',
    time: '2024-04-09 16:20',
    isRead: true,
    icon: 'promotion'
  }
]);

// 根据当前标签页过滤消息
const filteredMessages = computed(() => {
  if (activeTab.value === 'all') {
    return messages.value;
  } else {
    return messages.value.filter(message => message.type === activeTab.value);
  }
});

// 根据消息类型获取消息
const getMessagesByType = (type) => {
  return messages.value.filter(message => message.type === type);
};

// 标记消息为已读
const markAsRead = (messageId) => {
  const message = messages.value.find(msg => msg.id === messageId);
  if (message && !message.isRead) {
    message.isRead = true;
    ElMessage.success('Message marked as read');
  }
};

// 全部标记为已读
const markAllAsRead = () => {
  if (messages.value.some(msg => !msg.isRead)) {
    messages.value.forEach(msg => {
      msg.isRead = true;
    });
    ElMessage.success('All messages marked as read');
  } else {
    ElMessage.info('No unread messages');
  }
};

// 删除单条消息
const deleteMessage = (messageId) => {
  ElMessageBox.confirm('Are you sure you want to delete this message?', 'Prompt', {
    confirmButtonText: 'Confirm',
    cancelButtonText: 'Cancel',
    type: 'warning'
  }).then(() => {
    messages.value = messages.value.filter(msg => msg.id !== messageId);
    ElMessage.success('Message deleted');
  }).catch(() => {});
};

// 清空所有消息
const clearAllMessages = () => {
  if (messages.value.length === 0) {
    ElMessage.info('No messages to clear');
    return;
  }
  
  ElMessageBox.confirm('Are you sure you want to clear all messages? This action cannot be undone!', 'Warning', {
    confirmButtonText: 'Confirm',
    cancelButtonText: 'Cancel',
    type: 'warning'
  }).then(() => {
    messages.value = [];
    ElMessage.success('All messages cleared');
  }).catch(() => {});
};
</script>

<style scoped>
.message-tabs :deep(.el-tabs__nav) {
  border-radius: 8px;
  overflow: hidden;
}

.message-tabs :deep(.el-tabs__item) {
  padding: 0 20px;
}

.message-item {
  padding: 16px 0;
}

.empty-state {
  padding: 40px 0;
  display: flex;
  justify-content: center;
}
</style> 