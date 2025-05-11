<template>
  <div class="payment-page py-8">
    <div class="container mx-auto px-4 sm:px-6 md:px-8">
      <div class="max-w-4xl mx-auto">
        <h1 class="text-2xl font-bold text-gray-800 mb-8 text-center">账户充值</h1>

        <!-- 租车信息 -->
        <div v-if="isRentalPayment" class="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div class="p-6 md:p-8">
            <h2 class="text-lg font-semibold text-gray-800 mb-5">租车信息</h2>
            <div class="space-y-4">
              <div class="flex items-center">
                <span class="text-3xl mr-3">🛴</span>
                <div>
                  <h3 class="font-semibold">车辆 {{ scooterId }}</h3>
                  <p class="text-sm text-gray-500">电量: {{ battery }}%</p>
                </div>
              </div>
              <div class="bg-blue-50 p-4 rounded-lg">
                <h4 class="font-medium text-blue-800 mb-2">租车费用说明</h4>
                <ul class="text-sm text-blue-600 space-y-1">
                  <li>• 起步价：5元（含15分钟）</li>
                  <li>• 超时费用：2元/15分钟</li>
                  <li>• 押金：99元（可退）</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <!-- 充值金额选择 -->
        <div class="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div class="p-6 md:p-8">
            <h2 class="text-lg font-semibold text-gray-800 mb-5">选择充值金额</h2>

            <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div
                v-for="amount in amounts"
                :key="amount.value"
                class="amount-card border rounded-xl p-4 text-center cursor-pointer transition-all"
                :class="selectedAmount === amount.value ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'"
                @click="selectedAmount = amount.value"
              >
                <div class="text-xl font-bold text-gray-800">{{ amount.label }}</div>
                <div v-if="amount.bonus" class="text-xs text-emerald-500 mt-1">送{{ amount.bonus }}元</div>
              </div>

              <div class="amount-card border border-gray-200 rounded-xl p-4 text-center cursor-pointer hover:border-blue-300 transition-all">
                <div class="text-xl font-bold text-gray-800">其他金额</div>
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
              <p>说明：充值金额将直接计入您的账户余额，可用于租赁车。</p>
            </div>
          </div>
        </div>

        <!-- 支付方式选择 -->
<!--        <div class="bg-white rounded-xl shadow-md overflow-hidden mb-8">-->
<!--          <div class="p-6 md:p-8">-->
<!--            <h2 class="text-lg font-semibold text-gray-800 mb-5">选择支付方式</h2>-->
<!--            -->
<!--            &lt;!&ndash; 优惠券选择 &ndash;&gt;-->
<!--            <div class="mb-5 border-b border-gray-100 pb-5">-->
<!--              <div class="flex justify-between items-center mb-3">-->
<!--                <h3 class="text-md font-semibold text-gray-700">选择优惠券</h3>-->
<!--                <router-link to="/coupons" class="text-blue-600 text-sm flex items-center">-->
<!--                  我的优惠券-->
<!--                  <el-icon class="ml-1"><ArrowRight /></el-icon>-->
<!--                </router-link>-->
<!--              </div>-->
<!--              -->
<!--              <div v-if="availableCoupons.length > 0" class="space-y-3">-->
<!--                <div -->
<!--                  v-for="(coupon, index) in availableCoupons" -->
<!--                  :key="index"-->
<!--                  class="coupon-item border rounded-lg p-3 cursor-pointer transition-all flex items-center"-->
<!--                  :class="selectedCoupon === coupon.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'"-->
<!--                  @click="selectCoupon(coupon)"-->
<!--                >-->
<!--                  <div class="flex-shrink-0 w-16 h-16 rounded-lg mr-3 flex items-center justify-center" :class="coupon.type === '折扣券' ? 'bg-orange-100' : 'bg-blue-100'">-->
<!--                    <span class="text-lg font-bold" :class="coupon.type === '折扣券' ? 'text-orange-600' : 'text-blue-600'">{{ coupon.amount }}</span>-->
<!--                  </div>-->
<!--                  <div class="flex-1">-->
<!--                    <div class="font-medium text-gray-800">{{ coupon.title }}</div>-->
<!--                    <div class="text-xs text-gray-500">{{ coupon.condition }}</div>-->
<!--                    <div class="text-xs text-gray-500">有效期至: {{ coupon.expireDate }}</div>-->
<!--                  </div>-->
<!--                  <div class="ml-2">-->
<!--                    <el-icon v-if="selectedCoupon === coupon.id" color="#3b82f6" size="20"><Check /></el-icon>-->
<!--                  </div>-->
<!--                </div>-->
<!--              </div>-->
<!--              -->
<!--              <div v-else class="text-center py-4 border border-dashed border-gray-200 rounded-lg">-->
<!--                <el-icon size="24" class="text-gray-400 mb-2"><Money /></el-icon>-->
<!--                <p class="text-sm text-gray-500">暂无可用优惠券</p>-->
<!--                <router-link to="/coupons" class="text-blue-600 text-sm inline-block mt-1">-->
<!--                  前往领取优惠券-->
<!--                </router-link>-->
<!--              </div>-->
<!--            </div>-->
<!--            -->
<!--            <div class="space-y-4">-->
<!--              <div-->
<!--                v-for="method in paymentMethods"-->
<!--                :key="method.id"-->
<!--                class="payment-method-item border rounded-lg p-4 cursor-pointer transition-all flex items-center"-->
<!--                :class="selectedPaymentMethod === method.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'"-->
<!--                @click="selectedPaymentMethod = method.id"-->
<!--              >-->
<!--                <div class="payment-icon mr-4">-->
<!--                  <img :src="method.icon" :alt="method.name" class="h-8 w-8 object-contain">-->
<!--                </div>-->
<!--                <div class="flex-1">-->
<!--                  <div class="font-medium text-gray-800">{{ method.name }}</div>-->
<!--                </div>-->
<!--                <div class="ml-2">-->
<!--                  <el-icon v-if="selectedPaymentMethod === method.id" color="#3b82f6" size="20"><Check /></el-icon>-->
<!--                </div>-->
<!--              </div>-->
<!--            </div>-->
<!--            -->
<!--            &lt;!&ndash; 信用卡支付表单 &ndash;&gt;-->
<!--            <div v-if="selectedPaymentMethod === 'creditcard'" class="mt-6 border-t border-gray-100 pt-5">-->
<!--              <h3 class="text-md font-semibold text-gray-700 mb-4">信用卡信息</h3>-->
<!--              <el-form :model="creditCardForm" label-position="top">-->
<!--                <el-form-item label="卡号">-->
<!--                  <el-input v-model="creditCardForm.cardNumber" placeholder="请输入信用卡号" maxlength="19" />-->
<!--                </el-form-item>-->
<!--                <div class="grid grid-cols-2 gap-4">-->
<!--                  <el-form-item label="有效期">-->
<!--                    <el-input v-model="creditCardForm.expiry" placeholder="MM/YY" maxlength="5" />-->
<!--                  </el-form-item>-->
<!--                  <el-form-item label="CVV">-->
<!--                    <el-input v-model="creditCardForm.cvv" placeholder="123" maxlength="3" type="password" />-->
<!--                  </el-form-item>-->
<!--                </div>-->
<!--                <el-form-item label="持卡人姓名">-->
<!--                  <el-input v-model="creditCardForm.name" placeholder="请输入持卡人姓名" />-->
<!--                </el-form-item>-->
<!--              </el-form>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->

        <!-- 支付信息摘要 -->
        <div class="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div class="p-6 md:p-8">
            <h2 class="text-lg font-semibold text-gray-800 mb-5">订单信息</h2>

            <div class="space-y-4">
              <div class="flex justify-between py-2 border-b border-gray-100">
                <span class="text-gray-600">充值金额</span>
                <span class="font-medium text-gray-800">¥{{ selectedAmount.toFixed(2) }}</span>
              </div>

<!--              <div class="flex justify-between py-2 border-b border-gray-100">-->
<!--                <span class="text-gray-600">优惠券</span>-->
<!--                <span v-if="getSelectedCouponInfo" class="font-medium text-red-500">-->
<!--                  -¥{{ getCouponDiscount.toFixed(2) }}-->
<!--                </span>-->
<!--                <span v-else class="text-gray-400">未使用</span>-->
<!--              </div>-->

              <div class="flex justify-between py-2 border-b border-gray-100">
                <span class="text-gray-600">赠送金额</span>
                <span class="font-medium text-emerald-500">
                  +¥{{ getBonus(selectedAmount).toFixed(2) }}
                </span>
              </div>

              <div class="flex justify-between py-2">
                <span class="text-gray-600">实际到账</span>
                <span class="font-medium text-xl text-blue-600">
                  ¥{{ (selectedAmount - getCouponDiscount + getBonus(selectedAmount)).toFixed(2) }}
                </span>
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
            {{ isRentalPayment ? '支付押金开始用车' : '确认充值' }}
          </button>
        </div>

        <!-- 充值帮助 -->
        <div class="mt-8 text-sm text-gray-500 text-center space-y-2">
          <p>如遇到充值问题，请联系客服热线：<span class="text-blue-600">400-123-4567</span></p>
          <p>工作时间：9:00-21:00</p>
        </div>
      </div>
    </div>

    <!-- 支付成功弹窗 -->
    <el-dialog
      v-model="showSuccessDialog"
      :title="isRentalPayment ? '租车成功' : '充值成功'"
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
          {{ isRentalPayment ? '租车成功' : '充值成功' }}
        </h3>
        <template v-if="isRentalPayment">
          <p class="text-gray-600 mb-4">押金已支付，祝您用车愉快！</p>
          <div class="bg-gray-50 p-4 rounded-lg text-sm mb-6">
            <p class="font-medium mb-2">温馨提示：</p>
            <ul class="text-gray-600 space-y-1">
              <li>• 请遵守交通规则，注意安全</li>
              <li>• 还车时请停放在指定区域</li>
              <li>• 结束用车后将自动退还押金</li>
            </ul>
          </div>
        </template>
        <template v-else>
          <p class="text-gray-600 mb-4">您已成功充值 ¥{{ selectedAmount.toFixed(2) }}元</p>
          <p class="text-gray-600 mb-6">账户余额：¥{{ (accountBalance + selectedAmount + getBonus(selectedAmount)).toFixed(2) }}元</p>
        </template>
        <el-button type="primary" @click="handleSuccessClose">确定</el-button>
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

// 获取用户余额
async function fetchBalance() {
  try {
    console.log('获取账户余额，Token:', userStore.token);
    const response = await axios.get('/api/accounts/balance', {
      headers: {
        Authorization: `Bearer ${userStore.token}`
      }
    });

    if (response.data.success) {
      accountBalance.value = response.data.data.balance;
      console.log('获取到用户余额:', accountBalance.value);
    } else {
      console.error('获取余额失败:', response.data.message);
      ElMessage.error('获取余额失败');
    }
  } catch (error) {
    console.error('获取余额错误:', error);
    ElMessage.error('无法连接到服务器');
  }
}

// 选择的优惠券
const selectedCoupon = ref(null);

// 可用优惠券数据
const availableCoupons = ref([
  {
    id: 1,
    title: '新用户专享券',
    amount: '¥10',
    type: '无门槛抵用券',
    condition: '无使用门槛',
    expireDate: '2023-05-30',
  },
  {
    id: 2,
    title: '骑行折扣券',
    amount: '8折',
    type: '折扣券',
    condition: '满30元可用',
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

  if (coupon.type === '折扣券') {
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
  { id: 'wechat', name: '微信支付', icon: wechatIcon },
  { id: 'alipay', name: '支付宝', icon: alipayIcon },
  { id: 'unionpay', name: '银联支付', icon: unionpayIcon },
  { id: 'creditcard', name: '信用卡支付', icon: creditcardIcon }
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
    text: '处理支付中...',
    background: 'rgba(255, 255, 255, 0.8)'
  });
  const num = getBonus(selectedAmount.value) + selectedAmount.value
  adminListApi.recharge(num).then(res => {
      loading.close();
      if(res.success) {
        ElMessage.success('充值成功')
      }
  })

  // try {
  //   // 如果是信用卡支付，验证表单
  //   if (selectedPaymentMethod.value === 'creditcard') {
  //     if (!validateCreditCardForm()) {
  //       ElMessage({
  //         type: 'warning',
  //         message: '请填写完整的信用卡信息',
  //         duration: 1500
  //       });
  //       loading.close();
  //       return;
  //     }
  //   }
  //
  //   // 获取赠送金额
  //   const bonusAmount = getBonus(selectedAmount.value);
  //
  //   // 发送充值请求到后端API
  //   const response = await axios.post('/api/accounts/recharge', {
  //     amount: selectedAmount.value,
  //     paymentMethod: selectedPaymentMethod.value,
  //     bonusAmount: bonusAmount
  //   }, {
  //     headers: {
  //       Authorization: `Bearer ${userStore.token}`
  //     }
  //   });
  //
  //   if (response.data.success) {
  //     // 更新本地余额
  //     accountBalance.value = response.data.data.newBalance;
  //
  //   if (isRentalPayment.value) {
  //     // 更新本地存储中的租车状态
  //     const rentalInfo = {
  //       scooterId: scooterId.value,
  //       startTime: new Date().toISOString(),
  //       battery: battery.value,
  //       deposit: 99,
  //       status: 'active'
  //     };
  //     localStorage.setItem('currentRental', JSON.stringify(rentalInfo));
  //   }
  //
  //   loading.close();
  //   showSuccessDialog.value = true;
  //   } else {
  //     loading.close();
  //     ElMessage({
  //       type: 'error',
  //       message: response.data.message || '充值失败',
  //       duration: 1500
  //     });
  //   }
  // } catch (error) {
  //   loading.close();
  //   console.error('支付失败:', error);
  //   ElMessage({
  //     type: 'error',
  //     message: '支付失败，请重试',
  //     duration: 1500
  //   });
  // }
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
