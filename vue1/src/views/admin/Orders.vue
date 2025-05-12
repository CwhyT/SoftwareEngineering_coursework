<template>
  <div class="p-6">
    <div class="mb-6">
      <h1 class="text-2xl font-bold mb-2">Order Management</h1>
    </div>
    <div>
      <el-button @click="search" style="color: white; margin: 10px">Query List</el-button>
    </div>
    <el-table
        :data="columns"
        border
        stripe
        style="width: 100%"
    >
      <el-table-column
          prop="orderId"
          label="Order ID"
      >
      </el-table-column>
      <el-table-column
          prop="status"
          label="Order Status"
      >
        <template #default="{row}">
          {{ getStatusString(row.status) }}
        </template>
      </el-table-column>
      <el-table-column
          prop="totalAmount"
          label="Rental Amount"
      >
      </el-table-column>
      <el-table-column
          prop="user.username"
          label="Renter"
      >
      </el-table-column>
      <!-- 操作列 -->
      <el-table-column label="Actions" width="150" fixed="right">
        <template #default="scope">
          <el-button-group>
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
function getStatusString(status, isChinese = true) {
  const statusMap = {
    created: isChinese ? 'Created' : 'Created',
    cancel: isChinese ? 'Canceled' : 'Canceled',
    close: isChinese ? 'Completed' : 'Completed'
  };

  // 处理未知状态
  return statusMap[status.toLowerCase()] ||
      (isChinese ? 'Unknown Status' : 'Unknown Status');
}

const Delete = (row) => {
  form.value.orderId = row.orderId
  ElMessageBox.confirm('Are you sure you want to delete this message?', 'Warning', {
    confirmButtonText: 'Confirm',
    cancelButtonText: 'Cancel',
    type: 'warning'
  }).then(()=>{
    adminListApi.orderDelete(form.value).then(res => {
      ElMessage.success('Success')
      dialogVisible.value =false
      search()
    })
  })
}
const search = () => {
  adminListApi.orderList().then(res => {
    columns.value = res
  })
}
onMounted(() => {
  search()
})

</script>

<style scoped>

</style>
