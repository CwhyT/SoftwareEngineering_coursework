<template>
  <div class="p-6">
    <div class="mb-6">
      <h1 class="text-2xl font-bold mb-2">问题反馈管理</h1>
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
          label="反馈编号"
      >
      </el-table-column>
      <el-table-column
          prop="content"
          label="用户反馈内容"
      >
      </el-table-column>
      <el-table-column
          prop="email"
          label="用户邮箱"
      >
      </el-table-column>
      <el-table-column
          prop="type"
          label="反馈类型"
      >
      </el-table-column>
      <el-table-column
          prop="responseStatus"
          label="系统是否响应"
      >
        <template #default="{row}">
          {{row.responseStatus ? '是' : '否'}}
        </template>
      </el-table-column>
      <el-table-column
          prop="responseContent"
          label="系统响应内容"
      >
      </el-table-column>

      <!-- 操作列 -->
      <el-table-column label="操作" width="250" fixed="right">
        <template #default="scope">
          <el-button-group>
            <el-button
                style="color: white; margin: 0 5px"
                size="small"
                @click="sendYHQ(scope.row)"
            >
              发送反馈邮件
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
        title="发送反馈邮件"
        width="600px"
    >
      <el-form
          ref="formRef"
          :model="form"
          label-width="120px"
          label-position="right"
      >
        <el-form-item
            label="邮件信息"
            :prop="form.responseContent"
        >
          <!-- 根据字段类型渲染不同的表单控件 -->
          <el-input
              v-model="form.responseContent"
              placeholder="回复内容"
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

const form = ref({responseContent: ""})
const currentRow = ref({})
const sendYHQ = (row) => {
  dialogVisible.value = true
  currentRow.value = row
}
const submitForm = (row) => {
  currentRow.value.loginId = localStorage.getItem('loginId'),
  currentRow.value.message = form.value.responseContent
  currentRow.value.userFeedbackId = currentRow.value.id
  adminListApi.sendEmail(currentRow.value).then(res => {
    ElMessage.success('反馈成功')
    dialogVisible.value =false
    search()
  })
}


const Delete = (row) => {
  form.value.id = row.id
  ElMessageBox.confirm('确定要删除这条消息吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(()=>{
    adminListApi.feedbackDelete(form.value).then(res => {
      ElMessage.success('成功')
      dialogVisible.value =false
      search()
    })
  })

}
const search = () => {
  adminListApi.feedbackList().then(res => {
    columns.value = res.data
  })
}
onMounted(() => {
  search()
})

</script>

<style scoped>

</style>
