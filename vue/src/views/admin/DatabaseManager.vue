<template>
  <div class="p-6">
    <div class="mb-6">
      <h1 class="text-2xl font-bold mb-2">优惠券管理</h1>
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
          prop="id"
          label="优惠券编号"
      >
      </el-table-column>
      <el-table-column
          prop="couponAmount"
          label="优惠券金额"
      >
      </el-table-column>
      <el-table-column
          prop="userId"
          label="所属用户编号"
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

const Delete = (row) => {
  form.value.couponId = row.id
  ElMessageBox.confirm('确定要删除这条消息吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(()=>{
    adminListApi.couponDelete(form.value).then(res => {
      ElMessage.success('成功')
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
