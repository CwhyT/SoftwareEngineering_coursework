<template>
  <div class="rent-store-page bg-gray-100 min-h-screen p-4">
    <div class="mb-8 flex items-center">
      <el-button size="small" @click="goBack" class="mr-4 font-bold" icon="Back" circle />
      <h1 class="text-2xl font-bold">门店车辆列表</h1>
      <div class="text-gray-500 mt-2 ml-6">门店编号：{{ storeId }}</div>
    </div>
    <div v-if="loading" class="bg-white rounded-lg shadow p-6 text-center">
      <el-icon class="text-4xl text-blue-500 animate-spin"><Loading /></el-icon>
      <div class="mt-4 text-gray-500">正在加载车辆信息...</div>
    </div>
    <div v-else-if="error" class="bg-white rounded-lg shadow p-6 text-center">
      <el-icon class="text-4xl text-red-500"><Warning /></el-icon>
      <div class="mt-4 text-red-500">{{ error }}</div>
      <el-button type="primary" class="mt-4" @click="fetchScooters">重试</el-button>
    </div>
    <template v-else>
      <div v-if="activeStep === 1">
        <div v-if="scooters.length > 0" class="space-y-5 mb-8">
          <div v-for="scooter in scooters" :key="scooter.scooterId"
               class="bg-white rounded-lg shadow p-3 sm:p-5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-0">
            <!-- 左侧图标和信息 -->
            <div class="flex items-start flex-1">
              <!-- 图标容器（移动端缩小） -->
              <div class="bg-blue-50 p-2 sm:p-4 rounded-lg mr-3 sm:mr-4 flex items-center justify-center"
                   style="min-width:44px; min-height:44px; width:44px; height:44px;">
                <img src="https://img.icons8.com/color/48/000000/scooter.png"
                     alt="scooter"
                     class="w-6 h-6 sm:w-8 sm:h-8" />
              </div>

              <div class="flex-1">
                <!-- 车辆编号（移动端缩小字体） -->
                <div class="text-base sm:text-lg font-medium">车辆编号: {{ scooter.scooterId }}</div>

                <!-- 信息行（移动端改为垂直布局） -->
                <div class="flex flex-col sm:flex-row sm:flex-wrap gap-x-1 sm:gap-x-8 gap-y-1 mt-1">
                  <div class="text-xs sm:text-sm text-gray-500" v-if="scooter.distance">
                    距离: {{ formatDistance(scooter.distance) }}
                  </div>
                  <div class="text-xs sm:text-sm text-gray-500">
                    状态: {{ scooter.status }}
                  </div>
                  <div class="text-xs sm:text-sm text-gray-500">
                    类型: {{ scooter.model }}
                  </div>
                </div>

                <!-- 电量进度条（移动端调整尺寸） -->
                <div class="flex items-center mt-2 sm:mt-3">
                  <span class="text-xs sm:text-sm text-gray-500 mr-2">电量:</span>
                  <div class="flex-1 bg-gray-200 h-2 sm:h-3 rounded-full overflow-hidden"
                       style="min-width:80px; max-width:150px;">
                    <div
                        class="h-full"
                        :style="{ width: `${scooter.batteryLevel}%`, backgroundColor: getBatteryColor(scooter.batteryLevel) }"
                    ></div>
                  </div>
                  <span class="ml-2 text-xs sm:text-sm font-medium"
                        :class="getBatteryTextColor(scooter.batteryLevel)">
          {{ scooter.batteryLevel }}%
        </span>
                </div>
              </div>
            </div>

            <!-- 右侧价格和按钮（移动端改为行布局） -->
            <div class="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2 sm:ml-4 min-w-[auto] sm:min-w-[120px]">
              <el-button
                  type="primary"
                  size="small"
                  :disabled="!isAvailable(scooter.status)"
                  @click="handleRent(scooter)"
                  class="bg-blue-500 text-white border-0 font-bold px-4 sm:px-6 py-1 sm:py-2 text-sm sm:text-base rounded-md sm:mb-2 w-full sm:w-auto"
              >
                {{ getRentButtonText(scooter.status) }}
              </el-button>

              <div class="text-xs sm:text-sm text-gray-500 whitespace-nowrap">
                价格:
                <span class="text-blue-600 font-medium ml-1">
        ¥{{ formatPrice(scooter.pricePerHour) }}/小时
      </span>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="bg-white rounded-lg shadow p-6 text-center">
          <div class="text-gray-400 text-5xl mb-2">🔍</div>
          <div class="text-lg font-medium mb-2">该门店暂无可用车辆</div>
          <el-button type="primary" class="mt-4" @click="fetchScooters">刷新列表</el-button>
        </div>
      </div>
      <!-- 美观租车确认卡片 -->
      <div v-else-if="activeStep === 2" class="max-w-xl mx-auto bg-white rounded-2xl shadow p-8 mt-6">
        <!-- 返回按钮和标题 -->
        <div class="flex items-center mb-6">
          <el-button size="small" @click="activeStep = 1" class="font-bold mr-2" icon="Back" round>返回列表</el-button>
          <span class="text-lg font-bold">车辆租赁确认</span>
        </div>
        <!-- 车辆信息卡片 -->
        <div class="flex items-center mb-6">
          <div class="bg-blue-100 rounded-xl flex items-center justify-center mr-5" style="width:64px;height:64px;">
            <img src="https://img.icons8.com/color/48/000000/scooter.png" alt="scooter" style="width:40px;height:40px;" />
          </div>
          <div class="flex-1">
            <div class="text-xl font-bold mb-1">车辆编号: {{ selectedScooter.scooterId }}</div>
            <div class="flex items-center text-gray-500 text-sm">
              <span class="mr-4">电量: {{ selectedScooter.batteryLevel }}%</span>
              <span v-if="selectedScooter.distance">距离: {{ formatDistance(selectedScooter.distance) }}</span>
            </div>
          </div>
        </div>
        <el-divider />
        <!-- 租赁方式选择 -->
        <div class="mb-6">
          <div class="text-base font-bold mb-3">选择租赁方式</div>
          <el-tabs v-model="rentalMode" class="mb-4">
            <el-tab-pane label="按时长租赁" name="duration"></el-tab-pane>
            <el-tab-pane label="预约时段" name="reservation"></el-tab-pane>
          </el-tabs>
          <!-- 按时长租赁 -->
          <div v-if="rentalMode === 'duration'">
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
              <div
                v-for="option in rentalDurationOptions"
                :key="option.value"
                class="border rounded-xl p-4 cursor-pointer text-center transition"
                :class="selectedRentalDuration === option.value ? 'border-blue-500 bg-blue-50 shadow' : 'border-gray-200 hover:border-blue-200'"
                @click="selectRentalDuration(option.value)"
              >
                <div class="font-bold text-lg">{{ option.label }}</div>
                <div class="text-blue-600 font-bold mt-1">¥{{ option.price.toFixed(2) }}</div>
              </div>
              <!-- 自定义 -->
              <div
                class="border rounded-xl p-4 cursor-pointer text-center transition"
                :class="isCustomDuration ? 'border-blue-500 bg-blue-50 shadow' : 'border-gray-200 hover:border-blue-200'"
                @click="toggleCustomDuration"
              >
                <div class="font-bold text-lg">自定义</div>
                <div class="text-blue-600 font-bold mt-1">
                  <el-icon><Edit /></el-icon>
                </div>
              </div>
            </div>
            <!-- 自定义时长 -->
            <div v-if="isCustomDuration" class="bg-gray-50 rounded-xl p-4 mb-3 animate-fadeIn">
              <div class="flex items-center mb-2">
                <span class="text-sm text-gray-600 mr-2">小时</span>
                <el-input-number v-model="customHours" :min="0" :max="72" size="small" @change="updateCustomDuration" />
                <span class="text-sm text-gray-600 mx-2">分钟</span>
                <el-input-number
                  v-model="customMinutes"
                  :min="0"
                  :max="45"
                  :step="15"
                  size="small"
                  @change="handleCustomMinutesChange"
                />
              </div>
              <div class="flex justify-between text-sm mt-2">
                <span class="text-gray-600">预计费用:</span>
                <span class="text-blue-600 font-bold">¥{{ calculateCustomPrice().toFixed(2) }}</span>
              </div>
              <div class="text-xs text-gray-500 mt-1">最长不超过3天(72小时)，超出租期将收取额外费用</div>
            </div>
          </div>
          <!-- 预约时段 -->
          <div v-else class="bg-gray-50 rounded-xl p-4 mb-3 animate-fadeIn">
            <div class="flex flex-col sm:flex-row gap-3 items-center">
              <div class="flex-1">
                <span class="text-sm text-gray-600 mr-2">开始时间</span>
                <el-date-picker
                  v-model="reservationStartDate"
                  type="date"
                  placeholder="选择日期"
                  :disabled-date="disablePastDates"
                  class="w-full mb-2"
                  size="default"
                  value-format="YYYY-MM-DD"
                />
                <el-time-picker
                  v-model="reservationStartHour"
                  placeholder="选择小时"
                  format="HH:00:00"
                  value-format="HH:00:00"
                  :disabled-hours="getDisabledStartHours"
                  :minute-step="60"
                  class="w-full"
                  size="default"
                />
              </div>
              <div class="flex-1">
                <span class="text-sm text-gray-600 mr-2">结束时间</span>
                <el-date-picker
                  v-model="reservationEndDate"
                  type="date"
                  placeholder="选择日期"
                  :disabled-date="disablePastDates"
                  class="w-full mb-2"
                  size="default"
                  value-format="YYYY-MM-DD"
                />
                <el-time-picker
                  v-model="reservationEndHour"
                  placeholder="选择小时"
                  format="HH:00:00"
                  value-format="HH:00:00"
                  :disabled-hours="getDisabledEndHours"
                  :minute-step="60"
                  class="w-full"
                  size="default"
                />
              </div>
            </div>
            <div class="flex justify-end mt-4">
              <el-button type="primary" @click="handleCalculateReservation" :disabled="!canCalculateReservation">计算费用</el-button>
            </div>
          </div>
        </div>
        <!-- 价格明细 -->
        <div class="mb-6">
          <div class="text-base font-bold mb-3">价格明细</div>
          <div class="bg-gray-50 rounded-xl p-4">
            <div class="flex justify-between mb-2">
              <span class="text-gray-600">{{ getSelectedDurationLabel() }}</span>
              <span class="font-bold">¥{{ isNaN(getSelectedDurationPrice()) ? '0.00' : getSelectedDurationPrice().toFixed(2) }}</span>
            </div>
            <div class="flex justify-between mb-2">
              <span class="text-gray-600">超时费用</span>
              <span class="font-bold">¥2.00/15分钟</span>
            </div>
            <div class="flex justify-between mb-2">
              <span class="text-gray-600">押金（可退）</span>
              <span class="font-bold">¥99.00</span>
            </div>
            <div class="flex justify-between mb-2">
              <span class="text-gray-600">优惠券</span>
              <el-select v-model="couponAmount" value-key="id" style="width: 100px" size="small">
                <el-option v-for="item in columns" :label="item.couponAmount" :value="item">
                </el-option>
              </el-select>
            </div>
            <div class="border-t border-gray-200 mt-2 pt-2 flex justify-between text-lg">
              <span class="font-bold">需支付</span>
              <span class="text-red-500 font-extrabold text-xl">¥{{ (getSelectedDurationPrice() + 99.00).toFixed(2) - (couponAmount && couponAmount.id ? couponAmount.couponAmount : 0)}}</span>
            </div>
          </div>
        </div>
        <!-- 用车须知 -->
        <div class="mb-6">
          <div class="text-base font-bold mb-3">用车须知</div>
          <div class="bg-gray-50 rounded-xl p-4 text-sm text-gray-600">
            <div class="flex items-start mb-2">
              <el-icon class="mt-0.5 mr-2 text-green-500"><Check /></el-icon>
              <div>骑行前请检查车辆状况，如有问题请联系客服</div>
            </div>
            <div class="flex items-start mb-2">
              <el-icon class="mt-0.5 mr-2 text-green-500"><Check /></el-icon>
              <div>请遵守交通规则，注意安全，不要逆行或闯红灯</div>
            </div>
            <div class="flex items-start mb-2">
              <el-icon class="mt-0.5 mr-2 text-green-500"><Check /></el-icon>
              <div>使用完毕请停放在指定区域，避免影响他人通行</div>
            </div>
            <div class="flex items-start">
              <el-icon class="mt-0.5 mr-2 text-green-500"><Check /></el-icon>
              <div>结束行程后系统将自动退还押金至您的账户</div>
            </div>
          </div>
        </div>
        <!-- 支付按钮 -->
        <div class="flex justify-center">
          <el-button
            type="primary"
            size="large"
            class="w-full font-bold"
            :loading="isSubmitting"
            @click="confirmRent"
          >
            确认支付并用车
          </el-button>
        </div>
      </div>
      <div v-else-if="activeStep === 3" class="bg-white rounded-lg shadow p-6 text-center">
        <div class="inline-block p-4 bg-green-100 rounded-full mb-4">
          <el-icon class="text-4xl text-green-500"><Check /></el-icon>
        </div>
        <h2 class="text-xl font-bold mb-2">租车成功！</h2>
        <p class="text-gray-500 mb-6">您已成功租用车辆，祝您用车愉快</p>
        <el-button type="primary" @click="activeStep = 1" class="font-bold">返回门店车辆列表</el-button>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import { Loading, Warning, Back, Check, Edit } from '@element-plus/icons-vue';
import axios from 'axios';
import dayjs from 'dayjs';
import {adminListApi} from "@/api/index.js";

const route = useRoute();
const router = useRouter();
const storeId = route.params.storeId;
const scooters = ref([]);
const loading = ref(false);
const error = ref('');
const activeStep = ref(1); // 1: 列表，2: 确认租车，3: 成功
const selectedScooter = ref(null);
const isSubmitting = ref(false);
const rentalMode = ref('duration');
const selectedRentalDuration = ref('1h');
const isCustomDuration = ref(false);
const customHours = ref(1);
const customMinutes = ref(0);
const reservationStartDate = ref(null);
const reservationEndDate = ref(null);
const reservationStartHour = ref(null);
const reservationEndHour = ref(null);
const couponAmount = ref({})
const reservationHours = ref(0);
const reservationPrice = ref(0);

// 动态套餐选项，价格根据数据库单价自动计算
const rentalDurationOptions = computed(() => {
  const pricePerHour = selectedScooter.value?.pricePerHour || 0;
  return [
    { value: '1h', label: '1小时', price: pricePerHour, hours: 1 },
    { value: '4h', label: '4小时', price: pricePerHour * 4, hours: 4 },
    { value: '1d', label: '1天', price: pricePerHour * 24, hours: 24 },
    { value: '1w', label: '1周', price: pricePerHour * 24 * 7, hours: 24 * 7 },
  ];
});

const fetchScooters = async () => {
  loading.value = true;
  error.value = '';
  try {
    let res;
    try {
      res = await axios.get(`/api/scooters/store/${storeId}`);
    } catch (e) {
      if (e.response && e.response.status === 404) {
        res = await axios.get(`/api/scooters/shop/${storeId}`);
      } else {
        throw e;
      }
    }
    scooters.value = Array.isArray(res.data) ? res.data : (res.data.data || []);
    if (!scooters.value.length) {
      error.value = '';
    }
  } catch (e) {
    console.error('获取门店车辆失败', e);
    if (e.response) {
      error.value = `接口错误：${e.response.status} ${e.response.statusText}`;
    } else {
      error.value = '获取车辆信息失败，请稍后重试';
    }
    ElMessage.error(error.value);
  } finally {
    loading.value = false;
  }
};

const isAvailable = (status) => {
  return String(status).toLowerCase() === 'available';
};

const handleRent = (scooter) => {
  if (!isAvailable(scooter.status)) {
    ElMessage.warning('该车辆当前不可租用');
    return;
  }
  selectedScooter.value = scooter;
  activeStep.value = 2; // 进入确认租车步骤
};

const getStatusText = (status) => {
  const s = String(status).toLowerCase();
  const statusMap = {
    'available': '可租用',
    'in_use': '使用中',
    'maintenance': '维护中',
    'charging': '充电中'
  };
  return statusMap[s] || status;
};

const getRentButtonText = (status) => {
  return isAvailable(status) ? '立即租用' : '不可租用';
};

const getBatteryColor = (battery) => {
  if (battery >= 60) return '#10B981'; // 绿色
  if (battery >= 30) return '#F59E0B'; // 橙色
  return '#EF4444'; // 红色
};

const getBatteryTextColor = (battery) => {
  if (battery >= 60) return 'text-green-500';
  if (battery >= 30) return 'text-yellow-500';
  return 'text-red-500';
};

const formatDistance = (meters) => {
  if (!meters && meters !== 0) return '';
  return meters < 1000 ? `${meters}米` : `${(meters / 1000).toFixed(1)}千米`;
};

const formatPrice = (price) => {
  if (price === undefined || price === null) return '--';
  return Number(price).toFixed(2);
};

const confirmRent = async () => {
  if (!selectedScooter.value) return;
  isSubmitting.value = true;
  try {
    // 计算租借时长
    let rentHours;
    if (rentalMode.value === 'duration') {
      if (selectedRentalDuration.value === 'custom') {
        rentHours = Number(customHours.value) + Number(customMinutes.value) / 60;
      } else {
        const option = rentalDurationOptions.value.find(opt => opt.value === selectedRentalDuration.value);
        rentHours = option ? option.hours : 1;
      }
    } else {
      rentHours = reservationHours.value;
    }
    // (getSelectedDurationPrice() + 99.00).toFixed(2) - (couponAmount ? couponAmount.couponAmount : 0
    // 创建订单
    await axios.post('/api/orders', {
      scooterId: selectedScooter.value.scooterId,
      rentHours: rentHours,
      couponId: couponAmount.value ? couponAmount.value.id : null,
      loginId: localStorage.getItem('loginId'),
      startTime: rentalMode.value === 'reservation' ? reservationStartDate.value + ' ' +  reservationStartHour.value : null,
      endTime: rentalMode.value === 'reservation' ? reservationEndDate.value + ' ' + reservationEndHour.value : null
    });

    ElMessage.success('租车成功！');
    activeStep.value = 3;
  } catch (e) {
    console.error('租车失败:', e);
    ElMessage.error(e.response?.data || '租车失败，请重试');
  } finally {
    isSubmitting.value = false;
  }
};

const goBack = () => {
  router.back();
};

const selectRentalDuration = (duration) => {
  selectedRentalDuration.value = duration;
  isCustomDuration.value = false;
};

const toggleCustomDuration = () => {
  isCustomDuration.value = !isCustomDuration.value;
  if (isCustomDuration.value) {
    selectedRentalDuration.value = 'custom';
  }
};

const updateCustomDuration = () => {
  selectedRentalDuration.value = 'custom';
};

const calculateCustomPrice = () => {
  const pricePerHour = selectedScooter.value?.pricePerHour || 0;
  const totalHours = Number(customHours.value) + Number(customMinutes.value) / 60;
  return (totalHours * pricePerHour);
};

const getSelectedDurationLabel = () => {
  if (rentalMode.value === 'reservation') {
    return reservationHours.value > 0 ? `${reservationHours.value}小时` : '请选择预约时段';
  }
  if (selectedRentalDuration.value === 'custom') {
    return `${customHours.value}小时${customMinutes.value ? customMinutes.value + '分钟' : ''}`;
  }
  const option = rentalDurationOptions.value.find(opt => opt.value === selectedRentalDuration.value);
  return option ? option.label : '';
};

const getSelectedDurationPrice = () => {
  if (rentalMode.value === 'reservation') {
    return reservationPrice.value;
  }
  if (selectedRentalDuration.value === 'custom') {
    return calculateCustomPrice();
  }
  const option = rentalDurationOptions.value.find(opt => opt.value === selectedRentalDuration.value);
  return option ? option.price : 0;
};

const disablePastDates = (date) => {
  const today = dayjs().startOf('day');
  return date < today.toDate();
};

const getDisabledStartHours = () => {
  if (!reservationStartDate.value) return [];
  const now = dayjs();
  const sel = dayjs(reservationStartDate.value);
  if (sel.isSame(now, 'day')) {
    return Array.from({ length: now.hour() }, (_, i) => i);
  }
  return [];
};

const getDisabledEndHours = () => {
  if (!reservationEndDate.value) return [];
  const now = dayjs();
  const sel = dayjs(reservationEndDate.value);
  if (sel.isSame(now, 'day')) {
    return Array.from({ length: now.hour() + 1 }, (_, i) => i);
  }
  if (
    reservationStartDate.value &&
    reservationEndDate.value &&
    sel.isSame(dayjs(reservationStartDate.value), 'day') &&
    reservationStartHour.value
  ) {
    const startHour = Number(reservationStartHour.value.split(':')[0]);
    return Array.from({ length: startHour + 1 }, (_, i) => i);
  }
  return [];
};

// 新增：判断预约时段是否可以计算
const canCalculateReservation = computed(() => {
  return (
    selectedScooter.value &&
    reservationStartDate.value && reservationEndDate.value &&
    reservationStartHour.value && reservationEndHour.value
  );
});

// 重写预约费用计算方法
function handleCalculateReservation() {
  if (!canCalculateReservation.value) {
    reservationHours.value = 0;
    reservationPrice.value = 0;
    ElMessage.warning('请选择正确的预约时间段');
    return;
  }
  // 拼接成完整的时间字符串
  const startStr = `${reservationStartDate.value} ${reservationStartHour.value}`;
  const endStr = `${reservationEndDate.value} ${reservationEndHour.value}`;
  // 用 dayjs 解析
  const start = dayjs(startStr, 'YYYY-MM-DD HH:mm');
  const end = dayjs(endStr, 'YYYY-MM-DD HH:mm');
  // 校验
  if (!start.isValid() || !end.isValid() || end.isBefore(start)) {
    reservationHours.value = 0;
    reservationPrice.value = 0;
    ElMessage.warning('请选择正确的预约时间段');
    return;
  }
  // 计算总分钟数
  const diffMinutes = end.diff(start, 'minute');
  reservationHours.value = diffMinutes > 0 ? (diffMinutes / 60) : 0;
  const pricePerHour = Number(selectedScooter.value.pricePerHour) || 0;
  reservationPrice.value = reservationHours.value * pricePerHour;
}

function handleCustomMinutesChange(val) {
  if (val > 45) {
    customMinutes.value = 0;
    if (customHours.value < 72) customHours.value++;
  } else if (val < 0) {
    customMinutes.value = 45;
    if (customHours.value > 0) customHours.value--;
  }
  updateCustomDuration();
}
const columns = ref([])
onMounted(() => {
  fetchScooters();
  adminListApi.couponList().then(res => {
    columns.value = res.data.filter(i => i.status === 0)
  })
});
</script>

<style scoped>
.rent-store-page {
  max-width: 1200px;
  margin: 0 auto;
}

.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.min-w-\[120px\] { min-width: 120px; }
</style>
