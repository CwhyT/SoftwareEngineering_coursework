<template>
  <div class="table-manager">
    <!-- Table title and control bar -->
    <div class="flex justify-between items-center mb-4">
      <h3 class="text-lg font-semibold">{{ title }}</h3>
      <div class="flex gap-2">
        <el-button type="primary" size="small" @click="refreshData">
          <el-icon><Refresh /></el-icon> Refresh
        </el-button>
        <el-button type="success" size="small" @click="handleAdd">
          <el-icon><Plus /></el-icon> Add
        </el-button>
      </div>
    </div>

    <!-- Search and filter -->
    <div class="flex flex-wrap gap-3 mb-4">
<!--      <el-input-->
<!--        v-model="searchQuery"-->
<!--        placeholder="Search..."-->
<!--        class="w-64"-->
<!--        clearable-->
<!--        @change="handleSearch"-->
<!--      >-->
<!--        <template #prefix>-->
<!--          <el-icon><Search /></el-icon>-->
<!--        </template>-->
<!--      </el-input>-->

      <el-select
        v-if="filterOptions.length > 0"
        v-model="filterValue"
        placeholder="Filter..."
        class="w-40"
        clearable
        @change="handleFilter"
      >
        <el-option
          v-for="option in filterOptions"
          :key="option.value"
          :label="option.label"
          :value="option.value"
        />
      </el-select>
    </div>

    <!-- Data table -->
    <el-table
      v-loading="loading"
      :data="tableData"
      border
      stripe
      style="width: 100%"
      @sort-change="handleSortChange"
    >
      <el-table-column
        v-for="column in columns"
        :key="column.prop"
        :prop="column.prop"
        :label="column.label"
        :sortable="column.sortable"
        :width="column.width"
      >
        <template #default="scope">
          <!-- Custom formatted display field -->
          <span v-if="column.formatter">
            {{ column.formatter(scope.row[column.prop], scope.row) }}
          </span>
          <span v-else-if="column.type === 'datetime' && scope.row[column.prop]">
            {{ formatDateTime(scope.row[column.prop]) }}
          </span>
          <span v-else-if="column.type === 'boolean'">
            <el-tag :type="scope.row[column.prop] ? 'success' : 'info'">
              {{ scope.row[column.prop] ? 'Yes' : 'No' }}
            </el-tag>
          </span>
          <span v-else>
            {{ scope.row[column.prop] }}
          </span>
        </template>
      </el-table-column>

      <!-- Actions column -->
      <el-table-column label="Actions" width="150" fixed="right">
        <template #default="scope">
          <el-button-group>
            <el-button
              type="primary"
              size="small"
              @click="handleEdit(scope.row)"
              text
            >
              <el-icon><Edit /></el-icon>
            </el-button>
            <el-button
              type="danger"
              size="small"
              @click="handleDelete(scope.row)"
              text
            >
              <el-icon><Delete /></el-icon>
            </el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>

    <!-- Pagination -->
    <div class="flex justify-end mt-4">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 50, 100]"
        layout="total, sizes, prev, pager, next"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>

    <!-- Edit/Add dialog -->
    <el-dialog
      v-model="dialogVisible"
      :title="isEdit ? 'Edit Record' : 'Add Record'"
      width="600px"
    >
      <el-form
        ref="formRef"
        :model="form"
        label-width="120px"
        label-position="right"
      >
        <el-form-item
          v-for="field in formFields"
          :key="field.prop"
          :label="field.label"
          :prop="field.prop"
          :rules="field.rules"
        >
          <!-- Render different form controls based on field type -->
          <el-input
            v-if="field.type === 'text' || field.type === 'number'"
            v-model="form[field.prop]"
            :type="field.type === 'number' ? 'number' : 'text'"
            :placeholder="field.placeholder || 'Please enter ' + field.label"
          />

          <el-select
            v-else-if="field.type === 'select'"
            v-model="form[field.prop]"
            :placeholder="field.placeholder || 'Please select ' + field.label"
            style="width: 100%"
          >
            <el-option
              v-for="option in field.options"
              :key="option.value"
              :label="option.label"
              :value="option.value"
            />
          </el-select>

          <el-switch
            v-else-if="field.type === 'boolean'"
            v-model="form[field.prop]"
          />

          <el-date-picker
            v-else-if="field.type === 'datetime'"
            v-model="form[field.prop]"
            type="datetime"
            style="width: 100%"
            :placeholder="field.placeholder || 'Select date and time'"
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

    <!-- Delete confirmation dialog -->
    <el-dialog
      v-model="deleteDialogVisible"
      title="Confirm Delete"
      width="400px"
    >
      <p>Are you sure you want to delete this record? This action cannot be undone.</p>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="deleteDialogVisible = false">Cancel</el-button>
          <el-button type="danger" @click="confirmDelete">Confirm Delete</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import {
  Edit, Delete, Search, Plus, Refresh
} from '@element-plus/icons-vue';
import axios from 'axios';

const props = defineProps({
  // Table name
  tableName: {
    type: String,
    required: true
  },
  // Table display title
  title: {
    type: String,
    required: true
  },
  // Table column definition
  columns: {
    type: Array,
    required: true
  },
  // Table form field definition
  formFields: {
    type: Array,
    required: true
  },
  // Filter options
  filterOptions: {
    type: Array,
    default: () => []
  },
  // Custom API prefix, default to use common database API
  apiPrefix: {
    type: String,
    default: '/api/admin/db'
  }
});

const emit = defineEmits(['updated', 'added', 'deleted']);

// Table data state
const tableData = ref([]);
const loading = ref(false);
const total = ref(0);
const currentPage = ref(1);
const pageSize = ref(20);
const searchQuery = ref('');
const filterValue = ref('');
const sortField = ref('');
const sortDirection = ref('');

// Dialog state
const dialogVisible = ref(false);
const deleteDialogVisible = ref(false);
const isEdit = ref(false);
const form = ref({});
const formRef = ref(null);
const recordToDelete = ref(null);

// Initial load data
onMounted(() => {
  loadData();
});

// Listen for pagination and filter changes
watch([currentPage, pageSize, searchQuery, filterValue], () => {
  loadData();
});

// Load table data
const loadData = async () => {
  loading.value = true;
  try {
    // Build filter conditions
    let filter = {};
    if (searchQuery.value) {
      // Search in each searchable column
      const searchableColumns = props.columns.filter(col => col.searchable).map(col => col.prop);
      if (searchableColumns.length > 0) {
        searchableColumns.forEach(col => {
          filter[col] = searchQuery.value;
        });
      }
    }

    if (filterValue.value) {
      const [key, value] = filterValue.value.split(':');
      filter[key] = value;
    }

    // Build sort
    let order = {};
    if (sortField.value) {
      order = {
        field: sortField.value,
        direction: sortDirection.value
      };
    }

    // Call API to get data
    const url = `${props.apiPrefix}/table/${props.tableName}/data`;
    const response = await axios.get(url, {
      params: {
        page: currentPage.value,
        limit: pageSize.value,
        filter: Object.keys(filter).length > 0 ? JSON.stringify(filter) : undefined,
        order: Object.keys(order).length > 0 ? JSON.stringify(order) : undefined
      }
    });

    if (response.data.success) {
      tableData.value = response.data.data.rows;
      total.value = response.data.data.pagination.total;
    } else {
      ElMessage.error('Load data failed');
    }
  } catch (error) {
    console.error('Load data failed:', error);
    ElMessage.error('Load data failed: ' + error.message);
  } finally {
    loading.value = false;
  }
};

// Handle pagination and filter events
const handleSizeChange = (size) => {
  pageSize.value = size;
  currentPage.value = 1;
};

const handleCurrentChange = (page) => {
  currentPage.value = page;
};

const handleSearch = () => {
  currentPage.value = 1;
  loadData();
};

const handleFilter = () => {
  currentPage.value = 1;
  loadData();
};

const handleSortChange = ({ prop, order }) => {
  sortField.value = prop;
  sortDirection.value = order === 'ascending' ? 'asc' : 'desc';
  loadData();
};

// Refresh data
const refreshData = () => {
  loadData();
};

// Format date time
const formatDateTime = (dateStr) => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleString('zh-CN');
};

// Add and edit record
const handleAdd = () => {
  isEdit.value = false;
  form.value = {};
  dialogVisible.value = true;
};

const handleEdit = (row) => {
  isEdit.value = true;
  form.value = { ...row };
  dialogVisible.value = true;
};

const submitForm = async () => {
  try {
    if (formRef.value) {
      await formRef.value.validate();
    }

    if (isEdit.value) {
      // Update record
      const url = `${props.apiPrefix}/table/${props.tableName}/record/${form.value.id}`;
      const response = await axios.put(url, form.value);

      if (response.data.success) {
        ElMessage.success('Record updated successfully');
        dialogVisible.value = false;
        loadData();
        emit('updated', form.value);
      } else {
        ElMessage.error('Update failed: ' + response.data.message);
      }
    } else {
      // Add record
      const url = `${props.apiPrefix}/table/${props.tableName}/record`;
      const response = await axios.post(url, form.value);

      if (response.data.success) {
        ElMessage.success('Record added successfully');
        dialogVisible.value = false;
        loadData();
        emit('added', response.data.data);
      } else {
        ElMessage.error('Add failed: ' + response.data.message);
      }
    }
  } catch (error) {
    console.error(isEdit.value ? 'Update record failed:' : 'Add record failed:', error);
    ElMessage.error((isEdit.value ? 'Update' : 'Add') + ' failed: ' + error.message);
  }
};

// Delete record
const handleDelete = (row) => {
  recordToDelete.value = row;
  deleteDialogVisible.value = true;
};

const confirmDelete = async () => {
  if (!recordToDelete.value || !recordToDelete.value.id) {
    ElMessage.error('Invalid delete record ID');
    return;
  }

  try {
    const url = `${props.apiPrefix}/table/${props.tableName}/record/${recordToDelete.value.id}`;
    const response = await axios.delete(url);

    if (response.data.success) {
      ElMessage.success('Record deleted successfully');
      deleteDialogVisible.value = false;
      loadData();
      emit('deleted', recordToDelete.value);
    } else {
      ElMessage.error('Delete failed: ' + response.data.message);
    }
  } catch (error) {
    console.error('Delete record failed:', error);
    ElMessage.error('Delete failed: ' + error.message);
  }
};
</script>
