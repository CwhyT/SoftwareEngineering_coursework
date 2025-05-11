<template>
  <div class="coupons-page bg-gray-100 min-h-screen p-4">
    <!-- 页面标题 -->
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-2xl font-bold">我的优惠券</h1>
<!--      <el-button type="primary" class="bg-blue-500 text-white border-0 font-bold px-6 py-2 rounded-md" @click="showCouponCenter">-->
<!--        领取更多-->
<!--      </el-button>-->
    </div>

    <!-- 优惠券类型切换 -->
    <div class="bg-white rounded-lg shadow-sm mb-6">
      <div class="flex border-b">
        <div
          v-for="tab in tabs"
          :key="tab.value"
          @click="currentTab = tab.value"
          class="p-4 flex-1 text-center cursor-pointer transition-colors"
          :class="currentTab === tab.value ? 'text-blue-600 border-b-2 border-blue-500 font-medium' : 'text-gray-600'"
        >
          {{ tab.label }}
        </div>
      </div>
    </div>

    <!-- 优惠券列表 -->
    <div class="space-y-4">
      <div v-if="filteredCoupons.length === 0" class="text-center py-10 bg-white rounded-lg shadow">
        <el-icon size="48" class="text-gray-400 mb-4"><Money /></el-icon>
        <h3 class="text-lg font-medium text-gray-500">暂无优惠券</h3>
        <p class="text-gray-400 mt-2" v-if="currentTab === 'unused'">您还没有可用的优惠券</p>
        <p class="text-gray-400 mt-2" v-else-if="currentTab === 'used'">您还没有已使用的优惠券</p>
        <p class="text-gray-400 mt-2" v-else>您还没有已过期的优惠券</p>
        <el-button type="primary" class="mt-4" @click="showCouponCenter">去获取</el-button>
      </div>

      <div v-for="(coupon, index) in columns.filter(i => i.status && currentTab === 'used' || !i.status && currentTab === 'unused')" :key="index" class="coupon-card bg-white rounded-lg shadow overflow-hidden">
        <div class="relative">
          <!-- 左侧优惠券信息 -->
          <div class="flex">
            <div :class="`coupon-left p-4 w-2/5 flex flex-col justify-center ${coupon.status === 0 ? 'bg-blue-500' : 'bg-gray-400'}`">
              <div class="text-white">
                <div class="text-2xl font-bold">{{ coupon.couponAmount }}</div>
                <div class="text-sm opacity-80">无门槛优惠券</div>
              </div>
            </div>

            <!-- 右侧优惠券详情 -->
            <div class="coupon-right p-4 w-3/5">
              <h3 class="text-lg font-medium">{{ coupon.title }}</h3>
              <p class="text-xs text-gray-500 mt-1">{{ coupon.condition }}</p>
<!--              <p class="text-xs text-gray-500 mt-1">有效期至: {{ coupon.expireDate }}</p>-->

              <div class="mt-2" v-if="coupon.status === 0">
                <el-button size="small" type="primary" class="mt-2" @click="useCoupon(coupon)">立即使用</el-button>
              </div>
              <div class="mt-2" v-else-if="coupon.status">
                <span class="text-xs text-gray-500">已使用</span>
              </div>
              <div class="mt-2" v-else>
                <span class="text-xs text-gray-500">未使用</span>
              </div>
            </div>
          </div>

<!--          &lt;!&ndash; 优惠券状态水印 &ndash;&gt;-->
<!--          <div v-if="coupon.status !== 'unused'" class="absolute top-0 right-0 w-full h-full flex items-center justify-center">-->
<!--            <div class="transform rotate-45 text-4xl opacity-20 font-bold text-gray-500">-->
<!--              {{ coupon.status === 'used' ? '已使用' : '已过期' }}-->
<!--            </div>-->
<!--          </div>-->
        </div>
      </div>
    </div>

    <!-- 优惠券中心对话框 -->
<!--    <el-dialog-->
<!--      v-model="couponCenterVisible"-->
<!--      title="优惠券中心"-->
<!--      width="80%"-->
<!--      :before-close="handleDialogClose"-->
<!--    >-->
<!--      <div class="coupon-center">-->
<!--        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">-->
<!--          <div v-for="(offer, index) in availableOffers" :key="index" class="coupon-offer p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">-->
<!--            <div class="flex justify-between items-center">-->
<!--              <div>-->
<!--                <h3 class="text-lg font-medium">订单优惠券</h3>-->
<!--                <p class="text-xs text-gray-500 mt-1">无门槛使用</p>-->
<!--&lt;!&ndash;                <p class="text-xs text-gray-500 mt-1">有效期: {{ // offer.validity }}</p>&ndash;&gt;-->
<!--              </div>-->
<!--              <div>-->
<!--                <span class="block text-xl font-bold text-blue-600">{{ offer.amount }}</span>-->
<!--                <el-button size="small" type="primary" class="mt-2" @click="receiveCoupon(offer)">-->
<!--                  {{ offer.received ? '已领取' : '立即领取' }}-->
<!--                </el-button>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
<!--    </el-dialog>-->
  </div>
</template>

<script setup>
import {ref, computed, onMounted} from 'vue';
import { Money } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import {adminListApi} from "@/api/index.js";
import {useRouter} from "vue-router";

const tabs = [
  { label: '未使用', value: 'unused' },
  { label: '已使用', value: 'used' },
  // { label: '已过期', value: 'expired' }
];

const currentTab = ref('unused');
const couponCenterVisible = ref(false);

// 模拟数据
const coupons = ref([
  {
    title: '新用户专享券',
    amount: '¥10',
    type: '无门槛抵用券',
    condition: '无使用门槛',
    expireDate: '2023-05-30',
    status: 'unused'
  },
  {
    title: '骑行折扣券',
    amount: '¥5',
    type: '满15元可用',
    condition: '满15元可使用',
    expireDate: '2023-05-15',
    status: 'unused'
  },
  {
    title: '周末特惠券',
    amount: '8折',
    type: '折扣券',
    condition: '满30分钟可用',
    expireDate: '2023-04-10',
    status: 'used'
  },
  {
    title: '限时优惠券',
    amount: '¥3',
    type: '抵用券',
    condition: '无使用门槛',
    expireDate: '2023-03-20',
    status: 'expired'
  }
]);

// 可领取的优惠券
const availableOffers = ref([
  {
    title: '五一出行特惠',
    description: '五一假期骑行9折优惠',
    amount: '9折',
    validity: '2023-05-01至2023-05-05',
    received: false
  },
  {
    title: '首次充值奖励',
    description: '首次充值满50元赠送10元',
    amount: '¥10',
    validity: '2023-05-31前有效',
    received: false
  },
  {
    title: '夜间骑行优惠',
    description: '22:00-6:00骑行7折',
    amount: '7折',
    validity: '2023-05-31前有效',
    received: false
  },
  {
    title: '邀请好友返利',
    description: '邀请一位好友注册获得5元奖励',
    amount: '¥5',
    validity: '长期有效',
    received: false
  }
]);

// 根据当前选中的标签过滤优惠券
const filteredCoupons = computed(() => {
  return coupons.value.filter(coupon => coupon.status === currentTab.value);
});

// 显示优惠券中心
function showCouponCenter() {
  couponCenterVisible.value = true;
}

// 关闭对话框
function handleDialogClose() {
  couponCenterVisible.value = false;
}

// 领取优惠券
function receiveCoupon(offer) {
  if (offer.received) {
    ElMessage({
      type: 'warning',
      message: '您已领取过该优惠券',
      duration: 1500
    });
    return;
  }

  // 将优惠券添加到用户的优惠券列表
  coupons.value.push({
    title: offer.title,
    amount: offer.amount,
    type: offer.description,
    condition: offer.description,
    expireDate: offer.validity.split('至').pop() || offer.validity,
    status: 'unused'
  });

  // 标记为已领取
  offer.received = true;

  ElMessage({
    type: 'success',
    message: '优惠券领取成功',
    duration: 1500
  });
}
const router = useRouter();

// 使用优惠券
function useCoupon(coupon) {
  // ElMessage({
  //   type: 'success',
  //   message: '即将前往骑行页面使用优惠券',
  //   duration: 1500
  // });

  // 实际应用中应该跳转到相应的使用页面
  router.push({
    path:'/rent'
  });
}
const columns = ref([])
onMounted(() => {
  adminListApi.couponList().then(res => {
    columns.value = res.data
  })
})
</script>

<style scoped>
.coupon-card {
  position: relative;
}

.coupon-left::after {
  content: "";
  position: absolute;
  top: 0;
  right: 40%;
  height: 100%;
  width: 20px;
  background-size: 20px 20px;
  background-repeat: repeat-y;
}

.coupon-offer {
  background-color: #f9f9f9;
  transition: all 0.2s ease;
}

.coupon-offer:hover {
  background-color: #f0f9ff;
  transform: translateY(-2px);
}
</style>
