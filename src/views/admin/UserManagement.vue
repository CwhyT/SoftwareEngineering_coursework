<template>
  <div class="p-6">
    <div class="mb-6 flex flex-wrap justify-between items-center">
      <h1 class="text-2xl font-bold text-gray-900">用户管理</h1>
      <div class="flex space-x-4">
        <el-input
          v-model="searchQuery"
          placeholder="搜索用户"
          class="w-64"
          clearable
          @clear="handleSearch"
        >
          <template #prefix>
            <el-icon><Search /></el-icon>
          </template>
        </el-input>
        <el-button type="primary" @click="handleSearch">搜索</el-button>
        <el-button @click="showAddUserDialog = true">添加用户</el-button>
      </div>
    </div>

    <!-- 筛选区域 -->
    <div class="mb-6 bg-white p-4 rounded-lg shadow-sm">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <div class="text-sm text-gray-600 mb-2">状态</div>
          <el-select 
            v-model="filters.status" 
            placeholder="全部状态" 
            class="w-full"
            clearable
            @change="fetchUsers(1)"
          >
            <el-option label="全部" value="" />
            <el-option label="正常" value="active" />
            <el-option label="禁用" value="disabled" />
          </el-select>
        </div>
        <div>
          <div class="text-sm text-gray-600 mb-2">注册时间</div>
          <el-date-picker
            v-model="filters.dateRange"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            class="w-full"
            value-format="YYYY-MM-DD"
            @change="fetchUsers(1)"
          />
        </div>
        <div>
          <div class="text-sm text-gray-600 mb-2">租赁次数</div>
          <el-select 
            v-model="filters.rentals" 
            placeholder="全部" 
            class="w-full"
            clearable
            @change="fetchUsers(1)"
          >
            <el-option label="全部" value="" />
            <el-option label="无租赁记录" value="0" />
            <el-option label="1-5次" value="1-5" />
            <el-option label="6-20次" value="6-20" />
            <el-option label="20次以上" value="20+" />
          </el-select>
        </div>
        <div>
          <div class="text-sm text-gray-600 mb-2">操作</div>
          <el-button type="info" @click="resetFilters">重置筛选</el-button>
        </div>
      </div>
    </div>

    <!-- 用户表格 -->
    <el-card>
      <el-table
        :data="usersList"
        border
        style="width: 100%"
        v-loading="loading"
        :empty-text="loading ? '加载中...' : '暂无数据'"
      >
        <el-table-column label="用户信息" min-width="220">
          <template #default="{ row }">
            <div class="flex items-center">
              <el-avatar :size="40" :src="row.avatar">
                {{ row.nickname?.[0] || row.username?.[0] || 'U' }}
              </el-avatar>
              <div class="ml-3">
                <div class="font-medium">{{ row.nickname || row.username }}</div>
                <div class="text-gray-500 text-sm">{{ row.email }}</div>
              </div>
            </div>
          </template>
        </el-table-column>
        
        <el-table-column prop="phone" label="手机号" width="140" />
        
        <el-table-column label="注册时间" width="180">
          <template #default="{ row }">
            {{ formatDate(row.createdAt) }}
          </template>
        </el-table-column>
        
        <el-table-column prop="totalRentals" label="租赁次数" width="100" align="center" />
        
        <el-table-column prop="balance" label="余额" width="120" align="center">
          <template #default="{ row }">
            ¥{{ row.balance || 0 }}
          </template>
        </el-table-column>
        
        <el-table-column label="状态" width="120" align="center">
          <template #default="{ row }">
            <el-tag :type="row.status === 'active' ? 'success' : 'danger'">
              {{ row.status === 'active' ? '正常' : '禁用' }}
            </el-tag>
          </template>
        </el-table-column>
        
        <el-table-column label="操作" width="240" fixed="right">
          <template #default="{ row }">
            <el-button 
              type="primary" 
              link
              @click="handleEdit(row)"
            >
              编辑
            </el-button>
            <el-button 
              type="primary" 
              link
              @click="handleViewDetails(row)"
            >
              详情
            </el-button>
            <el-button 
              :type="row.status === 'active' ? 'danger' : 'success'" 
              link
              @click="handleToggleStatus(row)"
            >
              {{ row.status === 'active' ? '禁用' : '启用' }}
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
          :total="total"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>

    <!-- 添加/编辑用户对话框 -->
    <el-dialog
      v-model="showUserDialog"
      :title="isEditing ? '编辑用户' : '添加用户'"
      width="500px"
    >
      <el-form
        ref="userFormRef"
        :model="userForm"
        :rules="userFormRules"
        label-width="80px"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="userForm.username" :disabled="isEditing" />
        </el-form-item>
        
        <el-form-item label="昵称" prop="nickname">
          <el-input v-model="userForm.nickname" />
        </el-form-item>
        
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="userForm.phone" />
        </el-form-item>
        
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="userForm.email" />
        </el-form-item>
        
        <el-form-item label="密码" prop="password" v-if="!isEditing">
          <el-input v-model="userForm.password" type="password" show-password />
        </el-form-item>
        
        <el-form-item label="状态" prop="status">
          <el-select v-model="userForm.status" placeholder="请选择状态" class="w-full">
            <el-option label="正常" value="active" />
            <el-option label="禁用" value="disabled" />
          </el-select>
        </el-form-item>
        
        <el-form-item label="余额" prop="balance">
          <el-input-number v-model="userForm.balance" :min="0" :precision="2" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="showUserDialog = false">取消</el-button>
          <el-button type="primary" @click="submitUserForm" :loading="submitting">
            确认
          </el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 用户详情对话框 -->
    <el-dialog
      v-model="showDetailsDialog"
      title="用户详情"
      width="700px"
    >
      <el-descriptions :column="2" border>
        <el-descriptions-item label="用户ID">{{ selectedUser.id }}</el-descriptions-item>
        <el-descriptions-item label="用户名">{{ selectedUser.username }}</el-descriptions-item>
        <el-descriptions-item label="昵称">{{ selectedUser.nickname }}</el-descriptions-item>
        <el-descriptions-item label="手机号">{{ selectedUser.phone }}</el-descriptions-item>
        <el-descriptions-item label="邮箱">{{ selectedUser.email }}</el-descriptions-item>
        <el-descriptions-item label="余额">¥{{ selectedUser.balance || 0 }}</el-descriptions-item>
        <el-descriptions-item label="状态">
          <el-tag :type="selectedUser.status === 'active' ? 'success' : 'danger'">
            {{ selectedUser.status === 'active' ? '正常' : '禁用' }}
          </el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="注册时间">{{ formatDate(selectedUser.createdAt) }}</el-descriptions-item>
        <el-descriptions-item label="最近登录" :span="2">{{ formatDate(selectedUser.lastLoginAt) }}</el-descriptions-item>
      </el-descriptions>
      
      <el-divider>租赁历史</el-divider>
      
      <el-table
        :data="userRentals"
        style="width: 100%"
        :max-height="300"
        v-loading="loadingRentals"
      >
        <el-table-column prop="scooterCode" label="滑板车编号" width="120" />
        <el-table-column label="开始时间" width="180">
          <template #default="{ row }">
            {{ formatDate(row.startTime) }}
          </template>
        </el-table-column>
        <el-table-column label="结束时间" width="180">
          <template #default="{ row }">
            {{ formatDate(row.endTime) }}
          </template>
        </el-table-column>
        <el-table-column prop="duration" label="使用时长">
          <template #default="{ row }">
            {{ formatDuration(row.duration) }}
          </template>
        </el-table-column>
        <el-table-column prop="amount" label="费用" width="120">
          <template #default="{ row }">
            ¥{{ row.amount }}
          </template>
        </el-table-column>
      </el-table>
      
      <div v-if="userRentals.length === 0 && !loadingRentals" class="text-center py-4 text-gray-500">
        该用户暂无租赁记录
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useAdminStore } from '@/stores/admin'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Search } from '@element-plus/icons-vue'

const adminStore = useAdminStore()

// 用户列表
const usersList = ref([])
const loading = ref(false)
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)

// 搜索和筛选
const searchQuery = ref('')
const filters = reactive({
  status: '',
  dateRange: null,
  rentals: ''
})

// 添加/编辑用户
const showAddUserDialog = ref(false)
const showUserDialog = ref(false)
const isEditing = ref(false)
const userFormRef = ref(null)
const submitting = ref(false)
const userForm = reactive({
  id: '',
  username: '',
  nickname: '',
  phone: '',
  email: '',
  password: '',
  status: 'active',
  balance: 0
})

// 表单验证规则
const userFormRules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
  ],
  nickname: [
    { max: 20, message: '长度不能超过 20 个字符', trigger: 'blur' }
  ],
  phone: [
    { pattern: /^1[3-9]\d{9}$/, message: '请输入有效的手机号码', trigger: 'blur' }
  ],
  email: [
    { type: 'email', message: '请输入有效的邮箱地址', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur', validator: (rule, value, callback) => {
      if (!isEditing.value && !value) {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }},
    { min: 6, message: '密码长度不能少于 6 个字符', trigger: 'blur', validator: (rule, value, callback) => {
      if (value && value.length < 6) {
        callback(new Error('密码长度不能少于 6 个字符'))
      } else {
        callback()
      }
    }}
  ],
  status: [
    { required: true, message: '请选择状态', trigger: 'change' }
  ]
}

// 用户详情
const showDetailsDialog = ref(false)
const selectedUser = ref({})
const userRentals = ref([])
const loadingRentals = ref(false)

// 获取用户列表
const fetchUsers = async (page = currentPage.value) => {
  loading.value = true
  currentPage.value = page
  
  try {
    const params = {
      page: currentPage.value,
      pageSize: pageSize.value,
      q: searchQuery.value,
      status: filters.status
    }
    
    if (filters.dateRange && filters.dateRange.length === 2) {
      params.startDate = filters.dateRange[0]
      params.endDate = filters.dateRange[1]
    }
    
    if (filters.rentals) {
      params.rentals = filters.rentals
    }
    
    const result = await adminStore.fetchUsers(params)
    if (result.success) {
      usersList.value = adminStore.usersList.items || []
      total.value = adminStore.usersList.total || 0
    } else {
      ElMessage.error(result.message)
    }
  } catch (error) {
    ElMessage.error('获取用户列表失败')
  } finally {
    loading.value = false
  }
}

// 搜索用户
const handleSearch = () => {
  fetchUsers(1)
}

// 重置筛选条件
const resetFilters = () => {
  searchQuery.value = ''
  filters.status = ''
  filters.dateRange = null
  filters.rentals = ''
  fetchUsers(1)
}

// 处理分页变化
const handleSizeChange = (size) => {
  pageSize.value = size
  fetchUsers(1)
}

const handleCurrentChange = (page) => {
  fetchUsers(page)
}

// 编辑用户
const handleEdit = (user) => {
  isEditing.value = true
  Object.assign(userForm, {
    id: user.id,
    username: user.username,
    nickname: user.nickname,
    phone: user.phone,
    email: user.email,
    status: user.status,
    balance: user.balance || 0,
    password: ''
  })
  showUserDialog.value = true
}

// 添加用户
const showAddUser = () => {
  isEditing.value = false
  Object.assign(userForm, {
    id: '',
    username: '',
    nickname: '',
    phone: '',
    email: '',
    password: '',
    status: 'active',
    balance: 0
  })
  showUserDialog.value = true
}

// 提交用户表单
const submitUserForm = async () => {
  if (!userFormRef.value) return
  
  await userFormRef.value.validate(async (valid, fields) => {
    if (valid) {
      submitting.value = true
      try {
        let result
        
        if (isEditing.value) {
          result = await adminStore.updateUser(userForm.id, {
            nickname: userForm.nickname,
            phone: userForm.phone,
            email: userForm.email,
            status: userForm.status,
            balance: userForm.balance,
            password: userForm.password || undefined
          })
        } else {
          result = await adminStore.createUser({
            username: userForm.username,
            nickname: userForm.nickname,
            phone: userForm.phone,
            email: userForm.email,
            password: userForm.password,
            status: userForm.status,
            balance: userForm.balance
          })
        }
        
        if (result.success) {
          ElMessage.success(isEditing.value ? '更新成功' : '添加成功')
          showUserDialog.value = false
          fetchUsers()
        } else {
          ElMessage.error(result.message)
        }
      } catch (error) {
        ElMessage.error(isEditing.value ? '更新失败' : '添加失败')
      } finally {
        submitting.value = false
      }
    }
  })
}

// 查看用户详情
const handleViewDetails = async (user) => {
  selectedUser.value = { ...user }
  showDetailsDialog.value = true
  
  // 获取用户租赁历史
  loadingRentals.value = true
  try {
    const response = await fetch(`/api/admin/users/${user.id}/rentals`)
    if (response.ok) {
      userRentals.value = await response.json()
    } else {
      throw new Error('获取用户租赁历史失败')
    }
  } catch (error) {
    console.error(error)
    ElMessage.error(error.message || '获取用户租赁历史失败')
  } finally {
    loadingRentals.value = false
  }
}

// 切换用户状态
const handleToggleStatus = (user) => {
  const statusText = user.status === 'active' ? '禁用' : '启用'
  
  ElMessageBox.confirm(
    `确定要${statusText}用户 ${user.nickname || user.username} 吗？`,
    '确认操作',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }
  ).then(async () => {
    try {
      const newStatus = user.status === 'active' ? 'disabled' : 'active'
      const result = await adminStore.updateUser(user.id, { status: newStatus })
      
      if (result.success) {
        ElMessage.success(`${statusText}成功`)
        // 更新本地列表数据
        const index = usersList.value.findIndex(item => item.id === user.id)
        if (index !== -1) {
          usersList.value[index].status = newStatus
        }
      } else {
        ElMessage.error(result.message)
      }
    } catch (error) {
      ElMessage.error(`${statusText}失败`)
    }
  }).catch(() => {
    // 取消操作
  })
}

// 格式化日期
const formatDate = (date) => {
  if (!date) return '-'
  return new Date(date).toLocaleString()
}

// 格式化时长
const formatDuration = (minutes) => {
  if (!minutes) return '-'
  
  if (minutes < 60) {
    return `${minutes}分钟`
  }
  
  const hours = Math.floor(minutes / 60)
  const remainMinutes = minutes % 60
  
  if (remainMinutes === 0) {
    return `${hours}小时`
  }
  
  return `${hours}小时${remainMinutes}分钟`
}

// 监听添加用户对话框
watch(showAddUserDialog, (val) => {
  if (val) {
    showAddUser()
  }
})

onMounted(() => {
  fetchUsers()
})
</script>

<style scoped>
/* 自定义样式 */
</style> 