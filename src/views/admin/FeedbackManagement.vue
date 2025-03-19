<template>
  <div class="p-6">
    <div class="mb-6 flex justify-between items-center">
      <h1 class="text-2xl font-bold text-gray-900">反馈管理</h1>
      <div class="flex space-x-4">
        <el-select v-model="filterStatus" placeholder="筛选状态" @change="handleFilterChange">
          <el-option label="全部" value="" />
          <el-option label="待处理" value="pending" />
          <el-option label="处理中" value="processing" />
          <el-option label="已解决" value="resolved" />
          <el-option label="已关闭" value="closed" />
        </el-select>
        <el-button type="primary" @click="exportData">导出数据</el-button>
      </div>
    </div>

    <!-- 反馈列表 -->
    <el-card v-loading="loading">
      <el-table :data="feedbackList" style="width: 100%">
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="user" label="用户" min-width="180">
          <template #default="{ row }">
            <div class="flex items-center">
              <el-avatar :size="32" :src="row.userAvatar">
                {{ row.userNickname?.[0] || row.username?.[0] || 'U' }}
              </el-avatar>
              <span class="ml-2">{{ row.userNickname || row.username }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="type" label="类型" width="120">
          <template #default="{ row }">
            <el-tag :type="getFeedbackTypeTag(row.type)">
              {{ getFeedbackTypeText(row.type) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="content" label="内容" min-width="250">
          <template #default="{ row }">
            <div class="truncate">{{ row.content }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="createdAt" label="提交时间" width="180">
          <template #default="{ row }">
            {{ formatDate(row.createdAt) }}
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" width="120">
          <template #default="{ row }">
            <el-tag :type="getStatusType(row.status)">
              {{ getStatusText(row.status) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template #default="{ row }">
            <el-button 
              size="small" 
              type="primary" 
              plain
              @click="handleView(row)"
            >
              查看
            </el-button>
            <el-button 
              size="small" 
              :type="row.status === 'pending' ? 'success' : 'info'" 
              plain
              :disabled="row.status === 'resolved' || row.status === 'closed'"
              @click="handleProcess(row)"
            >
              {{ getActionText(row.status) }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <div class="flex justify-center mt-6">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 50, 100]"
          :background="true"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>

    <!-- 查看反馈对话框 -->
    <el-dialog
      v-model="viewDialogVisible"
      title="反馈详情"
      width="50%"
    >
      <div v-if="currentFeedback" class="space-y-6">
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <el-avatar :size="40" :src="currentFeedback.userAvatar">
              {{ currentFeedback.userNickname?.[0] || currentFeedback.username?.[0] || 'U' }}
            </el-avatar>
            <div class="ml-3">
              <div class="font-medium">{{ currentFeedback.userNickname || currentFeedback.username }}</div>
              <div class="text-gray-500 text-sm">{{ currentFeedback.contact }}</div>
            </div>
          </div>
          <el-tag :type="getStatusType(currentFeedback.status)">
            {{ getStatusText(currentFeedback.status) }}
          </el-tag>
        </div>

        <div>
          <div class="text-gray-500 mb-1">问题类型</div>
          <div>{{ getFeedbackTypeText(currentFeedback.type) }}</div>
        </div>

        <div>
          <div class="text-gray-500 mb-1">问题描述</div>
          <div class="bg-gray-50 p-4 rounded-lg">{{ currentFeedback.content }}</div>
        </div>

        <div v-if="currentFeedback.images && currentFeedback.images.length > 0">
          <div class="text-gray-500 mb-1">图片附件</div>
          <div class="flex flex-wrap gap-2">
            <el-image
              v-for="(image, index) in currentFeedback.images"
              :key="index"
              :src="image"
              :preview-src-list="currentFeedback.images"
              fit="cover"
              class="w-24 h-24 object-cover rounded"
            />
          </div>
        </div>

        <div v-if="currentFeedback.reply">
          <div class="text-gray-500 mb-1">回复内容</div>
          <div class="bg-gray-50 p-4 rounded-lg">{{ currentFeedback.reply }}</div>
        </div>

        <el-form
          v-if="currentFeedback.status !== 'resolved' && currentFeedback.status !== 'closed'"
          ref="replyFormRef"
          :model="replyForm"
          :rules="replyRules"
        >
          <el-form-item prop="reply" label="回复">
            <el-input
              v-model="replyForm.reply"
              type="textarea"
              :rows="4"
              placeholder="请输入回复内容"
            />
          </el-form-item>
          <el-form-item label="更新状态" prop="status">
            <el-select v-model="replyForm.status" placeholder="请选择状态">
              <el-option label="处理中" value="processing" />
              <el-option label="已解决" value="resolved" />
              <el-option label="已关闭" value="closed" />
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <div class="flex justify-end">
          <el-button @click="viewDialogVisible = false">取消</el-button>
          <el-button
            v-if="currentFeedback && currentFeedback.status !== 'resolved' && currentFeedback.status !== 'closed'"
            type="primary"
            :loading="submitting"
            @click="handleSubmitReply"
          >
            提交回复
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useAdminStore } from '@/stores/admin'
import { ElMessage, ElMessageBox } from 'element-plus'

const adminStore = useAdminStore()

// 表格相关
const loading = ref(false)
const feedbackList = ref([])
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)
const filterStatus = ref('')

// 查看对话框相关
const viewDialogVisible = ref(false)
const currentFeedback = ref(null)
const replyFormRef = ref(null)
const replyForm = reactive({
  reply: '',
  status: 'processing'
})
const replyRules = {
  reply: [
    { required: true, message: '请输入回复内容', trigger: 'blur' },
    { min: 5, message: '回复内容不能少于5个字符', trigger: 'blur' }
  ],
  status: [
    { required: true, message: '请选择状态', trigger: 'change' }
  ]
}
const submitting = ref(false)

// 获取反馈列表
const fetchFeedbackList = async () => {
  loading.value = true
  try {
    const params = {
      page: currentPage.value,
      pageSize: pageSize.value,
      status: filterStatus.value
    }
    
    const response = await fetch('/api/admin/feedbacks', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      params
    })
    
    if (response.ok) {
      const data = await response.json()
      feedbackList.value = data.items || []
      total.value = data.total || 0
    } else {
      throw new Error('获取反馈列表失败')
    }
  } catch (error) {
    console.error('获取反馈列表失败', error)
    ElMessage.error(error.message || '获取反馈列表失败')
  } finally {
    loading.value = false
  }
}

// 处理筛选变化
const handleFilterChange = () => {
  currentPage.value = 1
  fetchFeedbackList()
}

// 分页处理
const handleSizeChange = (size) => {
  pageSize.value = size
  fetchFeedbackList()
}

const handleCurrentChange = (page) => {
  currentPage.value = page
  fetchFeedbackList()
}

// 查看反馈详情
const handleView = (row) => {
  currentFeedback.value = row
  viewDialogVisible.value = true
  replyForm.reply = row.reply || ''
  replyForm.status = row.status === 'pending' ? 'processing' : row.status
}

// 处理反馈
const handleProcess = (row) => {
  handleView(row)
}

// 提交回复
const handleSubmitReply = async () => {
  if (!replyFormRef.value) return
  
  await replyFormRef.value.validate(async (valid) => {
    if (valid) {
      submitting.value = true
      try {
        const result = await adminStore.updateFeedbackStatus(
          currentFeedback.value.id,
          replyForm.status,
          replyForm.reply
        )
        
        if (result.success) {
          ElMessage.success('回复已提交')
          viewDialogVisible.value = false
          fetchFeedbackList()
        } else {
          throw new Error(result.message)
        }
      } catch (error) {
        ElMessage.error(error.message || '提交回复失败')
      } finally {
        submitting.value = false
      }
    }
  })
}

// 导出数据
const exportData = () => {
  const params = new URLSearchParams({
    status: filterStatus.value
  }).toString()
  
  window.open(`/api/admin/feedbacks/export?${params}`, '_blank')
}

// 辅助函数
const formatDate = (date) => {
  if (!date) return '-'
  return new Date(date).toLocaleString()
}

const getFeedbackTypeText = (type) => {
  const types = {
    device: '设备故障',
    software: '软件问题',
    account: '账户问题',
    billing: '计费问题',
    other: '其他问题'
  }
  return types[type] || type
}

const getFeedbackTypeTag = (type) => {
  const types = {
    device: 'warning',
    software: 'primary',
    account: 'info',
    billing: 'danger',
    other: 'info'
  }
  return types[type] || 'info'
}

const getStatusType = (status) => {
  const types = {
    pending: 'warning',
    processing: 'primary',
    resolved: 'success',
    closed: 'info'
  }
  return types[status] || 'info'
}

const getStatusText = (status) => {
  const texts = {
    pending: '待处理',
    processing: '处理中',
    resolved: '已解决',
    closed: '已关闭'
  }
  return texts[status] || status
}

const getActionText = (status) => {
  if (status === 'pending') return '处理'
  if (status === 'processing') return '更新'
  return '查看'
}

onMounted(() => {
  fetchFeedbackList()
})
</script> 