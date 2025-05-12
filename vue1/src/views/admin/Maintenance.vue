<template>
  <div class="p-6">
    <div class="mb-6">
      <h1 class="text-2xl font-bold mb-2">Feedback Management</h1>
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
          label="Feedback ID"
      >
        <template #default="{row}">
          <span :style="{color: row.priority === 1 ? 'red' : 'black'}">{{row.id}}</span>
        </template>
      </el-table-column>
      <el-table-column
          prop="content"
          label="User Feedback"
      >
      </el-table-column>
      <el-table-column
          prop="email"
          label="User Email"
      >
      </el-table-column>
      <el-table-column
          prop="type"
          label="Feedback Type"
      >
      </el-table-column>
      <el-table-column
          prop="responseStatus"
          label="System Response"
      >
        <template #default="{row}">
          {{row.responseStatus ? 'Yes' : 'No'}}
        </template>
      </el-table-column>
      <el-table-column
          prop="responseContent"
          label="System Response Content"
          show-overflow-tooltip
      >
      </el-table-column>

      <!-- Action Column -->
      <el-table-column label="Actions" width="350" fixed="right">
        <template #default="scope">
          <el-button-group>
            <el-button
                v-if="scope.row.responseStatus === 0"
                style="color: white; margin: 0 5px"
                size="small"
                @click="sendYHQ(scope.row)"
            >
              Send Feedback Email
            </el-button>
            <el-button
                style="color: white;margin: 0 5px"
                size="small"
                @click="Delete(scope.row)"
            >
              Delete
            </el-button>
            <el-button v-if="scope.row.priority === 0 && scope.row.responseStatus === 0" @click="changePriority(scope.row,1)" style="color: white;" size="small">Set Priority</el-button>
            <el-button v-if="scope.row.priority === 1" @click="changePriority(scope.row,0)" style="color: white;" size="small">Remove Priority</el-button>

          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
        v-model="dialogVisible"
        title="Send Feedback Email"
        width="600px"
    >
      <el-form
          ref="formRef"
          :model="form"
          label-width="120px"
          label-position="right"
      >
        <el-form-item
            label="Email Content"
            :prop="form.responseContent"
        >
          <!-- Render different form controls based on field type -->
          <el-input
              v-model="form.responseContent"
              placeholder="Reply content"
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
    ElMessage.success('Feedback sent successfully')
    dialogVisible.value =false
    search()
  })
}

const changePriority = (row,type) => {
  adminListApi.feedbackEdit({
    id: row.id,
    priority: type
  }).then(res => {
    if(res.success){
      ElMessage.success('Modified successfully')
      search()
    }
  })
}


const Delete = (row) => {
  form.value.id = row.id
  ElMessageBox.confirm('Are you sure you want to delete this message?', 'Warning', {
    confirmButtonText: 'Confirm',
    cancelButtonText: 'Cancel',
    type: 'warning'
  }).then(()=>{
    adminListApi.feedbackDelete(form.value).then(res => {
      ElMessage.success('Success')
      dialogVisible.value =false
      search()
    })
  })

}
const search = () => {
  adminListApi.feedbackList().then(res => {
    columns.value = res.data.reverse()
  })
}
onMounted(() => {
  search()
})

</script>

<style scoped>

</style>
