<template>
  <div class="p-6">
    <div class="mb-6">
      <h1 class="text-2xl font-bold mb-2">订单管理</h1>
    </div>
    <div>
      <el-button @click="search" style="color: white; margin: 10px">查询列表</el-button>
    </div>
    <el-table
        :data="columns"
        border
        stripe
        style="width: 100%"
    >
      <el-table-column
          prop="orderId"
          label="订单编号"
      >
      </el-table-column>
      <el-table-column
          prop="status"
          label="订单状态"
      >
        <template #default="{row}">
          {{ getStatusString(row.status) }}
        </template>
      </el-table-column>
      <el-table-column
          prop="totalAmount"
          label="租用金额"
      >
      </el-table-column>
      <el-table-column
          prop="user.username"
          label="租用人"
      >
      </el-table-column>
      <!-- 操作列 -->
      <el-table-column label="操作" width="150" fixed="right">
        <template #default="scope">
          <el-button-group>
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
    created: isChinese ? '已创建' : 'Created',
    cancel: isChinese ? '已取消' : 'Canceled',
    close: isChinese ? '已完成' : 'Completed'
  };

  // 处理未知状态
  return statusMap[status.toLowerCase()] ||
      (isChinese ? '未知状态' : 'Unknown Status');
}

const Delete = (row) => {
  form.value.orderId = row.orderId
  ElMessageBox.confirm('确定要删除这条消息吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(()=>{
    adminListApi.orderDelete(form.value).then(res => {
      ElMessage.success('成功')
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
