<template>
  <div class="p-6">
    <div class="mb-6">
      <h1 class="text-2xl font-bold mb-2">车辆管理</h1>
    </div>
    <div>
      <el-button @click="Add" style="color: white; margin: 10px">新增列表</el-button>
      <el-button @click="search" style="color: white; margin: 10px">查询列表</el-button>
    </div>
    <el-table
        :data="columns"
        border
        stripe
        style="width: 100%"
    >
      <el-table-column
          prop="scooterId"
          label="车辆编号"
      >
      </el-table-column>
      <el-table-column
          prop="store.manager"
          label="所属店长"
          column-key="store.manager"
          :filters="columns1.map(i => {return {text:i.manager,value:i.manager}})"
          :filter-method="filterHandler"
      >
      </el-table-column>
      <el-table-column
          prop="pricePerHour"
          label="单价/h"
      >
      </el-table-column>
      <el-table-column
          prop="model"
          label="车辆状态"
      >
      </el-table-column>
      <el-table-column
          prop="mileage"
          label="里程/km"
      >
      </el-table-column>
      <el-table-column
          prop="deposit"
          label="押金/元"
      >
      </el-table-column>
      <el-table-column prop="status" label="状态">
        <template #default="{ row }">
          <!-- 根据状态显示不同颜色的标签 -->
          <el-tag
              :type="getStatusTagType(row.status)"
              effect="dark"
          >
            {{ getStatusLabel(row.status) }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
          prop="batteryLevel"
          label="电量/%"
      >
      </el-table-column>

      <!-- 操作列 -->
      <el-table-column label="操作" width="150" fixed="right">
        <template #default="scope">
          <el-button-group>
            <el-button
                style="color: white;margin: 0 5px"
                size="small"
                @click="Edit(scope.row)"
            >
              编辑
            </el-button>
            <el-button
                style="color: white"
                size="small"
                @click="Delete(scope.row)"
            >
              删除
            </el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
        v-model="dialogVisible"
        title="车店"
        width="600px"
    >
      <el-form
          ref="formRef"
          :model="form"
          label-width="120px"
          label-position="right"
      >
        <el-form-item
            label="所属店长"
        >
          <el-select
              v-model="form.storeId"
              placeholder="所属店长"
          >
            <el-option
                v-for="item in columns1"
                :key="item.storeId"
                :label="item.manager"
                :value="item.storeId"
            />
          </el-select>
        </el-form-item>
        <el-form-item
            label="单价/h"
        >
          <el-input
              v-model="form.pricePerHour"
              placeholder="单价"
              type="number"
          />
        </el-form-item>
        <el-form-item
            label="类型"
        >
          <el-input
              v-model="form.model"
              placeholder="类型"
          />
        </el-form-item>
        <el-form-item
            label="里程/km"
        >
          <el-input
              v-model="form.mileage"
              placeholder="里程"
          />
        </el-form-item>
        <el-form-item
            label="押金/元"
        >
          <el-input
              v-model="form.deposit"
              placeholder="押金"
          />
        </el-form-item>

        <el-form-item  label="状态">
          <el-select
              v-model="form.status"
              placeholder="请选择状态"
          >
            <el-option
                v-for="item in statusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item
            label="电量/%"
        >
          <el-input
              v-model="form.batteryLevel"
              placeholder="电量"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="submitForm">确定</el-button>
        </div>
      </template>
    </el-dialog>







  </div>
</template>

<script setup>
import {adminListApi} from "@/api/index.js";
import {onMounted, ref} from 'vue';
import {ElMessage, ElMessageBox} from "element-plus";

const columns = ref([])
const columns1 = ref([])

const dialogVisible = ref(false)

// 状态选项
const statusOptions = [
  { value: 'in-use', label: '使用中' },
  { value: 'maintenance', label: '维护中' },
  { value: 'available', label: '可使用' },
];

// 状态标签文本映射
const getStatusLabel = (status) => {
  const map = {
    'in-use': '使用中',
    'maintenance': '维护中',
    'available': '可使用',
  };
  return map[status] || status;
};

// 状态标签颜色映射
const getStatusTagType = (status) => {
  const map = {
    'in-use': 'danger',  // 红色（使用中）
    'maintenance': 'warning', // 黄色（维护中）
    'available': 'success', // 绿色（可使用）
  };
  return map[status] || '';
};

const form = ref({
  scooterId: null,
  storeId: null,
  pricePerHour: "",
  model:"",
  mileage:"",
  deposit:"",
  batteryLevel:"",
  status: ""
})

const Add = () => {
  form.value.scooterId = null
  form.value.pricePerHour = ""
  form.value.model = ""
  form.value.mileage = ""
  form.value.deposit = ""
  form.value.batteryLevel = ""
  form.value.storeId = null
  form.value.status = ""
  dialogVisible.value = true
}
const Edit = (row) => {
  form.value.scooterId = row.scooterId
  form.value.pricePerHour = row.pricePerHour
  form.value.model = row.model
  form.value.mileage = row.mileage
  form.value.deposit = row.deposit
  form.value.batteryLevel = row.batteryLevel
  form.value.storeId = row.storeId
  form.value.status =  row.status
  dialogVisible.value = true
}
const Delete = (row) => {
  form.value.scooterId = row.scooterId
  ElMessageBox.confirm('确定要删除这条消息吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(()=>{
    adminListApi.scootersDelete(form.value).then(res => {
      ElMessage.success('成功')
      dialogVisible.value =false
      search()
    })
  })

}
const search = () => {
  adminListApi.scootersList().then(res => {
    columns.value = res
  })
}
const searchStore = () => {
  adminListApi.storeList().then(res => {
    columns1.value = res
  })
}
const submitForm = () => {
  if(form.value.scooterId !== null) {
    adminListApi.scootersEdit(form.value).then(res => {
      ElMessage.success('成功')
      dialogVisible.value =false
      search()

    })
  } else {
    adminListApi.scootersAdd(form.value).then(res => {
      ElMessage.success('成功')
      dialogVisible.value =false
      search()

    })
  }

}
const filterHandler = (  value,
                         row,
                         column
) => {
  return row.store.manager === value
}
onMounted(() => {
  search()
  searchStore()
})

</script>

<style scoped>

</style>
