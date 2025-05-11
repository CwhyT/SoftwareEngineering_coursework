<template>
  <div class="scooters-page">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">滑板车管理</h1>
      <el-button type="primary" @click="showAddDialog = true">
        <el-icon class="mr-1"><Plus /></el-icon>
        添加滑板车
      </el-button>
    </div>

    <!-- 搜索和筛选 -->
    <div class="bg-white p-4 rounded-lg shadow mb-6">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <el-input
          v-model="searchQuery"
          placeholder="搜索滑板车编号"
          class="w-full"
        >
          <template #prefix>
            <el-icon><Search /></el-icon>
          </template>
        </el-input>
        
        <el-select v-model="statusFilter" placeholder="状态筛选" class="w-full">
          <el-option label="全部" value="" />
          <el-option label="在线" value="online" />
          <el-option label="使用中" value="in_use" />
          <el-option label="维护中" value="maintenance" />
          <el-option label="离线" value="offline" />
        </el-select>
        
        <el-select v-model="locationFilter" placeholder="位置筛选" class="w-full">
          <el-option label="全部" value="" />
          <el-option label="A区" value="A" />
          <el-option label="B区" value="B" />
          <el-option label="C区" value="C" />
        </el-select>
      </div>
    </div>

    <!-- 滑板车列表 -->
    <el-card shadow="hover">
      <el-table :data="filteredScooters" style="width: 100%">
        <el-table-column prop="id" label="编号" width="120">
          <template #default="{ row }">
            <span class="mr-1">🛴</span>
            {{ row.id }}
          </template>
        </el-table-column>
        <el-table-column prop="location" label="位置" width="120" />
        <el-table-column prop="battery" label="电量" width="120">
          <template #default="{ row }">
            <el-progress 
              :percentage="row.battery" 
              :status="row.battery < 20 ? 'exception' : row.battery < 50 ? 'warning' : 'success'"
            />
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" width="120">
          <template #default="{ row }">
            <el-tag :type="getStatusType(row.status)">
              {{ getStatusText(row.status) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="lastMaintenance" label="最后维护" width="180" />
        <el-table-column prop="totalRides" label="总使用次数" width="120" />
        <el-table-column label="操作" width="200">
          <template #default="{ row }">
            <el-button-group>
              <el-button size="small" @click="handleEdit(row)">
                编辑
              </el-button>
              <el-button 
                size="small" 
                type="warning" 
                @click="handleMaintenance(row)"
              >
                维护
              </el-button>
              <el-button 
                size="small" 
                type="danger" 
                @click="handleDelete(row)"
              >
                删除
              </el-button>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <div class="flex justify-end mt-4">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 50, 100]"
          :total="total"
          layout="total, sizes, prev, pager, next"
        />
      </div>
    </el-card>

    <!-- 添加/编辑滑板车对话框 -->
    <el-dialog
      v-model="showAddDialog"
      :title="editingScooter ? '编辑滑板车' : '添加滑板车'"
      width="500px"
    >
      <el-form
        ref="formRef"
        :model="scooterForm"
        :rules="rules"
        label-width="100px"
      >
        <el-form-item label="编号" prop="id">
          <el-input v-model="scooterForm.id" placeholder="请输入滑板车编号" />
        </el-form-item>
        <el-form-item label="位置" prop="location">
          <el-select v-model="scooterForm.location" placeholder="请选择位置">
            <el-option label="A区" value="A" />
            <el-option label="B区" value="B" />
            <el-option label="C区" value="C" />
          </el-select>
        </el-form-item>
        <el-form-item label="电量" prop="battery">
          <el-input-number 
            v-model="scooterForm.battery" 
            :min="0" 
            :max="100"
            :step="10"
          />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="scooterForm.status" placeholder="请选择状态">
            <el-option label="在线" value="online" />
            <el-option label="使用中" value="in_use" />
            <el-option label="维护中" value="maintenance" />
            <el-option label="离线" value="offline" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="showAddDialog = false">取消</el-button>
          <el-button type="primary" @click="handleSubmit">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Plus, Search } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'

// 搜索和筛选
const searchQuery = ref('')
const statusFilter = ref('')
const locationFilter = ref('')
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(100)

// 表单相关
const showAddDialog = ref(false)
const editingScooter = ref(null)
const formRef = ref(null)
const scooterForm = ref({
  id: '',
  location: '',
  battery: 100,
  status: 'online'
})

const rules = {
  id: [
    { required: true, message: '请输入滑板车编号', trigger: 'blur' },
    { pattern: /^[A-Z]\d{4}$/, message: '编号格式为字母+4位数字', trigger: 'blur' }
  ],
  location: [
    { required: true, message: '请选择位置', trigger: 'change' }
  ],
  status: [
    { required: true, message: '请选择状态', trigger: 'change' }
  ]
}

// 模拟数据
const scooters = ref([
  {
    id: 'A0001',
    location: 'A区',
    battery: 85,
    status: 'online',
    lastMaintenance: '2024-03-19 14:30:00',
    totalRides: 156
  },
  {
    id: 'B0002',
    location: 'B区',
    battery: 45,
    status: 'in_use',
    lastMaintenance: '2024-03-18 09:15:00',
    totalRides: 89
  },
  {
    id: 'C0003',
    location: 'C区',
    battery: 15,
    status: 'maintenance',
    lastMaintenance: '2024-03-20 10:00:00',
    totalRides: 234
  }
])

// 过滤后的滑板车列表
const filteredScooters = computed(() => {
  return scooters.value.filter(scooter => {
    const matchSearch = scooter.id.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchStatus = !statusFilter.value || scooter.status === statusFilter.value
    const matchLocation = !locationFilter.value || scooter.location === locationFilter.value
    return matchSearch && matchStatus && matchLocation
  })
})

// 状态相关方法
function getStatusType(status) {
  const types = {
    online: 'success',
    in_use: 'warning',
    maintenance: 'info',
    offline: 'danger'
  }
  return types[status] || 'info'
}

function getStatusText(status) {
  const texts = {
    online: '在线',
    in_use: '使用中',
    maintenance: '维护中',
    offline: '离线'
  }
  return texts[status] || status
}

// 操作方法
function handleEdit(row) {
  editingScooter.value = row
  scooterForm.value = { ...row }
  showAddDialog.value = true
}

function handleMaintenance(row) {
  ElMessageBox.confirm(
    `确定要将滑板车 ${row.id} 设置为维护状态吗？`,
    '确认维护',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }
  ).then(() => {
    row.status = 'maintenance'
    ElMessage.success('已设置为维护状态')
  })
}

function handleDelete(row) {
  ElMessageBox.confirm(
    `确定要删除滑板车 ${row.id} 吗？`,
    '确认删除',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'danger'
    }
  ).then(() => {
    const index = scooters.value.findIndex(s => s.id === row.id)
    if (index > -1) {
      scooters.value.splice(index, 1)
      ElMessage.success('删除成功')
    }
  })
}

async function handleSubmit() {
  if (!formRef.value) return
  
  await formRef.value.validate((valid) => {
    if (valid) {
      if (editingScooter.value) {
        // 更新现有滑板车
        const index = scooters.value.findIndex(s => s.id === editingScooter.value.id)
        if (index > -1) {
          scooters.value[index] = { ...scooterForm.value }
        }
      } else {
        // 添加新滑板车
        scooters.value.push({
          ...scooterForm.value,
          lastMaintenance: new Date().toLocaleString(),
          totalRides: 0
        })
      }
      
      showAddDialog.value = false
      editingScooter.value = null
      scooterForm.value = {
        id: '',
        location: '',
        battery: 100,
        status: 'online'
      }
      ElMessage.success(editingScooter.value ? '更新成功' : '添加成功')
    }
  })
}
</script>

<style scoped>
.scooters-page {
  padding: 20px;
}
</style> 