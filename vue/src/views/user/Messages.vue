<template>
  <div class="messages-page py-8">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-white rounded-xl shadow-md overflow-hidden">
        <div class="p-6">
          <div class="flex justify-between items-center mb-6">
            <h1 class="text-2xl font-bold text-gray-800">消息通知</h1>
            <div class="flex space-x-2">
              <el-button type="primary" plain size="small" @click="markAllAsRead">
                <el-icon class="mr-1"><Check /></el-icon>
                全部已读
              </el-button>
              <el-button type="danger" plain size="small" @click="clearAllMessages">
                <el-icon class="mr-1"><Delete /></el-icon>
                清空消息
              </el-button>
            </div>
          </div>

          <!-- 消息分类标签页 -->
          <el-tabs v-model="activeTab" class="message-tabs">
            <el-tab-pane name="all" label="全部消息">
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
                  <el-empty description="暂无消息" />
                </div>
              </div>
            </el-tab-pane>
            
            <el-tab-pane name="system" label="系统通知">
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
                  <el-empty description="暂无系统通知" />
                </div>
              </div>
            </el-tab-pane>
            
            <el-tab-pane name="activity" label="活动消息">
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
                  <el-empty description="暂无活动消息" />
                </div>
              </div>
            </el-tab-pane>
            
            <el-tab-pane name="trip" label="行程提醒">
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
                  <el-empty description="暂无行程提醒" />
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
    title: '账户安全提醒',
    content: '您的账户刚刚成功登录，登录时间: 2024-04-12 14:30，如非本人操作，请立即修改密码。',
    time: '2024-04-12 14:30',
    isRead: false,
    icon: 'warning'
  },
  {
    id: 2,
    type: 'activity',
    title: '专属优惠来啦！',
    content: '尊敬的用户，您有一张5元骑行券已发放到账户，有效期7天，请及时使用。',
    time: '2024-04-11 10:15',
    isRead: true,
    icon: 'gift'
  },
  {
    id: 3,
    type: 'trip',
    title: '骑行结束提醒',
    content: '您的行程已结束，费用3.5元已从账户余额扣除，骑行时长25分钟，距离3.2公里。',
    time: '2024-04-10 18:45',
    isRead: false,
    icon: 'bike'
  },
  {
    id: 4,
    type: 'system',
    title: '系统维护通知',
    content: '系统将于2024-04-15 03:00-05:00进行例行维护，维护期间可能无法使用部分功能，请提前做好安排。',
    time: '2024-04-10 09:30',
    isRead: false,
    icon: 'tools'
  },
  {
    id: 5,
    type: 'activity',
    title: '周末骑行优惠活动',
    content: '本周末（4月13-14日）骑行满30分钟，即可获得10积分奖励，多骑多得，上不封顶！',
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
    ElMessage.success('消息已标记为已读');
  }
};

// 全部标记为已读
const markAllAsRead = () => {
  if (messages.value.some(msg => !msg.isRead)) {
    messages.value.forEach(msg => {
      msg.isRead = true;
    });
    ElMessage.success('全部消息已标记为已读');
  } else {
    ElMessage.info('没有未读消息');
  }
};

// 删除单条消息
const deleteMessage = (messageId) => {
  ElMessageBox.confirm('确定要删除这条消息吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    messages.value = messages.value.filter(msg => msg.id !== messageId);
    ElMessage.success('消息已删除');
  }).catch(() => {});
};

// 清空所有消息
const clearAllMessages = () => {
  if (messages.value.length === 0) {
    ElMessage.info('没有消息可清空');
    return;
  }
  
  ElMessageBox.confirm('确定要清空所有消息吗？此操作不可恢复！', '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    messages.value = [];
    ElMessage.success('所有消息已清空');
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