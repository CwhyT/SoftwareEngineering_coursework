<template>
  <div class="verification-code-container">
    <div class="code-inputs flex">
      <template v-for="(digit, index) in totalDigits" :key="index">
        <input
          ref="inputRefs"
          type="text"
          maxlength="1"
          class="code-input"
          :class="{ 'is-filled': code[index] }"
          v-model="code[index]"
          @input="onInput(index)"
          @keydown="onKeyDown($event, index)"
          @paste="onPaste"
          @focus="currentFocus = index"
        />
        <span v-if="index < totalDigits - 1" class="code-separator"></span>
      </template>
    </div>
    
    <div v-if="errorMessage" class="error-message mt-2 text-red-500 text-sm">
      {{ errorMessage }}
    </div>
    
    <div class="resend-container mt-4" v-if="enableResend">
      <button 
        @click="$emit('resend')" 
        :disabled="countdown > 0"
        class="resend-button text-sm text-blue-600 hover:text-blue-800 disabled:text-gray-400 disabled:cursor-not-allowed"
      >
        {{ countdown > 0 ? `重新发送(${countdown}s)` : '重新发送验证码' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';

const props = defineProps({
  digits: {
    type: Number,
    default: 6
  },
  enableResend: {
    type: Boolean,
    default: true
  },
  countdown: {
    type: Number,
    default: 0
  },
  errorMessage: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['update:modelValue', 'complete', 'resend']);

const totalDigits = computed(() => props.digits);
const code = ref(Array(totalDigits.value).fill(''));
const inputRefs = ref([]);
const currentFocus = ref(0);

// 处理输入
const onInput = (index) => {
  if (code.value[index] && index < totalDigits.value - 1) {
    // 自动聚焦到下一个输入框
    currentFocus.value = index + 1;
    inputRefs.value[index + 1].focus();
  }
  
  // 发出更新事件
  emitUpdateEvent();
  
  // 检查是否已全部填写
  if (isComplete.value) {
    emit('complete', getCompleteValue());
  }
};

// 处理键盘按键
const onKeyDown = (event, index) => {
  if (event.key === 'Backspace' && !code.value[index] && index > 0) {
    // 如果当前输入框为空且按下退格键，聚焦到上一个输入框
    currentFocus.value = index - 1;
    inputRefs.value[index - 1].focus();
    code.value[index - 1] = '';
    emitUpdateEvent();
  } else if (event.key === 'ArrowLeft' && index > 0) {
    // 左箭头键，聚焦到上一个输入框
    currentFocus.value = index - 1;
    inputRefs.value[index - 1].focus();
  } else if (event.key === 'ArrowRight' && index < totalDigits.value - 1) {
    // 右箭头键，聚焦到下一个输入框
    currentFocus.value = index + 1;
    inputRefs.value[index + 1].focus();
  }
};

// 处理粘贴事件
const onPaste = (event) => {
  event.preventDefault();
  const pastedData = event.clipboardData.getData('text').trim();
  
  // 检查是否是纯数字
  if (!/^\d+$/.test(pastedData)) return;
  
  // 填充验证码
  const digits = pastedData.split('').slice(0, totalDigits.value);
  code.value = [...digits, ...Array(totalDigits.value - digits.length).fill('')];
  
  // 聚焦到最后一个填充的位置或下一个空位
  const nextEmptyIndex = code.value.findIndex(val => !val);
  const focusIndex = nextEmptyIndex === -1 ? totalDigits.value - 1 : nextEmptyIndex;
  currentFocus.value = focusIndex;
  inputRefs.value[focusIndex].focus();
  
  // 发出更新事件
  emitUpdateEvent();
  
  // 检查是否已全部填写
  if (isComplete.value) {
    emit('complete', getCompleteValue());
  }
};

// 计算是否填写完成
const isComplete = computed(() => {
  return code.value.every(digit => digit !== '');
});

// 发出更新事件
const emitUpdateEvent = () => {
  emit('update:modelValue', getCompleteValue());
};

// 获取完整验证码值
const getCompleteValue = () => {
  return code.value.join('');
};

// 监听外部更新
watch(() => props.modelValue, (newValue) => {
  if (newValue) {
    const newValueStr = String(newValue);
    const digits = newValueStr.split('').slice(0, totalDigits.value);
    code.value = [...digits, ...Array(totalDigits.value - digits.length).fill('')];
  } else {
    code.value = Array(totalDigits.value).fill('');
  }
}, { immediate: true });

// 组件挂载时聚焦第一个输入框
onMounted(() => {
  // 在微任务中执行，确保DOM已更新
  setTimeout(() => {
    if (inputRefs.value && inputRefs.value.length > 0) {
      inputRefs.value[0].focus();
    }
  }, 100);
});
</script>

<style scoped>
.verification-code-container {
  width: 100%;
}

.code-inputs {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.code-input {
  width: 40px;
  height: 48px;
  font-size: 18px;
  text-align: center;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  background-color: white;
  outline: none;
  transition: all 0.2s;
}

.code-input:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
}

.code-input.is-filled {
  border-color: #10b981;
}

.code-separator {
  width: 8px;
}

@media (max-width: 640px) {
  .code-input {
    width: 36px;
    height: 42px;
    font-size: 16px;
  }
  
  .code-separator {
    width: 4px;
  }
}
</style> 