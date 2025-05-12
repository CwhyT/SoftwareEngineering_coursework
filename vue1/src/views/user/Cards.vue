<template>
  <div class="cards-page bg-gray-100 min-h-screen p-4">
    <!-- 页面标题和添加按钮 -->
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-2xl font-bold">My Bank Cards</h1>
      <el-button
          type="primary"
          class="bg-blue-500 text-white border-0 font-bold px-6 py-2 rounded-md"
          @click="showAddCardDialog"
      >
        <el-icon class="mr-1"><Plus /></el-icon>
        Add Bank Card
      </el-button>
    </div>

    <!-- 银行卡列表 -->
    <div class="space-y-4">
      <div v-if="cards.length === 0" class="text-center py-10 bg-white rounded-lg shadow">
        <el-icon size="48" class="text-gray-400 mb-4"><CreditCard /></el-icon>
        <h3 class="text-lg font-medium text-gray-500">No Bank Cards</h3>
        <p class="text-gray-400 mt-2">You haven't bound any bank cards yet</p>
        <el-button type="primary" class="mt-4" @click="showAddCardDialog">Add Bank Card</el-button>
      </div>

      <div v-for="(card, index) in cards" :key="index" class="card-item bg-white rounded-lg shadow overflow-hidden">
        <div class="p-5">
          <div class="flex justify-between items-center">
            <!-- 银行卡信息 -->
            <div class="flex items-center">
              <div class="mr-4">
                <el-icon size="40" :class="getCardIconClass(card.cardType)">
                  <CreditCard />
                </el-icon>
              </div>
              <div>
                <h3 class="text-lg font-medium">{{ card.cardType }}</h3>
                <p class="text-gray-500 text-sm mt-1">
                  {{ card.cardNumber }}
                </p>
              </div>
            </div>

            <!-- 操作按钮 -->
            <div>
              <el-button type="danger" size="small" @click="confirmDeleteCard(card.id)">
                Unbind
              </el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog
        v-model="addCardDialogVisible"
        title="Add Bank Card"
        width="500px"
    >
      <el-form
          ref="cardFormRef"
          :model="formData"
          label-width="100px"
          label-position="top"
      >
        <el-form-item label="Card Number">
          <el-input
              v-model="formData.cardNumber"
              placeholder="Please enter card number"
              maxlength="19"
          />
        </el-form-item>

        <el-form-item label="Card Type">
          <el-select
              v-model="formData.cardType"
              placeholder="Please select card type"
              class="w-full"
          >
            <el-option label="Industrial and Commercial Bank of China" value="Industrial and Commercial Bank of China" />
            <el-option label="China Construction Bank" value="China Construction Bank" />
            <el-option label="Agricultural Bank of China" value="Agricultural Bank of China" />
            <el-option label="Bank of China" value="Bank of China" />
            <el-option label="Bank of Communications" value="Bank of Communications" />
            <el-option label="China Merchants Bank" value="China Merchants Bank" />
            <el-option label="Postal Savings Bank of China" value="Postal Savings Bank of China" />
            <el-option label="CITIC Bank" value="CITIC Bank" />
            <el-option label="China Everbright Bank" value="China Everbright Bank" />
            <el-option label="Hua Xia Bank" value="Hua Xia Bank" />
            <el-option label="China Minsheng Bank" value="China Minsheng Bank" />
            <el-option label="Guangdong Development Bank" value="Guangdong Development Bank" />
            <el-option label="Ping An Bank" value="Ping An Bank" />
            <el-option label="Industrial Bank" value="Industrial Bank" />
            <el-option label="Shanghai Pudong Development Bank" value="Shanghai Pudong Development Bank" />
            <el-option label="Hengfeng Bank" value="Hengfeng Bank" />
            <el-option label="Zhejiang Commercial Bank" value="Zhejiang Commercial Bank" />
            <el-option label="Bohai Bank" value="Bohai Bank" />
            <el-option label="Bank of Beijing" value="Bank of Beijing" />
            <el-option label="Bank of Shanghai" value="Bank of Shanghai" />
            <el-option label="Bank of Jiangsu" value="Bank of Jiangsu" />
            <el-option label="Bank of Nanjing" value="Bank of Nanjing" />
            <el-option label="Bank of Ningbo" value="Bank of Ningbo" />
            <el-option label="Bank of Hangzhou" value="Bank of Hangzhou" />
            <el-option label="Bank of Chengdu" value="Bank of Chengdu" />
            <el-option label="Bank of Chongqing" value="Bank of Chongqing" />
            <el-option label="Bank of Guangzhou" value="Bank of Guangzhou" />
            <el-option label="WeBank" value="WeBank" />
            <el-option label="MYbank" value="MYbank" />
          </el-select>
        </el-form-item>

        <el-form-item label="Cardholder Name">
          <el-input
              v-model="formData.cardholderName"
              placeholder="Please enter cardholder name"
          />
        </el-form-item>

        <el-form-item label="Billing Address">
          <el-input
              v-model="formData.billingAddress"
              placeholder="Please enter billing address"
          />
        </el-form-item>

        <el-form-item>
          <el-checkbox v-model="formData.saveForFuture">
            Securely save this card for one-click payment
          </el-checkbox>
        </el-form-item>
      </el-form>
      <!-- 对话框底部保持不变 -->
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="addCardDialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="submitCardForm">Confirm</el-button>
        </span>
      </template>
    </el-dialog>

  </div>
</template>

<script setup>
import {ref, onMounted, reactive} from 'vue';
import { CreditCard, Plus } from '@element-plus/icons-vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { userApi } from '@/api/user';
import {reverse} from "lodash-unified";
import {adminListApi} from "@/api/index.js";

// 银行卡列表数据
const cards = ref([]);

// 添加银行卡对话框相关
const addCardDialogVisible = ref(false);
const formData = reactive({
  cardNumber: '',
  cardType: '',
  cardholderName: '',
  billingAddress: '',
  saveForFuture: true
});


// 根据卡类型获取图标样式
const getCardIconClass = (cardType) => {
  switch (cardType) {
    case 'VISA':
      return 'text-blue-600';
    case 'MasterCard':
      return 'text-red-500';
    case 'UnionPay':
      return 'text-green-600';
    case 'American Express':
      return 'text-blue-800';
    default:
      return 'text-gray-600';
  }
};

// 显示添加银行卡对话框
const showAddCardDialog = () => {
  addCardDialogVisible.value = true;
  formData.cardNumber = ''
  formData.cardType =''
  formData.cardholderName =''
  formData.billingAddress = ''
  formData.saveForFuture = true
};

// 关闭对话框
const handleDialogClose = (done) => {
  ElMessageBox.confirm('Are you sure you want to close? Unsaved information will be lost', 'Tip', {
    confirmButtonText: 'Confirm',
    cancelButtonText: 'Cancel',
    type: 'warning'
  }).then(() => {
    done();
  }).catch(() => {});
};

// 提交银行卡表单
const submitCardForm = () => {
  // 这里应该有表单验证逻辑
  // 验证通过后调用API添加银行卡
  adminListApi.cardAdd(formData).then(res => {
    if (res.success) {
      ElMessage.success('Bank card added successfully');
      addCardDialogVisible.value = false;
      loadCards(); // 重新加载银行卡列表
    } else {
      ElMessage.error(res.message || 'Failed to add bank card');
    }
  }).catch(err => {
    ElMessage.error('Failed to add bank card: ' + err.message);
  });
};

// 确认删除银行卡
const confirmDeleteCard = (cardId) => {
  ElMessageBox.confirm('Are you sure you want to unbind this bank card?', 'Tip', {
    confirmButtonText: 'Confirm',
    cancelButtonText: 'Cancel',
    type: 'warning'
  }).then(() => {
    deleteCard(cardId);
  }).catch(() => {});
};

// 删除银行卡
const deleteCard = (cardId) => {
  adminListApi.cardDelete(cardId).then(res => {
    if (res.success) {
      ElMessage.success('Bank card unbound successfully');
      loadCards(); // 重新加载银行卡列表
    } else {
      ElMessage.error(res.message || 'Failed to unbind bank card');
    }
  }).catch(err => {
    ElMessage.error('Failed to unbind bank card: ' + err.message);
  });
};

// 加载银行卡列表
const loadCards = () => {
  adminListApi.cardList().then(res => {
    if (res.success) {
      cards.value = res.data || [];
    } else {
      ElMessage.error('Failed to get bank card list');
    }
  }).catch(err => {
    ElMessage.error('Failed to get bank card list: ' + err.message);
  });
};

onMounted(() => {
  loadCards();
});
</script>
