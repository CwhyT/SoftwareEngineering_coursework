<template>
  <div class="scooter-battery">
    <div class="battery-container" :title="`${level}%`">
      <div class="battery-body">
        <div class="battery-level" :style="levelStyle" :class="levelClass"></div>
      </div>
      <div class="battery-cap"></div>
    </div>
    <div v-if="showText" class="battery-text" :class="levelClass">{{ level }}%</div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  level: {
    type: Number,
    required: true,
    validator: value => value >= 0 && value <= 100
  },
  showText: {
    type: Boolean,
    default: true
  },
  size: {
    type: String,
    default: 'medium', // 'small', 'medium', 'large'
    validator: value => ['small', 'medium', 'large'].includes(value)
  }
});

const levelStyle = computed(() => {
  return {
    width: `${props.level}%`
  };
});

const levelClass = computed(() => {
  if (props.level > 60) return 'level-high';
  if (props.level > 30) return 'level-medium';
  return 'level-low';
});
</script>

<style scoped>
.scooter-battery {
  display: inline-flex;
  align-items: center;
  gap: 5px;
}

.battery-container {
  display: flex;
  align-items: center;
}

.battery-body {
  width: 50px;
  height: 20px;
  border: 2px solid #aaa;
  border-radius: 3px;
  position: relative;
  background-color: #f8f8f8;
  overflow: hidden;
}

.battery-text {
  font-size: 12px;
  font-weight: bold;
}

.battery-level {
  height: 100%;
  background-color: #4CAF50;
  transition: width 0.3s ease;
}

.battery-cap {
  width: 3px;
  height: 10px;
  background-color: #aaa;
  border-radius: 0 2px 2px 0;
}

/* Small size */
.scooter-battery:has(.size-small) .battery-body {
  width: 30px;
  height: 12px;
}

.scooter-battery:has(.size-small) .battery-cap {
  width: 2px;
  height: 6px;
}

.scooter-battery:has(.size-small) .battery-text {
  font-size: 10px;
}

/* Large size */
.scooter-battery:has(.size-large) .battery-body {
  width: 80px;
  height: 30px;
}

.scooter-battery:has(.size-large) .battery-cap {
  width: 4px;
  height: 16px;
}

.scooter-battery:has(.size-large) .battery-text {
  font-size: 14px;
}

/* Level colors */
.level-high {
  background-color: #4CAF50;
  color: #4CAF50;
}

.level-medium {
  background-color: #FFC107;
  color: #FFC107;
}

.level-low {
  background-color: #F44336;
  color: #F44336;
}
</style> 