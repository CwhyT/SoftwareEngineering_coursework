<template>
  <div class="p-6">
    <div class="mb-6">
      <h1 class="text-2xl font-bold mb-2">User Management</h1>
    </div>
    <el-table
        :data="columns"
        border
        stripe
        style="width: 100%"
    >
      <el-table-column
          prop="username"
          label="Username"
      >
      </el-table-column>
      <el-table-column
          prop="totalOrders"
          label="Total Orders"
      >

      </el-table-column>
      <el-table-column
          prop="allTimerTotal"
          label="Total Order Time (h)"
      >
      </el-table-column>

      <el-table-column
          prop="email"
          label="Email"
      >
      </el-table-column>
      <el-table-column
          prop="phoneNumber"
          label="Phone"
      >
      </el-table-column>
      <el-table-column
          prop="birthDate"
          label="Birth Date"
      >
      </el-table-column>
      <el-table-column
          prop="money"
          label="Balance"
      >
      </el-table-column>
      <!-- 操作列 -->
      <el-table-column label="Actions" width="150" fixed="right">
        <template #default="scope">
          <el-button-group>
            <el-button
                style="color: white"
                size="small"
                @click="sendYHQ(scope.row)"
            >
              Issue Coupon
            </el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
        v-model="dialogVisible"
        title="Issue Coupon"
        width="600px"
    >
      <el-form
          ref="formRef"
          :model="form"
          label-width="120px"
          label-position="right"
      >
        <el-form-item
            label="Coupon Amount"
            :prop="form.coupon_amount"
        >
          <!-- 根据字段类型渲染不同的表单控件 -->
          <el-input
              v-model="form.coupon_amount"
              type="number"
              placeholder="Please enter coupon amount"
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
import {ElMessage} from "element-plus";

const columns = ref([])

const dialogVisible = ref(false)

const form = ref({coupon_amount: 0})
const currentId = ref(null)
const sendYHQ = (row) => {
  currentId.value = row.userId
  dialogVisible.value = true
}
const submitForm = () => {
  console.log(form.value)
  adminListApi.saveYHQ(form.value.coupon_amount,currentId.value).then(res => {
    if(res.success) {
      ElMessage.success('Coupon issued successfully')
    }
    dialogVisible.value =false
  })
}
onMounted(() => {
  adminListApi.userList().then(res => {
    columns.value = res
  })
})

</script>

<style scoped>

</style>
