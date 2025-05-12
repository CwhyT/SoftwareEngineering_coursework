<template>
  <div class="message-item-container" :class="{ 'unread': !message.isRead }">
    <div class="flex items-start">
      <!-- Message icon -->
      <div class="message-icon mr-4 flex-shrink-0">
        <div class="icon-wrapper" :class="iconBackgroundClass">
          <el-icon :size="20" :color="iconColor"><component :is="getIconComponent" /></el-icon>
        </div>
      </div>
      
      <!-- Message content -->
      <div class="message-content flex-grow">
        <div class="flex items-center justify-between mb-1">
          <div class="message-title font-medium text-gray-900 flex items-center">
            {{ message.title }}
            <div v-if="!message.isRead" class="ml-2 w-2 h-2 rounded-full bg-red-500"></div>
          </div>
          <div class="message-time text-xs text-gray-500">{{ message.time }}</div>
        </div>
        <div class="message-body text-sm text-gray-600 mb-2">
          {{ message.content }}
        </div>
        <div class="message-actions flex justify-end space-x-2">
          <el-button v-if="!message.isRead" type="text" size="small" @click="$emit('mark-read', message.id)">
            Mark as Read
          </el-button>
          <el-button type="text" size="small" class="text-red-500" @click="$emit('delete', message.id)">
            Delete
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { 
  Warning, 
  InfoFilled, 
  Present, 
  Bicycle, 
  Tools, 
  Promotion, 
  Bell 
} from '@element-plus/icons-vue';

const props = defineProps({
  message: {
    type: Object,
    required: true
  }
});

defineEmits(['mark-read', 'delete']);

// Get icon component based on message type and icon name
const getIconComponent = computed(() => {
  switch (props.message.icon) {
    case 'warning':
      return Warning;
    case 'gift':
      return Present;
    case 'bike':
      return Bicycle;
    case 'tools':
      return Tools;
    case 'promotion':
      return Promotion;
    default:
      return Bell;
  }
});

// Get icon background color and text color based on message type
const iconBackgroundClass = computed(() => {
  switch (props.message.type) {
    case 'system':
      return 'bg-blue-100';
    case 'activity':
      return 'bg-amber-100';
    case 'trip':
      return 'bg-green-100';
    default:
      return 'bg-gray-100';
  }
});

const iconColor = computed(() => {
  switch (props.message.type) {
    case 'system':
      return '#3b82f6'; // blue-500
    case 'activity':
      return '#f59e0b'; // amber-500
    case 'trip':
      return '#10b981'; // green-500
    default:
      return '#6b7280'; // gray-500
  }
});
</script>

<style scoped>
.message-item-container {
  position: relative;
}

.message-item-container.unread {
  background-color: rgba(239, 246, 255, 0.5); /* blue-50 with opacity */
}

.icon-wrapper {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style> 