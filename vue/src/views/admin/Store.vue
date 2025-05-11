<template>
  <div class="p-6">
    <div class="mb-6">
      <h1 class="text-2xl font-bold mb-2">车店管理</h1>
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
          prop="storeId"
          label="车店Id"
      >
      </el-table-column>
      <el-table-column
          prop="manager"
          label="店长"
      >
      </el-table-column>
      <el-table-column
          prop="phone"
          label="电话"
      >
      </el-table-column>
<!--      <el-table-column-->
<!--          prop="createdAt"-->
<!--          label="创建时间"-->
<!--      >-->
<!--      </el-table-column>-->
      <el-table-column
          prop="capacity"
          label="容量"
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
            label="店长"
        >
          <el-input
              v-model="form.manager"
              placeholder="店长"
          />
        </el-form-item>
        <el-form-item
            label="联系电话"
        >
          <el-input
              v-model="form.phone"
              placeholder="联系电话"
          />
        </el-form-item>
        <el-form-item
            label="容量"
        >
          <el-input
              v-model="form.capacity"
              type="number"
              placeholder="容量"
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

const dialogVisible = ref(false)

const form = ref({
  capacity: 0,
  manager:"",
  phone:"",
  storeId: null,
})

const Add = () => {
  form.value.capacity = 0
  form.value.manager = ""
  form.value.phone = ""
  form.value.storeId = null
  dialogVisible.value = true
}
const Edit = (row) => {
  form.value.capacity = row.capacity
  form.value.manager = row.manager
  form.value.phone = row.phone
  form.value.storeId = row.storeId
  dialogVisible.value = true
}
const Delete = (row) => {
  form.value.storeId = row.storeId
  ElMessageBox.confirm('确定要删除这条消息吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(()=>{
    adminListApi.storeDelete(form.value).then(res => {
      ElMessage.success('成功')
      dialogVisible.value =false
      search()

    })
  })

}
const search = () => {
  adminListApi.storeList().then(res => {
    columns.value = res
  })
}
const submitForm = () => {
  if(form.value.storeId !== null) {
    adminListApi.storeEdit(form.value).then(res => {
      ElMessage.success('成功')
      dialogVisible.value =false
      search()

    })
  } else {
    adminListApi.storeAdd(form.value).then(res => {
      ElMessage.success('成功')
      dialogVisible.value =false
      search()

    })
  }

}
onMounted(() => {
  search()
})

</script>

<style scoped>

</style>
