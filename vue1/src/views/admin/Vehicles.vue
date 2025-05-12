<template>
  <div class="p-6">
    <div class="mb-6">
      <h1 class="text-2xl font-bold mb-2">Vehicle Management</h1>
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
          prop="scooterId"
          label="Vehicle ID"
      >
      </el-table-column>
      <el-table-column
          prop="store.manager"
          label="Store Manager"
          column-key="store.manager"
          :filters="columns1.map(i => {return {text:i.manager,value:i.manager}})"
          :filter-method="filterHandler"
      >
      </el-table-column>
      <el-table-column
          prop="pricePerHour"
          label="Price/Hour"
      >
      </el-table-column>
      <el-table-column
          prop="model"
          label="Vehicle Status"
      >
      </el-table-column>
      <el-table-column
          prop="mileage"
          label="Mileage/km"
      >
      </el-table-column>
      <el-table-column
          prop="deposit"
          label="Deposit/¥"
      >
      </el-table-column>
      <el-table-column prop="status" label="Status">
        <template #default="{ row }">
          <!-- Display different colored tags based on status -->
          <el-tag
              :type="getStatusTagType(row.status)"
              effect="dark"
          >
            {{ getStatusLabel(row.status) }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
          prop="batteryLevel"
          label="Battery/%"
      >
      </el-table-column>

      <!-- Action Column -->
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
        title="Vehicle Store"
        width="600px"
    >
      <el-form
          ref="formRef"
          :model="form"
          label-width="120px"
          label-position="right"
      >
        <el-form-item
            label="Store Manager"
        >
          <el-select
              v-model="form.storeId"
              placeholder="Store Manager"
          >
            <el-option
                v-for="item in columns1"
                :key="item.storeId"
                :label="item.manager"
                :value="item.storeId"
            />
          </el-select>
        </el-form-item>
        <el-form-item
            label="Price/Hour"
        >
          <el-input
              v-model="form.pricePerHour"
              placeholder="Price"
              type="number"
          />
        </el-form-item>
        <el-form-item
            label="Type"
        >
          <el-input
              v-model="form.model"
              placeholder="Type"
          />
        </el-form-item>
        <el-form-item
            label="Mileage/km"
        >
          <el-input
              v-model="form.mileage"
              placeholder="Mileage"
          />
        </el-form-item>
        <el-form-item
            label="Deposit/¥"
        >
          <el-input
              v-model="form.deposit"
              placeholder="Deposit"
          />
        </el-form-item>

        <el-form-item label="Status">
          <el-select
              v-model="form.status"
              placeholder="Please select status"
          >
            <el-option
                v-for="item in statusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item
            label="Battery/%"
        >
          <el-input
              v-model="form.batteryLevel"
              placeholder="Battery"
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
const columns1 = ref([])

const dialogVisible = ref(false)

// Status options
const statusOptions = [
  { value: 'in-use', label: 'Using' },
  { value: 'maintenance', label: 'Maintenance' },
  { value: 'available', label: 'Available' },
];

// Status label text mapping
const getStatusLabel = (status) => {
  const map = {
    'in-use': 'Using',
    'maintenance': 'Maintenance',
    'available': 'Available',
  };
  return map[status] || status;
};

// Status tag color mapping
const getStatusTagType = (status) => {
  const map = {
    'in-use': 'danger',  // Red (Using)
    'maintenance': 'warning', // Yellow (Maintenance)
    'available': 'success', // Green (Available)
  };
  return map[status] || '';
};

const form = ref({
  scooterId: null,
  storeId: null,
  pricePerHour: "",
  model:"",
  mileage:"",
  deposit:"",
  batteryLevel:"",
  status: ""
})

const Add = () => {
  form.value.scooterId = null
  form.value.pricePerHour = ""
  form.value.model = ""
  form.value.mileage = ""
  form.value.deposit = ""
  form.value.batteryLevel = ""
  form.value.storeId = null
  form.value.status = ""
  dialogVisible.value = true
}
const Edit = (row) => {
  form.value.scooterId = row.scooterId
  form.value.pricePerHour = row.pricePerHour
  form.value.model = row.model
  form.value.mileage = row.mileage
  form.value.deposit = row.deposit
  form.value.batteryLevel = row.batteryLevel
  form.value.storeId = row.storeId
  form.value.status =  row.status
  dialogVisible.value = true
}
const Delete = (row) => {
  form.value.scooterId = row.scooterId
  ElMessageBox.confirm('Are you sure you want to delete this message?', 'Warning', {
    confirmButtonText: 'OK',
    cancelButtonText: 'Cancel',
    type: 'warning'
  }).then(()=>{
    adminListApi.scootersDelete(form.value).then(res => {
      ElMessage.success('Success')
      dialogVisible.value =false
      search()
    })
  })

}
const search = () => {
  adminListApi.scootersList().then(res => {
    columns.value = res
  })
}
const searchStore = () => {
  adminListApi.storeList().then(res => {
    columns1.value = res
  })
}
const submitForm = () => {
  if(form.value.scooterId !== null) {
    adminListApi.scootersEdit(form.value).then(res => {
      ElMessage.success('Success')
      dialogVisible.value =false
      search()

    })
  } else {
    adminListApi.scootersAdd(form.value).then(res => {
      ElMessage.success('Success')
      dialogVisible.value =false
      search()

    })
  }

}
const filterHandler = (  value,
                         row,
                         column
) => {
  return row.store.manager === value
}
onMounted(() => {
  search()
  searchStore()
})

</script>

<style scoped>

</style>
