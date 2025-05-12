<template>
  <div class="p-6">
    <div class="mb-6">
      <h1 class="text-2xl font-bold mb-2">Coupon Management</h1>
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
          prop="id"
          label="Coupon ID"
      >
      </el-table-column>
      <el-table-column
          prop="couponAmount"
          label="Coupon Amount"
      >
      </el-table-column>
      <el-table-column
          prop="userId"
          label="User ID"
      >
      </el-table-column>
      <!-- Action Column -->
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

const Delete = (row) => {
  form.value.couponId = row.id
  ElMessageBox.confirm('Are you sure you want to delete this message?', 'Prompt', {
    confirmButtonText: 'Confirm',
    cancelButtonText: 'Cancel',
    type: 'warning'
  }).then(()=>{
    adminListApi.couponDelete(form.value).then(res => {
      ElMessage.success('Success')
      dialogVisible.value =false
      search()
    })
  })

}
const search = () => {
  adminListApi.couponList().then(res => {
    columns.value = res.data
  })
}
onMounted(() => {
  search()
})

</script>

<style scoped>

</style>
