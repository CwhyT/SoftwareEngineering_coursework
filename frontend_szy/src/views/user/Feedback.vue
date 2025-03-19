<template>
  <div class="container mx-auto px-4 py-8">
    <div class="max-w-2xl mx-auto">
      <div class="mb-8">
        <h1 class="text-2xl font-bold text-gray-900">问题反馈</h1>
        <p class="text-gray-600">如果您在使用过程中遇到任何问题，请告诉我们</p>
      </div>

      <!-- 反馈表单 -->
      <el-card class="mb-6">
        <el-form
          ref="formRef"
          :model="formData"
          :rules="rules"
          label-width="100px"
        >
          <el-form-item label="问题类型" prop="type">
            <el-select v-model="formData.type" placeholder="请选择问题类型" class="w-full">
              <el-option
                v-for="item in problemTypes"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>

          <el-form-item label="问题描述" prop="content">
            <el-input
              v-model="formData.content"
              type="textarea"
              :rows="4"
              placeholder="请详细描述您遇到的问题"
            />
          </el-form-item>

          <el-form-item label="图片上传">
            <el-upload
              class="upload-demo"
              action="/api/feedback/upload"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :on-success="handleUploadSuccess"
              :before-upload="beforeUpload"
              :limit="3"
              list-type="picture"
              :multiple="true"
            >
              <el-button type="primary">点击上传</el-button>
              <template #tip>
                <div class="text-gray-400 mt-1">
                  最多上传3张图片，每张不超过5MB，支持jpg、png格式
                </div>
              </template>
            </el-upload>
          </el-form-item>

          <el-form-item label="联系方式" prop="contact">
            <el-input
              v-model="formData.contact"
              placeholder="请留下您的联系方式，方便我们及时回复"
            />
          </el-form-item>

          <el-form-item>
            <el-button
              type="primary"
              :loading="loading"
              @click="handleSubmit"
            >
              提交反馈
            </el-button>
          </el-form-item>
        </el-form>
      </el-card>

      <!-- 历史反馈 -->
      <el-card>
        <template #header>
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <el-icon class="mr-2"><List /></el-icon>
              <span>历史反馈</span>
            </div>
          </div>
        </template>

        <el-timeline>
          <el-timeline-item
            v-for="item in feedbackHistory"
            :key="item.id"
            :timestamp="formatDate(item.createdAt)"
            :type="getStatusType(item.status)"
          >
            <div class="bg-gray-50 p-4 rounded-lg">
              <div class="flex items-center justify-between mb-2">
                <span class="font-medium">{{ getProblemTypeLabel(item.type) }}</span>
                <el-tag :type="getStatusType(item.status)" size="small">
                  {{ getStatusText(item.status) }}
                </el-tag>
              </div>
              <p class="text-gray-600 mb-2">{{ item.content }}</p>
              
              <!-- 图片预览 -->
              <div v-if="item.images?.length" class="flex gap-2 mb-2">
                <el-image
                  v-for="(image, index) in item.images"
                  :key="index"
                  :src="image"
                  :preview-src-list="item.images"
                  fit="cover"
                  class="w-20 h-20 rounded"
                />
              </div>

              <!-- 客服回复 -->
              <div 
                v-if="item.reply"
                class="mt-4 bg-white p-3 rounded border border-gray-200"
              >
                <div class="flex items-center text-gray-500 text-sm mb-1">
                  <el-icon class="mr-1"><Service /></el-icon>
                  <span>客服回复</span>
                </div>
                <p class="text-gray-600">{{ item.reply }}</p>
              </div>
            </div>
          </el-timeline-item>
        </el-timeline>

        <!-- 加载更多 -->
        <div 
          v-if="hasMore"
          class="text-center mt-4"
        >
          <el-button
            text
            :loading="loadingMore"
            @click="loadMore"
          >
            加载更多
          </el-button>
        </div>
      </el-card>

      <!-- 图片预览对话框 -->
      <el-dialog v-model="previewVisible" title="图片预览">
        <img :src="previewImage" alt="Preview" class="w-full">
      </el-dialog>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useScooterStore } from '@/stores/scooter'
import { ElMessage } from 'element-plus'
import {
  List,
  Service
} from '@element-plus/icons-vue'

const scooterStore = useScooterStore()
const formRef = ref(null)
const loading = ref(false)
const loadingMore = ref(false)
const previewVisible = ref(false)
const previewImage = ref('')
const page = ref(1)
const hasMore = ref(true)

// 问题类型选项
const problemTypes = [
  { label: '设备故障', value: 'device' },
  { label: '软件问题', value: 'software' },
  { label: '账户问题', value: 'account' },
  { label: '计费问题', value: 'billing' },
  { label: '其他问题', value: 'other' }
]

// 表单数据
const formData = reactive({
  type: '',
  content: '',
  contact: '',
  images: []
})

// 表单验证规则
const rules = {
  type: [
    { required: true, message: '请选择问题类型', trigger: 'change' }
  ],
  content: [
    { required: true, message: '请描述您遇到的问题', trigger: 'blur' },
    { min: 10, message: '描述不能少于10个字符', trigger: 'blur' }
  ],
  contact: [
    { required: true, message: '请留下您的联系方式', trigger: 'blur' }
  ]
}

// 历史反馈
const feedbackHistory = ref([])

// 处理图片上传
const handlePreview = (file) => {
  previewImage.value = file.url
  previewVisible.value = true
}

const handleRemove = (file) => {
  const index = formData.images.indexOf(file.url)
  if (index !== -1) {
    formData.images.splice(index, 1)
  }
}

const handleUploadSuccess = (response) => {
  formData.images.push(response.url)
  ElMessage.success('图片上传成功')
}

const beforeUpload = (file) => {
  const isJPG = file.type === 'image/jpeg'
  const isPNG = file.type === 'image/png'
  const isLt5M = file.size / 1024 / 1024 < 5

  if (!isJPG && !isPNG) {
    ElMessage.error('只能上传JPG或PNG格式的图片!')
    return false
  }
  if (!isLt5M) {
    ElMessage.error('图片大小不能超过5MB!')
    return false
  }
  return true
}

// 提交反馈
const handleSubmit = async () => {
  if (!formRef.value) return

  await formRef.value.validate(async (valid, fields) => {
    if (valid) {
      loading.value = true
      try {
        const result = await scooterStore.submitFeedback({
          ...formData,
          images: formData.images
        })

        if (result.success) {
          ElMessage.success('反馈提交成功')
          // 重置表单
          formRef.value.resetFields()
          formData.images = []
          // 刷新历史记录
          page.value = 1
          await fetchFeedbackHistory(true)
        } else {
          ElMessage.error(result.message)
        }
      } catch (error) {
        ElMessage.error('提交失败，请稍后重试')
      } finally {
        loading.value = false
      }
    }
  })
}

// 获取历史反馈
const fetchFeedbackHistory = async (refresh = false) => {
  try {
    loadingMore.value = true
    const response = await fetch(`/api/feedback/history?page=${page.value}&pageSize=10`)
    const data = await response.json()

    if (refresh) {
      feedbackHistory.value = data.items
    } else {
      feedbackHistory.value.push(...data.items)
    }

    hasMore.value = data.hasMore
  } catch (error) {
    ElMessage.error('获取历史反馈失败')
  } finally {
    loadingMore.value = false
  }
}

// 加载更多
const loadMore = () => {
  if (loadingMore.value) return
  page.value++
  fetchFeedbackHistory()
}

// 格式化日期
const formatDate = (date) => {
  return new Date(date).toLocaleString()
}

// 获取问题类型标签
const getProblemTypeLabel = (type) => {
  const item = problemTypes.find(item => item.value === type)
  return item ? item.label : type
}

// 获取状态类型
const getStatusType = (status) => {
  const types = {
    pending: 'warning',
    processing: 'primary',
    resolved: 'success',
    closed: 'info'
  }
  return types[status] || 'info'
}

// 获取状态文本
const getStatusText = (status) => {
  const texts = {
    pending: '待处理',
    processing: '处理中',
    resolved: '已解决',
    closed: '已关闭'
  }
  return texts[status] || status
}

onMounted(() => {
  fetchFeedbackHistory()
})
</script>

<style scoped>
.el-timeline-item :deep(.el-timeline-item__tail) {
  border-left-color: #e5e7eb;
}
</style> 