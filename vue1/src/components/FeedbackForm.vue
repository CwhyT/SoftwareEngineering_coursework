<template>
  <div>
    <el-dialog
      v-model="dialogVisible"
      title="Feedback"
      width="90%"
      :before-close="handleClose"
      destroy-on-close
      class="feedback-dialog"
    >
      <el-form :model="feedbackForm" :rules="rules" ref="feedbackFormRef" label-position="top">
        <el-form-item label="Issue Type" prop="type">
          <el-select v-model="feedbackForm.type" placeholder="Please select issue type" class="w-full">
            <el-option label="Scooter Issue" value="scooter_issue" />
            <el-option label="Account Issue" value="account_issue" />
            <el-option label="Payment Issue" value="payment_issue" />
            <el-option label="App Suggestion" value="app_suggestion" />
            <el-option label="Other" value="other" />
          </el-select>
        </el-form-item>
        
        <el-form-item label="Scooter ID" prop="scooterId" v-if="feedbackForm.type === 'scooter_issue'">
          <el-input v-model="feedbackForm.scooterId" placeholder="Please enter scooter ID (optional)" />
        </el-form-item>
        
        <el-form-item label="Description" prop="content">
          <el-input 
            v-model="feedbackForm.content" 
            type="textarea" 
            :rows="4" 
            placeholder="Please describe your issue or suggestion in detail..."
            maxlength="500"
            show-word-limit
          />
        </el-form-item>
        
        <el-form-item label="Contact Information" prop="contact">
          <el-input v-model="feedbackForm.contact" placeholder="Please leave your contact information (optional)" />
        </el-form-item>
        
        <el-form-item label="Upload Images" prop="images">
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
          <div class="text-xs text-gray-500">Maximum 3 images (optional)</div>
        </el-form-item>
      </el-form>
      
      <template #footer>
        <div class="flex justify-between items-center">
          <div class="text-sm text-gray-500">Thank you for your feedback, we will process it as soon as possible</div>
          <div>
            <el-button @click="handleClose">Cancel</el-button>
            <el-button type="primary" @click="submitFeedback" :loading="submitting">Submit</el-button>
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
  type: [{ required: true, message: 'Please select issue type', trigger: 'change' }],
  content: [{ required: true, message: 'Please describe your issue or suggestion', trigger: 'blur' }]
};

// Handle image change
const handleImageChange = (file) => {
  // In actual project, there should be logic to upload images to server
  // This is just an example, storing file objects
  if (imageList.value.length < 3) {
    imageList.value.push(file);
    feedbackForm.images = imageList.value.map(img => img.url || URL.createObjectURL(img.raw));
  }
};

// Handle image removal
const handleImageRemove = (file) => {
  const index = imageList.value.findIndex(img => img.uid === file.uid);
  if (index !== -1) {
    imageList.value.splice(index, 1);
    feedbackForm.images = imageList.value.map(img => img.url || URL.createObjectURL(img.raw));
  }
};

// Submit feedback
const submitFeedback = async () => {
  if (!feedbackFormRef.value) return;
  
  try {
    await feedbackFormRef.value.validate();
    
    submitting.value = true;
    
    // Add timestamp
    feedbackForm.timestamp = new Date();
    
    // Simulate API submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Get feedback data
    const existingFeedback = JSON.parse(localStorage.getItem('userFeedback') || '[]');
    
    // Generate unique ID
    const newFeedback = {
      ...feedbackForm,
      id: `feedback-${Date.now()}`,
      timestamp: new Date().toISOString(),
    };
    
    // Add to feedback list
    existingFeedback.push(newFeedback);
    
    // Save to local storage
    localStorage.setItem('userFeedback', JSON.stringify(existingFeedback));
    
    // Submit success
    ElMessage({
      type: 'success',
      message: 'Feedback submitted successfully, thank you for your feedback',
      duration: 2000
    });
    
    // Trigger success event
    emit('submit-success');
    
    // Close dialog
    dialogVisible.value = false;
    
    // Reset form
    resetForm();
    
  } catch (error) {
    console.error('Failed to submit feedback:', error);
    ElMessage({
      type: 'error',
      message: 'Submission failed, please try again',
      duration: 2000
    });
  } finally {
    submitting.value = false;
  }
};

// Close dialog
const handleClose = () => {
  // Confirm if want to discard changes
  if (feedbackForm.content) {
    if (confirm('Are you sure you want to discard your changes?')) {
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

// Reset form
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

// Open dialog
const open = () => {
  dialogVisible.value = true;
};

// Expose methods
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