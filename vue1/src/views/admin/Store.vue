<template>
  <div class="p-6">
    <div class="mb-6">
      <h1 class="text-2xl font-bold mb-2">Store Management</h1>
    </div>
    <div>
      <el-button @click="Add" style="color: white; margin: 10px">Add New</el-button>
      <el-button @click="search" style="color: white; margin: 10px">Query List</el-button>
    </div>
    <el-table
        :data="columns"
        border
        stripe
        style="width: 100%"
    >
      <el-table-column
          prop="storeId"
          label="Store ID"
      >
      </el-table-column>
      <el-table-column
          prop="manager"
          label="Manager"
      >
      </el-table-column>
      <el-table-column
          prop="phone"
          label="Phone"
      >
      </el-table-column>
<!--      <el-table-column-->
<!--          prop="createdAt"-->
<!--          label="Created Time"-->
<!--      >-->
<!--      </el-table-column>-->
      <el-table-column
          prop="capacity"
          label="Capacity"
      >
      </el-table-column>
      <!-- 操作列 -->
      <el-table-column label="Actions" width="150" fixed="right">
        <template #default="scope">
          <el-button-group>
            <el-button
                style="color: white;margin: 0 5px"
                size="small"
                @click="Edit(scope.row)"
            >
              Edit
            </el-button>
            <el-button
                style="color: white"
                size="small"
                @click="Delete(scope.row)"
            >
              Delete
            </el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
        v-model="dialogVisible"
        title="Store"
        width="600px"
    >
      <el-form
          ref="formRef"
          :model="form"
          label-width="120px"
          label-position="right"
      >
        <el-form-item
            label="Manager"
        >
          <el-input
              v-model="form.manager"
              placeholder="Manager"
          />
        </el-form-item>
        <el-form-item
            label="Contact Phone"
        >
          <el-input
              v-model="form.phone"
              placeholder="Contact Phone"
          />
        </el-form-item>
        <el-form-item
            label="Capacity"
        >
          <el-input
              v-model="form.capacity"
              type="number"
              placeholder="Capacity"
          />
        </el-form-item>
      </el-form>

      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="submitForm">Confirm</el-button>
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
  ElMessageBox.confirm('Are you sure you want to delete this message?', 'Prompt', {
    confirmButtonText: 'Confirm',
    cancelButtonText: 'Cancel',
    type: 'warning'
  }).then(()=>{
    adminListApi.storeDelete(form.value).then(res => {
      ElMessage.success('Success')
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
      ElMessage.success('Success')
      dialogVisible.value =false
      search()

    })
  } else {
    adminListApi.storeAdd(form.value).then(res => {
      ElMessage.success('Success')
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
