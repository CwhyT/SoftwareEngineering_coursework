<template>
  <div class="table-manager">
    <!-- 表标题和控制栏 -->
    <div class="flex justify-between items-center mb-4">
      <h3 class="text-lg font-semibold">{{ title }}</h3>
      <div class="flex gap-2">
        <el-button type="primary" size="small" @click="refreshData">
          <el-icon><Refresh /></el-icon> 刷新
        </el-button>
        <el-button type="success" size="small" @click="handleAdd">
          <el-icon><Plus /></el-icon> 添加
        </el-button>
      </div>
    </div>

    <!-- 搜索和过滤 -->
    <div class="flex flex-wrap gap-3 mb-4">
<!--      <el-input-->
<!--        v-model="searchQuery"-->
<!--        placeholder="搜索..."-->
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
        placeholder="筛选..."
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

    <!-- 数据表格 -->
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
          <!-- 自定义格式化显示字段 -->
          <span v-if="column.formatter">
            {{ column.formatter(scope.row[column.prop], scope.row) }}
          </span>
          <span v-else-if="column.type === 'datetime' && scope.row[column.prop]">
            {{ formatDateTime(scope.row[column.prop]) }}
          </span>
          <span v-else-if="column.type === 'boolean'">
            <el-tag :type="scope.row[column.prop] ? 'success' : 'info'">
              {{ scope.row[column.prop] ? '是' : '否' }}
            </el-tag>
          </span>
          <span v-else>
            {{ scope.row[column.prop] }}
          </span>
        </template>
      </el-table-column>

      <!-- 操作列 -->
      <el-table-column label="操作" width="150" fixed="right">
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

    <!-- 分页 -->
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

    <!-- 编辑/添加对话框 -->
    <el-dialog
      v-model="dialogVisible"
      :title="isEdit ? '编辑记录' : '添加记录'"
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
          <!-- 根据字段类型渲染不同的表单控件 -->
          <el-input
            v-if="field.type === 'text' || field.type === 'number'"
            v-model="form[field.prop]"
            :type="field.type === 'number' ? 'number' : 'text'"
            :placeholder="field.placeholder || '请输入' + field.label"
          />

          <el-select
            v-else-if="field.type === 'select'"
            v-model="form[field.prop]"
            :placeholder="field.placeholder || '请选择' + field.label"
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
            :placeholder="field.placeholder || '选择日期时间'"
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

    <!-- 删除确认对话框 -->
    <el-dialog
      v-model="deleteDialogVisible"
      title="确认删除"
      width="400px"
    >
      <p>确定要删除这条记录吗？此操作不可撤销。</p>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="deleteDialogVisible = false">取消</el-button>
          <el-button type="danger" @click="confirmDelete">确认删除</el-button>
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
  // 表名
  tableName: {
    type: String,
    required: true
  },
  // 表显示标题
  title: {
    type: String,
    required: true
  },
  // 表列定义
  columns: {
    type: Array,
    required: true
  },
  // 表单字段定义
  formFields: {
    type: Array,
    required: true
  },
  // 过滤选项
  filterOptions: {
    type: Array,
    default: () => []
  },
  // 自定义API前缀，默认使用通用的数据库API
  apiPrefix: {
    type: String,
    default: '/api/admin/db'
  }
});

const emit = defineEmits(['updated', 'added', 'deleted']);

// 表格数据状态
const tableData = ref([]);
const loading = ref(false);
const total = ref(0);
const currentPage = ref(1);
const pageSize = ref(20);
const searchQuery = ref('');
const filterValue = ref('');
const sortField = ref('');
const sortDirection = ref('');

// 对话框状态
const dialogVisible = ref(false);
const deleteDialogVisible = ref(false);
const isEdit = ref(false);
const form = ref({});
const formRef = ref(null);
const recordToDelete = ref(null);

// 初始加载数据
onMounted(() => {
  loadData();
});

// 监听分页和筛选变化
watch([currentPage, pageSize, searchQuery, filterValue], () => {
  loadData();
});

// 加载表格数据
const loadData = async () => {
  loading.value = true;
  try {
    // 构建过滤条件
    let filter = {};
    if (searchQuery.value) {
      // 在每个可搜索列中查找匹配
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

    // 构建排序
    let order = {};
    if (sortField.value) {
      order = {
        field: sortField.value,
        direction: sortDirection.value
      };
    }

    // 调用API获取数据
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
      ElMessage.error('加载数据失败');
    }
  } catch (error) {
    console.error('加载数据失败:', error);
    ElMessage.error('加载数据失败: ' + error.message);
  } finally {
    loading.value = false;
  }
};

// 处理分页和过滤事件
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

// 刷新数据
const refreshData = () => {
  loadData();
};

// 格式化日期时间
const formatDateTime = (dateStr) => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleString('zh-CN');
};

// 添加和编辑记录
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
      // 更新记录
      const url = `${props.apiPrefix}/table/${props.tableName}/record/${form.value.id}`;
      const response = await axios.put(url, form.value);

      if (response.data.success) {
        ElMessage.success('记录更新成功');
        dialogVisible.value = false;
        loadData();
        emit('updated', form.value);
      } else {
        ElMessage.error('更新失败: ' + response.data.message);
      }
    } else {
      // 添加记录
      const url = `${props.apiPrefix}/table/${props.tableName}/record`;
      const response = await axios.post(url, form.value);

      if (response.data.success) {
        ElMessage.success('记录添加成功');
        dialogVisible.value = false;
        loadData();
        emit('added', response.data.data);
      } else {
        ElMessage.error('添加失败: ' + response.data.message);
      }
    }
  } catch (error) {
    console.error(isEdit.value ? '更新记录失败:' : '添加记录失败:', error);
    ElMessage.error((isEdit.value ? '更新' : '添加') + '失败: ' + error.message);
  }
};

// 删除记录
const handleDelete = (row) => {
  recordToDelete.value = row;
  deleteDialogVisible.value = true;
};

const confirmDelete = async () => {
  if (!recordToDelete.value || !recordToDelete.value.id) {
    ElMessage.error('删除记录ID无效');
    return;
  }

  try {
    const url = `${props.apiPrefix}/table/${props.tableName}/record/${recordToDelete.value.id}`;
    const response = await axios.delete(url);

    if (response.data.success) {
      ElMessage.success('记录删除成功');
      deleteDialogVisible.value = false;
      loadData();
      emit('deleted', recordToDelete.value);
    } else {
      ElMessage.error('删除失败: ' + response.data.message);
    }
  } catch (error) {
    console.error('删除记录失败:', error);
    ElMessage.error('删除失败: ' + error.message);
  }
};
</script>
