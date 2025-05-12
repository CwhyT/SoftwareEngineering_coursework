<template>
  <div class="payment-page py-8">
    <div class="container mx-auto px-4 sm:px-6 md:px-8">
      <div class="max-w-4xl mx-auto">
        <h1 class="text-2xl font-bold text-gray-800 mb-8 text-center">Account Recharge</h1>

        <!-- 租车信息 -->
        <div v-if="isRentalPayment" class="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div class="p-6 md:p-8">
            <h2 class="text-lg font-semibold text-gray-800 mb-5">Rental Information</h2>
            <div class="space-y-4">
              <div class="flex items-center">
                <span class="text-3xl mr-3">🛴</span>
                <div>
                  <h3 class="font-semibold">Vehicle {{ scooterId }}</h3>
                  <p class="text-sm text-gray-500">Battery: {{ battery }}%</p>
                </div>
              </div>
              <div class="bg-blue-50 p-4 rounded-lg">
                <h4 class="font-medium text-blue-800 mb-2">Rental Fee Description</h4>
                <ul class="text-sm text-blue-600 space-y-1">
                  <li>• Base Price: ¥5 (includes 15 minutes)</li>
                  <li>• Overtime Fee: ¥2/15 minutes</li>
                  <li>• Deposit: ¥99 (refundable)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <!-- 充值金额选择 -->
        <div class="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div class="p-6 md:p-8">
            <h2 class="text-lg font-semibold text-gray-800 mb-5">Select Recharge Amount</h2>

            <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div
                v-for="amount in amounts"
                :key="amount.value"
                class="amount-card border rounded-xl p-4 text-center cursor-pointer transition-all"
                :class="selectedAmount === amount.value ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'"
                @click="selectedAmount = amount.value"
              >
                <div class="text-xl font-bold text-gray-800">{{ amount.label }}</div>
                <div v-if="amount.bonus" class="text-xs text-emerald-500 mt-1">Bonus: ¥{{ amount.bonus }}</div>
              </div>

              <div class="amount-card border border-gray-200 rounded-xl p-4 text-center cursor-pointer hover:border-blue-300 transition-all">
                <div class="text-xl font-bold text-gray-800">Other Amount</div>
                <div class="mt-2">
                  <el-input-number
                    v-model="customAmount"
                    :min="1"
                    :max="1000"
                    size="small"
                    @change="selectedAmount = customAmount"
                  />
                </div>
              </div>
            </div>

            <div class="mt-6 text-sm text-gray-500">
              <p>Note: The recharge amount will be directly added to your account balance and can be used for vehicle rental.</p>
            </div>
          </div>
        </div>

        <!-- 支付信息摘要 -->
        <div class="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div class="p-6 md:p-8">
            <h2 class="text-lg font-semibold text-gray-800 mb-5">Order Information</h2>

            <div class="space-y-4">
              <div class="flex justify-between py-2 border-b border-gray-100">
                <span class="text-gray-600">Recharge Amount</span>
                <span class="font-medium text-gray-800">¥{{ selectedAmount.toFixed(2) }}</span>
              </div>

              <div class="flex justify-between py-2 border-b border-gray-100">
                <span class="text-gray-600">Bonus Amount</span>
                <span class="font-medium text-emerald-500">
                  +¥{{ getBonus(selectedAmount).toFixed(2) }}
                </span>
              </div>

              <div class="flex justify-between py-2">
                <span class="text-gray-600">Actual Amount</span>
                <span class="font-medium text-xl text-blue-600">
                  ¥{{ (selectedAmount - getCouponDiscount + getBonus(selectedAmount)).toFixed(2) }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- 银行卡选择部分 -->
        <div class="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div class="p-6 md:p-8">
            <h2 class="text-lg font-semibold text-gray-800 mb-5">Payment Method</h2>
            <div class="bg-gray-50 rounded-xl p-4">
              <!-- 银行卡列表 -->
              <div v-if="paymentCards.length > 0" class="space-y-3">
                <div
                    v-for="card in paymentCards"
                    :key="card.id"
                    class="border rounded-lg p-3 cursor-pointer transition"
                    :class="selectedCardId === card.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-200'"
                    @click="selectedCardId = card.id"
                >
                  <div class="flex items-center">
                    <el-icon class="mr-3"  size="24">
                      <CreditCard />
                    </el-icon>
                    <div>
                      <div class="font-medium">{{ card.cardType }}</div>
                      <div class="text-sm text-gray-500 mt-1">
                        {{ card.cardNumber }}
                        <span class="mx-2">|</span>
                        {{ card.billingAddress }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 无银行卡提示 -->
              <div v-else class="text-center py-4 text-gray-500">
                <el-icon class="text-xl mb-2"><CreditCard /></el-icon>
                <div>No Bank Cards Available</div>
              </div>

              <!-- 添加新卡按钮 -->
              <div class="mt-3">
                <el-button
                    type="text"
                    class="w-full text-blue-500"
                    @click="selectedCardId = null"
                    style="color: white"
                >
                  Cancel Selection
                </el-button>
              </div>
            </div>
          </div>
        </div>

        <!-- 支付按钮 -->
        <div class="flex justify-center">
          <button
            @click="handlePayment"
            class="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg shadow-md transition-colors"
            :disabled="!selectedAmount || !selectedPaymentMethod"
          >
            {{ isRentalPayment ? 'Pay Deposit to Start' : 'Confirm Recharge' }}
          </button>
        </div>

        <!-- 充值帮助 -->
        <div class="mt-8 text-sm text-gray-500 text-center space-y-2">
          <p>For recharge issues, please contact customer service: <span class="text-blue-600">400-123-4567</span></p>
          <p>Working Hours: 9:00-21:00</p>
        </div>
      </div>
    </div>

    <!-- 支付成功弹窗 -->
    <el-dialog
      v-model="showSuccessDialog"
      :title="isRentalPayment ? 'Rental Successful' : 'Recharge Successful'"
      width="360px"
      center
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
    >
      <div class="text-center">
        <div class="success-icon mx-auto mb-4 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
          <el-icon size="32" color="#10b981"><Check /></el-icon>
        </div>
        <h3 class="text-lg font-semibold text-gray-800 mb-2">
          {{ isRentalPayment ? 'Rental Successful' : 'Recharge Successful' }}
        </h3>
        <template v-if="isRentalPayment">
          <p class="text-gray-600 mb-4">Deposit paid, enjoy your ride!</p>
          <div class="bg-gray-50 p-4 rounded-lg text-sm mb-6">
            <p class="font-medium mb-2">Reminder:</p>
            <ul class="text-gray-600 space-y-1">
              <li>• Please follow traffic rules and stay safe</li>
              <li>• Return the vehicle to designated areas</li>
              <li>• Deposit will be automatically refunded after use</li>
            </ul>
          </div>
        </template>
        <template v-else>
          <p class="text-gray-600 mb-4">You have successfully recharged ¥{{ selectedAmount.toFixed(2) }}</p>
          <p class="text-gray-600 mb-6">Account Balance: ¥{{ (accountBalance + selectedAmount + getBonus(selectedAmount)).toFixed(2) }}</p>
        </template>
        <el-button type="primary" @click="handleSuccessClose">Confirm</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { Check, ArrowRight, Money } from '@element-plus/icons-vue';
import { ElMessage, ElLoading } from 'element-plus';
import axios from 'axios';
import { useUserStore } from '@/stores/user';

// 导入支付图标
import wechatIcon from '@/assets/payment/wechat.png';
import alipayIcon from '@/assets/payment/alipay.png';
import unionpayIcon from '@/assets/payment/unionpay.png';
import creditcardIcon from '@/assets/payment/creditcard.png';
import {adminListApi} from "@/api/index.js";

const userStore = useUserStore();
const router = useRouter();
const route = useRoute();

// 获取路由参数
const scooterId = ref(route.query.scooterId || '');
const battery = ref(route.query.battery || 0);

// 判断是否是租车支付
const isRentalPayment = computed(() => !!scooterId.value);

// 使用真实API获取账户余额，不再使用硬编码值
const accountBalance = ref(0);

const paymentCards = ref([])
const selectedCardId = ref(null);

adminListApi.cardList().then(res => {
  if (res.success) {
    paymentCards.value = res.data || [];
  } else {
    ElMessage.error('Failed to get bank card list');
  }
}).catch(err => {
  ElMessage.error('Failed to get bank card list: ' + err.message);
});

// 获取用户余额
async function fetchBalance() {
  try {
    console.log('Getting account balance, Token:', userStore.token);
    const response = await axios.get('/api/accounts/balance', {
      headers: {
        Authorization: `Bearer ${userStore.token}`
      }
    });

    if (response.data.success) {
      accountBalance.value = response.data.data.balance;
      console.log('User balance retrieved:', accountBalance.value);
    } else {
      console.error('Failed to get balance:', response.data.message);
      ElMessage.error('Failed to get balance');
    }
  } catch (error) {
    console.error('Error getting balance:', error);
    ElMessage.error('Unable to connect to server');
  }
}

// 选择的优惠券
const selectedCoupon = ref(null);

// 可用优惠券数据
const availableCoupons = ref([
  {
    id: 1,
    title: 'New User Special',
    amount: '¥10',
    type: 'No Threshold Coupon',
    condition: 'No minimum spend required',
    expireDate: '2023-05-30',
  },
  {
    id: 2,
    title: 'Riding Discount',
    amount: '8折',
    type: 'Discount Coupon',
    condition: 'Minimum spend ¥30',
    expireDate: '2023-06-15',
  }
]);

// 选择优惠券
function selectCoupon(coupon) {
  if (selectedCoupon.value === coupon.id) {
    selectedCoupon.value = null;
  } else {
    selectedCoupon.value = coupon.id;
  }
}

// 获取已选优惠券
const getSelectedCouponInfo = computed(() => {
  if (!selectedCoupon.value) return null;
  return availableCoupons.value.find(c => c.id === selectedCoupon.value);
});

// 计算优惠金额
const getCouponDiscount = computed(() => {
  const coupon = getSelectedCouponInfo.value;
  if (!coupon) return 0;

  if (coupon.type === 'Discount Coupon') {
    const discount = parseFloat(coupon.amount) / 10;
    return selectedAmount.value * (1 - discount);
  } else {
    return parseFloat(coupon.amount.replace('¥', ''));
  }
});

// 充值金额选项
const amounts = [
  { value: 10, label: '¥10', bonus: 0 },
  { value: 20, label: '¥20', bonus: 2 },
  { value: 50, label: '¥50', bonus: 5 },
  { value: 100, label: '¥100', bonus: 15 },
  { value: 200, label: '¥200', bonus: 30 }
];

// 支付方式
const paymentMethods = [
  { id: 'wechat', name: 'WeChat Pay', icon: wechatIcon },
  { id: 'alipay', name: 'Alipay', icon: alipayIcon },
  { id: 'unionpay', name: 'UnionPay', icon: unionpayIcon },
  { id: 'creditcard', name: 'Credit Card', icon: creditcardIcon }
];

// 选中状态
const selectedAmount = ref(50);
const customAmount = ref(10);
const selectedPaymentMethod = ref('alipay');
const showSuccessDialog = ref(false);

// 信用卡表单
const creditCardForm = ref({
  cardNumber: '',
  expiry: '',
  cvv: '',
  name: ''
});

// 获取赠送金额
function getBonus(amount) {
  const selectedOption = amounts.find(item => item.value === amount);
  return selectedOption ? selectedOption.bonus : 0;
}

// 处理支付
async function handlePayment() {
  const loading = ElLoading.service({
    lock: true,
    text: 'Processing payment...',
    background: 'rgba(255, 255, 255, 0.8)'
  });
  const num = getBonus(selectedAmount.value) + selectedAmount.value
  adminListApi.recharge(num).then(res => {
      loading.close();
      if(res.success) {
        ElMessage.success('Recharge successful')
      }
  })
}

// 验证信用卡表单
function validateCreditCardForm() {
  const { cardNumber, expiry, cvv, name } = creditCardForm.value;
  return cardNumber && expiry && cvv && name;
}

// 关闭成功弹窗
function handleSuccessClose() {
  showSuccessDialog.value = false;
  if (isRentalPayment.value) {
    router.push('/profile'); // 跳转到个人中心
  } else {
    router.push('/rent'); // 充值后跳转到租车页面
  }
}

// 初始化
onMounted(() => {
  // 获取用户余额
  // fetchBalance();

  // 如果是租车支付但没有车辆信息，返回租车页面
  // if (isRentalPayment.value && !scooterId.value) {
  //   ElMessage({
  //     type: 'error',
  //     message: '未找到车辆信息',
  //     duration: 1500
  //   });
  //   router.push('/rent');
  // }
});
</script>

<style>
.amount-card {
  min-height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.payment-method-item:hover {
  box-shadow: 0 2px 12px 0 rgba(0,0,0,0.05);
}

.success-icon {
  box-shadow: 0 0 0 10px rgba(16, 185, 129, 0.1);
}
</style>
