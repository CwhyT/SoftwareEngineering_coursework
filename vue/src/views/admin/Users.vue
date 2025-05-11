<template>
  <div class="p-6">
    <div class="mb-6">
      <h1 class="text-2xl font-bold mb-2">用户管理</h1>
    </div>
    <el-table
        :data="columns"
        border
        stripe
        style="width: 100%"
    >
      <el-table-column
          prop="username"
          label="用户名"
      >
      </el-table-column>
      <el-table-column
          prop="totalOrders"
          label="总下单数"
      >

      </el-table-column>
      <el-table-column
          prop="allTimerTotal"
          label="总下单时间/h"
      >
      </el-table-column>

      <el-table-column
          prop="email"
          label="邮箱"
      >
      </el-table-column>
      <el-table-column
          prop="phoneNumber"
          label="电话"
      >
      </el-table-column>
      <el-table-column
          prop="birthDate"
          label="生日"
      >
      </el-table-column>
      <el-table-column
          prop="money"
          label="用户余额"
      >
      </el-table-column>
      <!-- 操作列 -->
      <el-table-column label="操作" width="150" fixed="right">
        <template #default="scope">
          <el-button-group>
            <el-button
                style="color: white"
                size="small"
                @click="sendYHQ(scope.row)"
            >
              发放优惠卷
            </el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
        v-model="dialogVisible"
        title="发放优惠券"
        width="600px"
    >
      <el-form
          ref="formRef"
          :model="form"
          label-width="120px"
          label-position="right"
      >
        <el-form-item
            label="优惠券金额"
            :prop="form.coupon_amount"
        >
          <!-- 根据字段类型渲染不同的表单控件 -->
          <el-input
              v-model="form.coupon_amount"
              type="number"
              placeholder="请输入优惠券金额"
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
      ElMessage.success('发放成功')
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
