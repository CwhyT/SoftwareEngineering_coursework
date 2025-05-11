<template>
  <div>
    <el-dialog
      v-model="dialogVisible"
      title="问题反馈"
      width="90%"
      :before-close="handleClose"
      destroy-on-close
      class="feedback-dialog"
    >
      <el-form :model="feedbackForm" :rules="rules" ref="feedbackFormRef" label-position="top">
        <el-form-item label="问题类型" prop="type">
          <el-select v-model="feedbackForm.type" placeholder="请选择问题类型" class="w-full">
            <el-option label="车辆故障" value="scooter_issue" />
            <el-option label="账户问题" value="account_issue" />
            <el-option label="支付问题" value="payment_issue" />
            <el-option label="应用建议" value="app_suggestion" />
            <el-option label="其他问题" value="other" />
          </el-select>
        </el-form-item>
        
        <el-form-item label="车辆编号" prop="scooterId" v-if="feedbackForm.type === 'scooter_issue'">
          <el-input v-model="feedbackForm.scooterId" placeholder="请输入车辆编号（选填）" />
        </el-form-item>
        
        <el-form-item label="问题描述" prop="content">
          <el-input 
            v-model="feedbackForm.content" 
            type="textarea" 
            :rows="4" 
            placeholder="请详细描述您遇到的问题或建议..."
            maxlength="500"
            show-word-limit
          />
        </el-form-item>
        
        <el-form-item label="联系方式" prop="contact">
          <el-input v-model="feedbackForm.contact" placeholder="请留下您的联系方式，方便我们回复（选填）" />
        </el-form-item>
        
        <el-form-item label="上传图片" prop="images">
          <el-upload
            action="#"
            list-type="picture-card"
            :auto-upload="false"
            :limit="3"
            :on-change="handleImageChange"
            :on-remove="handleImageRemove"
          >
            <el-icon><Plus /></el-icon>
          </el-upload>
          <div class="text-xs text-gray-500">最多可上传3张图片（选填）</div>
        </el-form-item>
      </el-form>
      
      <template #footer>
        <div class="flex justify-between items-center">
          <div class="text-sm text-gray-500">感谢您的反馈，我们会尽快处理</div>
          <div>
            <el-button @click="handleClose">取消</el-button>
            <el-button type="primary" @click="submitFeedback" :loading="submitting">提交反馈</el-button>
          </div>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, defineEmits, defineExpose } from 'vue';
import { ElMessage } from 'element-plus';
import { Plus } from '@element-plus/icons-vue';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();
const emit = defineEmits(['submit-success', 'close']);
const dialogVisible = ref(false);
const submitting = ref(false);
const feedbackFormRef = ref(null);
const imageList = ref([]);

const feedbackForm = reactive({
  type: '',
  scooterId: '',
  content: '',
  contact: '',
  images: [],
  userId: userStore.user?.id || '',
  username: userStore.username || '',
  timestamp: null,
  status: 'pending' // pending, in_progress, resolved
});

const rules = {
  type: [{ required: true, message: '请选择问题类型', trigger: 'change' }],
  content: [{ required: true, message: '请描述您的问题或建议', trigger: 'blur' }]
};

// 处理图片变化
const handleImageChange = (file) => {
  // 在实际项目中，这里应该有图片上传到服务器的逻辑
  // 这里仅做示例，存储文件对象
  if (imageList.value.length < 3) {
    imageList.value.push(file);
    feedbackForm.images = imageList.value.map(img => img.url || URL.createObjectURL(img.raw));
  }
};

// 处理移除图片
const handleImageRemove = (file) => {
  const index = imageList.value.findIndex(img => img.uid === file.uid);
  if (index !== -1) {
    imageList.value.splice(index, 1);
    feedbackForm.images = imageList.value.map(img => img.url || URL.createObjectURL(img.raw));
  }
};

// 提交反馈
const submitFeedback = async () => {
  if (!feedbackFormRef.value) return;
  
  try {
    await feedbackFormRef.value.validate();
    
    submitting.value = true;
    
    // 添加时间戳
    feedbackForm.timestamp = new Date();
    
    // 模拟API提交
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // 获取反馈数据
    const existingFeedback = JSON.parse(localStorage.getItem('userFeedback') || '[]');
    
    // 生成唯一ID
    const newFeedback = {
      ...feedbackForm,
      id: `feedback-${Date.now()}`,
      timestamp: new Date().toISOString(),
    };
    
    // 添加到反馈列表
    existingFeedback.push(newFeedback);
    
    // 保存到本地存储
    localStorage.setItem('userFeedback', JSON.stringify(existingFeedback));
    
    // 提交成功
    ElMessage({
      type: 'success',
      message: '反馈提交成功，感谢您的反馈',
      duration: 2000
    });
    
    // 触发成功事件
    emit('submit-success');
    
    // 关闭对话框
    dialogVisible.value = false;
    
    // 重置表单
    resetForm();
    
  } catch (error) {
    console.error('提交反馈失败:', error);
    ElMessage({
      type: 'error',
      message: '提交失败，请重试',
      duration: 2000
    });
  } finally {
    submitting.value = false;
  }
};

// 关闭对话框
const handleClose = () => {
  // 确认是否放弃编辑
  if (feedbackForm.content) {
    if (confirm('确定要放弃编辑吗？')) {
      dialogVisible.value = false;
      resetForm();
      emit('close');
    }
  } else {
    dialogVisible.value = false;
    resetForm();
    emit('close');
  }
};

// 重置表单
const resetForm = () => {
  if (feedbackFormRef.value) {
    feedbackFormRef.value.resetFields();
  }
  
  imageList.value = [];
  
  Object.assign(feedbackForm, {
    type: '',
    scooterId: '',
    content: '',
    contact: '',
    images: [],
    userId: userStore.user?.id || '',
    username: userStore.username || '',
    timestamp: null,
    status: 'pending'
  });
};

// 打开对话框
const open = () => {
  dialogVisible.value = true;
};

// 暴露方法
defineExpose({
  open
});
</script>

<style scoped>
.feedback-dialog {
  max-width: 500px;
}

@media (max-width: 500px) {
  .feedback-dialog {
    width: 95% !important;
    margin: 0 auto;
  }
}
</style> 