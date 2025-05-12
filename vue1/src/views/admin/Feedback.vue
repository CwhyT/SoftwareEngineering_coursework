<template>
  <div class="feedback-management">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>Feedback Management</span>
          <el-button type="primary" @click="generateTestFeedback">
            <el-icon><Plus /></el-icon>Generate Test Data
          </el-button>
        </div>
      </template>

      <!-- 筛选器 -->
      <div class="filter-container">
        <el-select v-model="filterType" placeholder="Feedback Type" clearable>
          <el-option label="Vehicle Issue" value="scooter" />
          <el-option label="System Issue" value="system" />
          <el-option label="Suggestion" value="suggestion" />
        </el-select>
        <el-select v-model="filterStatus" placeholder="Status" clearable>
          <el-option label="Pending" value="pending" />
          <el-option label="Processing" value="processing" />
          <el-option label="Completed" value="completed" />
        </el-select>
        <el-button type="primary" @click="refreshData">Refresh</el-button>
      </div>

      <!-- 反馈列表 -->
      <el-table :data="filteredFeedback" style="width: 100%" v-loading="loading">
        <el-table-column prop="username" label="Username" width="120" />
        <el-table-column prop="type" label="Type" width="100">
          <template #default="{ row }">
            <el-tag :type="getTypeTag(row.type)">
              {{ getTypeLabel(row.type) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="content" label="Content" show-overflow-tooltip />
        <el-table-column prop="status" label="Status" width="100">
          <template #default="{ row }">
            <el-tag :type="getStatusTag(row.status)">
              {{ getStatusLabel(row.status) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="timestamp" label="Submitted At" width="180">
          <template #default="{ row }">
            {{ formatDate(row.timestamp) }}
          </template>
        </el-table-column>
        <el-table-column label="Actions" width="200" fixed="right">
          <template #default="{ row }">
            <el-button type="primary" size="small" @click="showDetail(row)">
              View Details
            </el-button>
            <el-button 
              type="success" 
              size="small" 
              @click="showReply(row)"
              :disabled="row.status === 'completed'"
            >
              Reply
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 详情对话框 -->
    <el-dialog
      v-model="detailVisible"
      title="Feedback Details"
      width="50%"
    >
      <div v-if="currentFeedback" class="feedback-detail">
        <div class="detail-item">
          <span class="label">Username: </span>
          <span>{{ currentFeedback.username }}</span>
        </div>
        <div class="detail-item">
          <span class="label">Feedback Type: </span>
          <el-tag :type="getTypeTag(currentFeedback.type)">
            {{ getTypeLabel(currentFeedback.type) }}
          </el-tag>
        </div>
        <div class="detail-item">
          <span class="label">Status: </span>
          <el-tag :type="getStatusTag(currentFeedback.status)">
            {{ getStatusLabel(currentFeedback.status) }}
          </el-tag>
        </div>
        <div class="detail-item">
          <span class="label">Submitted At: </span>
          <span>{{ formatDate(currentFeedback.timestamp) }}</span>
        </div>
        <div class="detail-item">
          <span class="label">Content: </span>
          <div class="content">{{ currentFeedback.content }}</div>
        </div>
        <div v-if="currentFeedback.scooterId" class="detail-item">
          <span class="label">Related Vehicle: </span>
          <span>{{ currentFeedback.scooterId }}</span>
        </div>
        <div v-if="currentFeedback.reply" class="detail-item">
          <span class="label">Reply: </span>
          <div class="content">{{ currentFeedback.reply }}</div>
        </div>
      </div>
    </el-dialog>

    <!-- 回复对话框 -->
    <el-dialog
      v-model="replyVisible"
      title="Reply Feedback"
      width="50%"
    >
      <div v-if="currentFeedback" class="reply-form">
        <div class="feedback-content">
          <h4>Content:</h4>
          <p>{{ currentFeedback.content }}</p>
        </div>
        <el-form :model="replyForm" label-width="80px">
          <el-form-item label="Reply">
            <el-input
              v-model="replyForm.content"
              type="textarea"
              :rows="4"
              placeholder="Please enter reply"
            />
          </el-form-item>
          <el-form-item label="Status">
            <el-select v-model="replyForm.status">
              <el-option label="Processing" value="processing" />
              <el-option label="Completed" value="completed" />
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="replyVisible = false">Cancel</el-button>
          <el-button type="primary" @click="submitReply">
            Submit Reply
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'

// 状态
const loading = ref(false)
const feedback = ref([])
const filterType = ref('')
const filterStatus = ref('')
const detailVisible = ref(false)
const replyVisible = ref(false)
const currentFeedback = ref(null)
const replyForm = ref({
  content: '',
  status: 'processing'
})

// 计算属性：过滤后的反馈列表
const filteredFeedback = computed(() => {
  return feedback.value.filter(item => {
    const typeMatch = !filterType.value || item.type === filterType.value
    const statusMatch = !filterStatus.value || item.status === filterStatus.value
    return typeMatch && statusMatch
  })
})

// 获取反馈数据
const fetchFeedback = () => {
  loading.value = true
  try {
    const storedFeedback = localStorage.getItem('feedback')
    if (storedFeedback) {
      feedback.value = JSON.parse(storedFeedback)
    }
  } catch (error) {
    console.error('Failed to fetch feedback data:', error)
    ElMessage.error('Failed to fetch feedback data')
  } finally {
    loading.value = false
  }
}

// 刷新数据
const refreshData = () => {
  fetchFeedback()
}

// 显示详情
const showDetail = (row) => {
  currentFeedback.value = row
  detailVisible.value = true
}

// 显示回复对话框
const showReply = (row) => {
  currentFeedback.value = row
  replyForm.value = {
    content: '',
    status: row.status === 'pending' ? 'processing' : row.status
  }
  replyVisible.value = true
}

// 提交回复
const submitReply = () => {
  if (!replyForm.value.content.trim()) {
    ElMessage.warning('Please enter reply content')
    return
  }

  const index = feedback.value.findIndex(f => f.id === currentFeedback.value.id)
  if (index !== -1) {
    feedback.value[index] = {
      ...feedback.value[index],
      reply: replyForm.value.content,
      status: replyForm.value.status
    }
    localStorage.setItem('feedback', JSON.stringify(feedback.value))
    ElMessage.success('Reply submitted successfully')
    replyVisible.value = false
    refreshData()
  }
}

// 生成测试数据
const generateTestFeedback = () => {
  const testFeedback = [
    {
      id: Date.now(),
      type: 'scooter',
      status: 'pending',
      username: 'Test User 1',
      content: 'Vehicle cannot start, please check',
      timestamp: new Date().toISOString(),
      scooterId: 'SCOOTER001'
    },
    {
      id: Date.now() + 1,
      type: 'system',
      status: 'processing',
      username: 'Test User 2',
      content: 'App frequently crashes, affecting usage',
      timestamp: new Date().toISOString(),
      reply: 'Investigating the issue, please wait'
    },
    {
      id: Date.now() + 2,
      type: 'suggestion',
      status: 'completed',
      username: 'Test User 3',
      content: 'Suggest adding more parking locations',
      timestamp: new Date().toISOString(),
      reply: 'Thank you for your suggestion, we will consider it carefully'
    }
  ]

  const existingFeedback = localStorage.getItem('feedback')
  const allFeedback = existingFeedback 
    ? [...JSON.parse(existingFeedback), ...testFeedback]
    : testFeedback

  localStorage.setItem('feedback', JSON.stringify(allFeedback))
  ElMessage.success('Test data generated successfully')
  refreshData()
}

// 辅助函数
const getTypeTag = (type) => {
  const types = {
    scooter: 'danger',
    system: 'warning',
    suggestion: 'info'
  }
  return types[type] || 'info'
}

const getTypeLabel = (type) => {
  const labels = {
    scooter: 'Vehicle Issue',
    system: 'System Issue',
    suggestion: 'Suggestion'
  }
  return labels[type] || type
}

const getStatusTag = (status) => {
  const statuses = {
    pending: 'info',
    processing: 'warning',
    completed: 'success'
  }
  return statuses[status] || 'info'
}

const getStatusLabel = (status) => {
  const labels = {
    pending: 'Pending',
    processing: 'Processing',
    completed: 'Completed'
  }
  return labels[status] || status
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleString()
}

// 初始化
onMounted(() => {
  fetchFeedback()
})
</script>

<style scoped>
.feedback-management {
  padding: 20px;
  margin-bottom: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.filter-container {
  margin-bottom: 20px;
  display: flex;
  gap: 10px;
}

.feedback-detail {
  padding: 20px;
}

.detail-item {
  margin-bottom: 15px;
}

.detail-item .label {
  font-weight: bold;
  margin-right: 10px;
}

.detail-item .content {
  margin-top: 5px;
  padding: 10px;
  background-color: #f5f7fa;
  border-radius: 4px;
}

.reply-form {
  padding: 20px;
}

.feedback-content {
  margin-bottom: 20px;
  padding: 10px;
  background-color: #f5f7fa;
  border-radius: 4px;
}

.feedback-content h4 {
  margin: 0 0 10px 0;
  color: #606266;
}

.feedback-content p {
  margin: 0;
  color: #303133;
}
</style> 