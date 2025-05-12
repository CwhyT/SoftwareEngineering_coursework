<template>
  <div class="home-page">
    <!-- 主内容区 -->
    <main>
      <!-- 页面顶部标题横幅 -->
      <section class="banner bg-gradient-to-r from-blue-600 to-blue-800 text-white py-6 px-6">
        <div class="container mx-auto">
          <div class="flex items-center justify-between">
            <div>
              <h1 class="text-2xl md:text-3xl font-bold mb-2">Electric Scooter Rental System</h1>
              <p class="text-blue-100">Convenient and fast urban short-distance travel solution</p>
            </div>
            <div class="hidden md:block">
              <ScooterIcon :size="64" color="white" />
            </div>
          </div>
        </div>
      </section>

      <!-- 地图区域 -->
      <section class="map-section relative bg-gray-100">
        <!-- 顶部导航栏 -->
        <div class="absolute top-0 left-0 right-0 bg-white/90 backdrop-blur-sm shadow-sm px-6 py-2 z-20">
          <div class="container mx-auto flex items-center justify-between">
            <h2 class="text-gray-700 font-medium">Nearby Map</h2>
            <router-link to="/profile" class="text-gray-600 hover:text-blue-600">
              <el-icon size="20"><User /></el-icon>
            </router-link>
          </div>
        </div>

        <!-- 地图主体区域 -->
        <div class="map-container h-full pt-12">
          <div id="map-container" style="width: 100%; height: 100%"></div>
          <!-- 定位提示 -->
<!--          <div v-if="showLocationPrompt" class="location-prompt absolute top-16 left-0 right-0 mx-auto text-center z-10">-->
<!--            <div class="inline-block bg-white px-4 py-2 rounded-full shadow-sm text-sm">-->
<!--              <span class="text-gray-700">Need to access your location to find nearby scooters</span>-->
<!--              <el-button type="primary" size="small" class="ml-2" @click="getUserLocation">Allow</el-button>-->
<!--            </div>-->
<!--          </div>-->

<!--          &lt;!&ndash; 位置错误提示 &ndash;&gt;-->
<!--          <div v-else-if="locationError" class="location-error absolute top-16 left-0 right-0 mx-auto text-center z-10">-->
<!--            <div class="inline-block bg-white px-4 py-2 rounded-full shadow-sm text-sm">-->
<!--              <span class="text-gray-700">{{ locationError }}</span>-->
<!--              <el-button type="primary" size="small" class="ml-2" @click="getUserLocation">Retry</el-button>-->
<!--            </div>-->
<!--          </div>-->

<!--          &lt;!&ndash; 地图占位 &ndash;&gt;-->
<!--          <div class="map-placeholder flex flex-col items-center justify-center h-[50vh] relative bg-gray-50 shadow-inner overflow-hidden">-->
<!--            &lt;!&ndash; 地图中心定位点 &ndash;&gt;-->
<!--            <div class="relative z-10">-->
<!--              <div class="bg-white rounded-full p-2 shadow-sm">-->
<!--                <el-icon size="20" class="text-blue-600"><Location /></el-icon>-->
<!--              </div>-->
<!--            </div>-->

<!--            &lt;!&ndash; 简单距离指示 &ndash;&gt;-->
<!--            <div class="absolute inset-0 flex items-center justify-center pointer-events-none">-->
<!--              <div class="w-[200px] h-[200px] border border-blue-200/30 rounded-full"></div>-->
<!--            </div>-->

<!--            &lt;!&ndash; 简单比例尺 &ndash;&gt;-->
<!--            <div class="absolute bottom-2 left-2 z-10 bg-white/80 px-2 py-1 rounded text-xs text-gray-700">-->
<!--              约200米-->
<!--            </div>-->

            <!-- 地图控制器 -->
<!--            <div class="absolute bottom-2 right-2 z-10">-->
<!--              <div class="bg-white rounded-lg shadow-sm overflow-hidden">-->
<!--                <button class="p-1.5 hover:bg-gray-100 block border-b border-gray-100">-->
<!--                  <el-icon size="16" class="text-gray-600"><ZoomIn /></el-icon>-->
<!--                </button>-->
<!--                <button class="p-1.5 hover:bg-gray-100 block">-->
<!--                  <el-icon size="16" class="text-gray-600"><ZoomOut /></el-icon>-->
<!--                </button>-->
<!--              </div>-->
<!--            </div>-->

            <!-- 简易滑板车指示器 - 分散放置，避免重叠 -->
<!--            <div class="absolute bottom-20 left-1/4 z-10">-->
<!--              <div class="bg-white p-2 rounded-full shadow-sm">-->
<!--                <div class="relative flex items-center">-->
<!--                  <ScooterIcon :size="18" color="#3b82f6" />-->
<!--                  <span class="ml-2 text-xs text-gray-600">120m</span>-->
<!--                </div>-->
<!--              </div>-->
<!--            </div>-->
<!--            <div class="absolute top-1/4 right-1/3 z-10">-->
<!--              <div class="bg-white p-2 rounded-full shadow-sm">-->
<!--                <div class="relative flex items-center">-->
<!--                  <ScooterIcon :size="18" color="#3b82f6" />-->
<!--                  <span class="ml-2 text-xs text-gray-600">180m</span>-->
<!--                </div>-->
<!--              </div>-->
<!--            </div>-->
<!--            <div class="absolute top-1/3 right-1/5 z-10">-->
<!--              <div class="bg-white p-2 rounded-full shadow-sm">-->
<!--                <div class="relative flex items-center">-->
<!--                  <ScooterIcon :size="18" color="#3b82f6" />-->
<!--                  <span class="ml-2 text-xs text-gray-600">150m</span>-->
<!--                </div>-->
<!--              </div>-->
<!--            </div>-->
<!--            <div class="absolute bottom-1/3 left-1/5 z-10">-->
<!--              <div class="bg-white p-2 rounded-full shadow-sm">-->
<!--                <div class="relative flex items-center">-->
<!--                  <ScooterIcon :size="18" color="#3b82f6" />-->
<!--                  <span class="ml-2 text-xs text-gray-600">90m</span>-->
<!--                </div>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
        </div>
      </section>

      <!-- 车辆信息卡片区域 - 独立区域，不再覆盖地图 -->
      <section class="vehicle-info bg-white py-4 border-b">
        <div class="container mx-auto px-6">
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center">
              <div class="p-2 bg-blue-50 rounded-lg mr-3">
                <ScooterIcon :size="20" color="#3b82f6" />
              </div>
              <div>
                <p class="text-sm font-medium">Available Vehicles Nearby</p>
                <p class="text-lg font-bold text-blue-600">{{ columns.length }} vehicles</p>
              </div>
            </div>
            <router-link to="/rent" class="text-blue-600 text-sm flex items-center">
              View All
              <el-icon class="ml-1"><ArrowRight /></el-icon>
            </router-link>
          </div>

          <!-- 可滑动的车辆列表 -->
          <div class="overflow-x-auto pb-2 -mx-1">
            <div class="flex">
              <div v-for="i in columns" :key="i" class="flex-shrink-0 w-36 mx-1">
                <div class="scooter-item border border-gray-100 rounded-lg p-2 hover:border-blue-200 transition-all bg-white shadow-sm">
                  <div class="flex items-center mb-2">
                    <ScooterIcon :size="18" color="#3b82f6" />
                    <div class="ml-2">
                      <div class="text-xs font-medium">{{ i.model }}</div>
                      <div class="text-xs text-gray-500">{{ i.pricePerHour }} / h</div>
                    </div>
                  </div>
                  <router-link to="/rent">
                    <el-button type="primary" size="small" block>Rent</el-button>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 信息卡片区域 -->
      <section class="info-cards bg-gray-50 py-4">
        <div class="container mx-auto px-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- 左侧卡片组 -->
            <div>
              <h2 class="text-lg md:text-xl font-semibold text-gray-800 mb-3 px-2 md:px-0">Riding Statistics</h2>
              <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 px-2 sm:px-0">
                <!-- 总骑行次数卡片 -->
                <div class="bg-white rounded-lg shadow-sm p-3 sm:p-4">
                  <div class="flex items-center">
                    <div class="p-2 bg-blue-50 rounded-lg">
                      <el-icon class="text-blue-600 text-lg sm:text-xl md:text-2xl"><Timer /></el-icon>
                    </div>
                    <div class="ml-3">
                      <h3 class="text-xs sm:text-sm font-medium">Total Rides</h3>
                      <p class="text-lg sm:text-xl font-bold text-blue-600">{{user.totalOrders}}</p>
                    </div>
                  </div>
                </div>

                <!-- 账户余额卡片 -->
                <div class="bg-white rounded-lg shadow-sm p-3 sm:p-4">
                  <div class="flex items-center">
                    <div class="p-2 bg-green-50 rounded-lg">
                      <el-icon class="text-green-600 text-lg sm:text-xl md:text-2xl"><Wallet /></el-icon>
                    </div>
                    <div class="ml-3">
                      <h3 class="text-xs sm:text-sm font-medium">Account Balance</h3>
                      <p class="text-lg sm:text-xl font-bold text-green-600">¥{{user.money}}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- 右侧卡片组 -->
            <div>
              <h2 class="text-lg font-semibold text-gray-800 mb-3">
                {{ userStore.isAdmin ? 'Admin Features' : 'Recommended Features' }}
              </h2>
              <div class="bg-white rounded-lg shadow-sm p-4">
                <!-- 管理员专属功能 -->
                <div v-if="userStore.isAdmin" class="mb-3 p-2 bg-amber-50 rounded-lg border border-amber-100">
                  <h3 class="text-sm font-medium mb-2 text-amber-700">Admin Exclusive Features</h3>
                  <div class="grid grid-cols-2 gap-3">
                    <div class="block" @click="goToVehicleManagement">
                      <div class="function-card bg-amber-100 hover:bg-amber-200 rounded-lg p-3 text-center transition-all cursor-pointer">
                        <el-icon size="32" class="text-amber-600 mb-1"><Connection /></el-icon>
                        <span class="text-xs block">Vehicle Management</span>
                      </div>
                    </div>
                    <div class="block" @click="goToUserManagement">
                      <div class="function-card bg-amber-100 hover:bg-amber-200 rounded-lg p-3 text-center transition-all cursor-pointer">
                        <el-icon size="32" class="text-amber-600 mb-1"><UserFilled /></el-icon>
                        <span class="text-xs block">User Management</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="grid grid-cols-3 gap-3">
                  <router-link to="/rent" class="block">
                    <div class="function-card bg-blue-50 hover:bg-blue-100 rounded-lg p-3 text-center transition-all cursor-pointer">
                      <el-icon size="32" class="text-blue-600 mb-1"><Location /></el-icon>
                      <span class="text-xs block">Nearby Vehicles</span>
                    </div>
                  </router-link>
                  <router-link to="/payment" class="block">
                    <div class="function-card bg-green-50 hover:bg-green-100 rounded-lg p-3 text-center transition-all cursor-pointer">
                      <el-icon size="32" class="text-green-600 mb-1"><Wallet /></el-icon>
                      <span class="text-xs block">Recharge Balance</span>
                    </div>
                  </router-link>
                  <router-link to="/profile" class="block">
                    <div class="function-card bg-orange-50 hover:bg-orange-100 rounded-lg p-3 text-center transition-all cursor-pointer">
                      <el-icon size="32" class="text-orange-600 mb-1"><User /></el-icon>
                      <span class="text-xs block">Profile</span>
                    </div>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 精选优惠活动 -->
<!--      <section class="offers-section bg-white py-8">-->
<!--        <div class="container mx-auto px-6">-->
<!--          <div class="flex items-center justify-between mb-4">-->
<!--            <h2 class="text-lg font-semibold text-gray-800">精选优惠活动</h2>-->
<!--            <router-link to="/payment" class="text-blue-600 text-sm flex items-center">-->
<!--              更多优惠-->
<!--              <el-icon class="ml-1"><ArrowRight /></el-icon>-->
<!--            </router-link>-->
<!--          </div>-->

          <!-- 优惠活动轮播 -->
<!--          <el-carousel height="180px" :interval="4000" indicator-position="outside" class="rounded-lg overflow-hidden shadow-sm" trigger="click">-->
<!--            <el-carousel-item v-for="item in promotions" :key="item.id">-->
<!--              <div class="carousel-item h-full bg-gradient-to-r" :style="{ backgroundImage: `linear-gradient(to right, ${item.startColor}, ${item.endColor})` }">-->
<!--                <div class="flex h-full items-center">-->
<!--                  <div class="px-8 text-white flex-1">-->
<!--                    <h3 class="text-xl font-bold mb-1">{{ item.title }}</h3>-->
<!--                    <p class="text-sm opacity-90 mb-4">{{ item.description }}</p>-->
<!--                    <router-link :to="item.link">-->
<!--                      <el-button class="mt-2" type="primary" plain>查看详情</el-button>-->
<!--                    </router-link>-->
<!--                  </div>-->
<!--                </div>-->
<!--              </div>-->
<!--            </el-carousel-item>-->
<!--          </el-carousel>-->
<!--        </div>-->
<!--      </section>-->

      <!-- 特色服务 -->
      <section class="features-section py-4 bg-gray-50">
        <div class="container mx-auto px-6">
          <h2 class="section-title mb-4">Our Special Services</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-2">
            <div class="feature-card">
              <div class="feature-icon bg-blue-50 text-blue-600 p-4 rounded-full inline-flex mb-4">
                <el-icon size="30"><Position /></el-icon>
              </div>
              <h3 class="feature-title text-lg font-medium mb-2">Convenient Location</h3>
              <p class="feature-desc text-gray-600">Smart map display, quickly find nearby available scooters, convenient for user trip planning.</p>
            </div>

            <div class="feature-card">
              <div class="feature-icon bg-green-50 text-green-600 p-4 rounded-full inline-flex mb-4">
                <el-icon size="30"><Money /></el-icon>
              </div>
              <h3 class="feature-title text-lg font-medium mb-2">Economical and Practical</h3>
              <p class="feature-desc text-gray-600">Flexible billing mode, short-distance travel more economical, various packages meet different needs.</p>
            </div>

            <div class="feature-card">
              <div class="feature-icon bg-yellow-50 text-yellow-600 p-4 rounded-full inline-flex mb-4">
                <el-icon size="30"><Promotion /></el-icon>
              </div>
              <h3 class="feature-title text-lg font-medium mb-2">Multiple Discounts</h3>
              <p class="feature-desc text-gray-600">New user exclusive benefits, old user recommendation rewards, special event discounts on holidays.</p>
            </div>

            <div class="feature-card">
              <div class="feature-icon bg-orange-50 text-orange-600 p-4 rounded-full inline-flex mb-4">
                <el-icon size="30"><Service /></el-icon>
              </div>
              <h3 class="feature-title text-lg font-medium mb-2">Careful Service</h3>
              <p class="feature-desc text-gray-600">All-day customer service support, quick response to emergencies, make your travel more secure.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 用户见证 -->
      <section class="testimonial-section py-6 bg-gray-50">
        <div class="container mx-auto px-6">
          <h2 class="section-title mb-4">User Testimonials</h2>
          <div class="testimonial-container mt-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div class="testimonial-card bg-white p-4 rounded-lg shadow-md">
              <div class="flex items-center mb-3">
                <img src="https://randomuser.me/api/portraits/women/24.jpg" alt="User Avatar" class="rounded-full h-12 w-12 object-cover mr-3">
                <div>
                  <p class="font-medium">Ms. Li</p>
                  <p class="text-xs text-gray-500">Shanghai</p>
                </div>
              </div>
              <div class="testimonial-stars flex mb-2">
                <el-icon class="text-yellow-500 mr-1"><StarFilled /></el-icon>
                <el-icon class="text-yellow-500 mr-1"><StarFilled /></el-icon>
                <el-icon class="text-yellow-500 mr-1"><StarFilled /></el-icon>
                <el-icon class="text-yellow-500 mr-1"><StarFilled /></el-icon>
                <el-icon class="text-yellow-500"><StarFilled /></el-icon>
              </div>
              <p class="testimonial-text text-sm leading-relaxed text-gray-700">"Very convenient travel method, simple APP operation, find car, scan code, rental in one breath, reasonable price."</p>
            </div>

            <div class="testimonial-card bg-white p-4 rounded-lg shadow-md">
              <div class="flex items-center mb-3">
                <img src="https://randomuser.me/api/portraits/men/44.jpg" alt="User Avatar" class="rounded-full h-12 w-12 object-cover mr-3">
                <div>
                  <p class="font-medium">Mr. Wang</p>
                  <p class="text-xs text-gray-500">Beijing</p>
                </div>
              </div>
              <div class="testimonial-stars flex mb-2">
                <el-icon class="text-yellow-500 mr-1"><StarFilled /></el-icon>
                <el-icon class="text-yellow-500 mr-1"><StarFilled /></el-icon>
                <el-icon class="text-yellow-500 mr-1"><StarFilled /></el-icon>
                <el-icon class="text-yellow-500 mr-1"><StarFilled /></el-icon>
                <el-icon class="text-yellow-500"><StarFilled /></el-icon>
              </div>
              <p class="testimonial-text text-sm leading-relaxed text-gray-700">"Solved my last-mile commuting problem, much faster than waiting for public transport, scooter status is good, riding is smooth."</p>
            </div>

            <div class="testimonial-card bg-white p-4 rounded-lg shadow-md">
              <div class="flex items-center mb-3">
                <img src="https://randomuser.me/api/portraits/women/72.jpg" alt="User Avatar" class="rounded-full h-12 w-12 object-cover mr-3">
                <div>
                  <p class="font-medium">Ms. Zhang</p>
                  <p class="text-xs text-gray-500">Guangzhou</p>
                </div>
              </div>
              <div class="testimonial-stars flex mb-2">
                <el-icon class="text-yellow-500 mr-1"><StarFilled /></el-icon>
                <el-icon class="text-yellow-500 mr-1"><StarFilled /></el-icon>
                <el-icon class="text-yellow-500 mr-1"><StarFilled /></el-icon>
                <el-icon class="text-yellow-500 mr-1"><StarFilled /></el-icon>
                <el-icon class="text-gray-300"><Star /></el-icon>
              </div>
              <p class="testimonial-text text-sm leading-relaxed text-gray-700">"It's very convenient to ride a scooter around the city on weekends, take and return at will, the customer service attitude is also very good, recommended to friends around."</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 底部扫码租车按钮 - 仅普通用户可见 -->
<!--      <div v-if="!userStore.isAdmin" class="fixed bottom-6 right-6 z-50">-->
<!--        <router-link to="/scan">-->
<!--          <el-button type="primary" size="large" round class="shadow-lg">-->
<!--            <el-icon class="mr-2"><Monitor /></el-icon>-->
<!--            扫码租车-->
<!--          </el-button>-->
<!--        </router-link>-->
<!--      </div>-->

      <!-- 底部管理员按钮 - 仅管理员可见 -->
<!--      <div v-else class="fixed bottom-6 right-6 z-50 flex flex-col space-y-3">-->
<!--        <a href="/jump-admin.html" class="no-underline" target="_self">-->
<!--          <el-button type="danger" size="large" round class="shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 bg-red-600 border-red-700 animate-pulse">-->
<!--            <el-icon class="mr-2"><Setting /></el-icon>-->
<!--            管理控制台-->
<!--          </el-button>-->
<!--        </a>-->
<!--      </div>-->
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import {
  Location,
  MapLocation,
  ArrowRight,
  Monitor,
  Wallet,
  User,
  Compass,
  ZoomIn,
  ZoomOut,
  Star,
  StarFilled,
  Money,
  Service,
  Position,
  Promotion,
  Timer,
  ArrowDown,
  InfoFilled,
  Setting,
  List,
  Tools,
  TrendCharts,
  Connection,
  UserFilled,
  DataBoard
} from '@element-plus/icons-vue';
import ScooterIcon from '@/components/ScooterIcon.vue';
import { useUserStore } from '@/stores/user';
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';
import {adminListApi} from "@/api/index.js";
import {userApi} from "@/api/user.js";

// 响应式状态
const showScooters = ref(false);
const showLocationPrompt = ref(true);
const userStore = useUserStore();
const router = useRouter();

// 地图相关状态
const mapLoaded = ref(false);
const nearbyScooters = ref([]);
const loadingScooters = ref(false);
const locationError = ref(null);

// 默认定位（当无法获取用户位置时使用）
const defaultPosition = {
  latitude: 39.9042,
  longitude: 116.4074 // 默认位置坐标
};

const userTotal = (() => {
  return JSON.parse(localStorage.getItem('user')).totalOrders
})

const userMoney = (() => {
  return JSON.parse(localStorage.getItem('user')).money

})

// 用户位置
const userPosition = ref(null);

// 加载地图和附近滑板车
async function loadNearbyScooters() {
  try {
    loadingScooters.value = true;

    // 模拟从API获取数据 (实际项目中应替换为真实API调用)
    await new Promise(resolve => setTimeout(resolve, 1000));

    // 模拟数据
    nearbyScooters.value = [
      { id: 1, name: '滑板车-A1', available: true, battery: 85, distance: 120 },
      { id: 2, name: '滑板车-B2', available: true, battery: 72, distance: 180 },
      { id: 3, name: '滑板车-C3', available: true, battery: 65, distance: 150 },
      { id: 4, name: '滑板车-D4', available: true, battery: 90, distance: 90 }
    ];

    loadingScooters.value = false;
    mapLoaded.value = true;
  } catch (error) {
    console.error('加载滑板车数据失败:', error);
    ElMessage.error('加载滑板车数据失败，请重试');
    loadingScooters.value = false;
  }
}

// 获取用户位置
async function getUserLocation() {
  showLocationPrompt.value = false;

  try {
    // 检查地理定位API是否可用
    if (!navigator.geolocation) {
      throw new Error('Your browser does not support geolocation');
    }

    // 获取当前位置
    const position = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      });
    });

    // 成功获取位置
    userPosition.value = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    };

    // 加载附近滑板车
    await loadNearbyScooters();

  } catch (error) {
    console.error("Location failed:", error.message);
    locationError.value = error.message || 'Unable to get your location';

    // 使用默认位置
    // ElMessage.warning('位置获取失败');
    userPosition.value = defaultPosition;

    // 仍然加载附近滑板车
    await loadNearbyScooters();
  }
}

// 管理员页面导航方法
const goToVehicleManagement = () => {
  console.log('正在跳转到车辆管理...');
  // if (userStore.isAdmin) {
    ElMessage.success('Redirecting to vehicle management');
    router.push('/admin/vehicles');
  // } else {
  //   ElMessage.warning('您不是管理员，无法访问此功能');
  // }
};

const goToUserManagement = () => {
  // console.log('正在跳转到用户管理...');
  // if (userStore.isAdmin) {
    ElMessage.success('Redirecting to user management');
    router.push('/admin/users');
  // } else {
  //   ElMessage.warning('您不是管理员，无法访问此功能');
  // }
};


// 使用 AMap 定位插件获取当前位置
function getCurrentLocation() {
  return new Promise((resolve, reject) => {
    const geolocation = new AMap.Geolocation({
      enableHighAccuracy: true,
      timeout: 10000,
      position: 'RB',
      showMarker: false, // 我们自己添加标记
      showCircle: true,
    });

    map.value.addControl(geolocation);

    geolocation.getCurrentPosition((status, result) => {
      if (status === 'complete') {
        const {position} = result;
        map.value.setCenter(position);
        resolve(position);
      } else {
        console.error("定位失败：", result.message);
        // 使用默认位置（北京）
        const defaultPos = new AMap.LngLat(116.4074, 39.9042);
        map.value.setCenter(defaultPos);
        resolve(defaultPos);
      }
    });
  });
}
const user = ref({})

const map = ref()
const columns = ref([])

// 添加随机滑板车标记的函数
function addRandomScooters(count) {
  if (!map.value) return;

  // 获取地图中心点（用户位置）
  const center = map.value.getCenter();

  // 提供的经纬度数据
  const scooterPositions = [
    new AMap.LngLat(103.98080128795857, 30.761603970209602),
    new AMap.LngLat(103.99289721383786, 30.760189156287474),
    new AMap.LngLat(104.04850017878493, 30.695778389572475),
    new AMap.LngLat(104.0576039796506, 30.70153743272011),
    new AMap.LngLat(103.998459, 30.763493),
    new AMap.LngLat(103.985542, 30.773568)
  ];
  // 添加指定数量的滑板车标记
  for (let i = 0; i < 6; i++) {
    // 创建滑板车标记
    const marker = new AMap.Marker({
      position: scooterPositions[i],
      map: map.value,
      title: `Scooter ${i+1}`,
      icon: "/card-icon.png",
      iconStyle:{
        width: '48px',
        height: '48px'
      },
      offset: new AMap.Pixel(-13, -30)
    });

    // 添加信息窗口
    const infoWindow = new AMap.InfoWindow({
      content: `<div style="padding:5px;">
        <div>Scooter ${i+1}</div>
        <div>Battery: ${Math.round(Math.random() * 30 + 70)}%</div>
      </div>`,
      offset: new AMap.Pixel(0, -30)
    });

    // 点击标记显示信息窗口
    marker.on('click', () => {
      infoWindow.open(map.value, marker.getPosition());
    });
  }

  // 适当调整地图缩放级别以显示所有标记
  // map.value.setZoomAndCenter(15, center);
}


onMounted(() => {
  // 延迟加载非关键内容
  setTimeout(() => {
    showScooters.value = true;
  }, 500);

  if (userStore.isAuthenticated) {
    // 如果用户已登录，直接尝试获取位置
    getUserLocation();
  }


  userApi.getProfile().then(res => {
    user.value = res
  })

  window._AMapSecurityConfig = {
    securityJsCode: "487471b1263d343bfe3eb33bfc8487ed",
  }
  map.value = new AMap.Map("map-container", {
    zoom: 13,
  });
  adminListApi.scootersList().then(res => {
    columns.value = res.filter(i => i.status === 'available')
    // 获取当前定位后添加滑板车标记
    getCurrentLocation().then(() => {
      // 添加5个随机位置的滑板车标记
      addRandomScooters(res.filter(i => i.status === 'available').length);
    });
  })
});
</script>

<style>
/* 主要内容样式 */
.section-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #374151;
  text-align: center;
}

/* 地图样式 */
.map-section {
  overflow: hidden;
}

/* 功能区样式 */
.function-card {
  transition: all 0.2s ease;
}

.function-card:hover {
  transform: translateY(-2px);
}

/* 特色服务样式 */
.feature-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 1rem;
  border-radius: 0.5rem;
  transition: all 0.3s ease;
}

.feature-card:hover {
  box-shadow: 0 5px 15px -3px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

/* 促销卡片样式 */
.promo-card {
  transition: all 0.2s ease;
}

.promo-card:hover {
  transform: scale(1.01);
}

/* 用户见证样式 */
.testimonial-card {
  transition: all 0.2s ease;
}

.testimonial-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px -5px rgba(0, 0, 0, 0.1);
}
</style>
