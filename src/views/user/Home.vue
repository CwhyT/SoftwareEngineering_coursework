<template>
  <div class="container mx-auto px-4">
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-gray-900">附近的滑板车</h1>
      <p class="text-gray-600">找到离你最近的电动滑板车</p>
    </div>

    <!-- 搜索和筛选区域 -->
    <div class="mb-6 flex flex-wrap gap-4">
      <el-input
        v-model="searchQuery"
        placeholder="搜索地点"
        class="max-w-xs"
        clearable
      >
        <template #prefix>
          <el-icon><Search /></el-icon>
        </template>
      </el-input>

      <el-select v-model="filterDistance" placeholder="距离范围" class="w-32">
        <el-option label="500米内" value="500" />
        <el-option label="1公里内" value="1000" />
        <el-option label="2公里内" value="2000" />
        <el-option label="5公里内" value="5000" />
      </el-select>

      <el-select v-model="filterBattery" placeholder="电量范围" class="w-32">
        <el-option label="全部" value="" />
        <el-option label="电量 > 80%" value="80" />
        <el-option label="电量 > 50%" value="50" />
        <el-option label="电量 > 20%" value="20" />
      </el-select>
    </div>

    <!-- 地图容器 -->
    <div class="relative">
      <div ref="mapContainer" class="w-full h-[600px] rounded-lg shadow-md"></div>
      
      <!-- 地图加载中遮罩 -->
      <div 
        v-if="loading"
        class="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center rounded-lg"
      >
        <el-loading />
      </div>
    </div>

    <!-- 滑板车列表 -->
    <div class="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <el-card
        v-for="scooter in nearbyScooters"
        :key="scooter.id"
        class="hover:shadow-lg transition-shadow"
        :body-style="{ padding: '0' }"
      >
        <div class="p-4">
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center space-x-2">
              <el-tag 
                :type="scooter.status === 'available' ? 'success' : 'danger'"
                size="small"
              >
                {{ scooter.status === 'available' ? '可用' : '使用中' }}
              </el-tag>
              <span class="text-sm text-gray-500">
                编号: {{ scooter.code }}
              </span>
            </div>
            <div class="flex items-center space-x-2">
              <el-icon><Location /></el-icon>
              <span class="text-sm text-gray-500">
                {{ scooter.distance }}米
              </span>
            </div>
          </div>

          <div class="flex items-center justify-between">
            <div class="space-y-2">
              <div class="flex items-center space-x-2">
                <el-icon><Battery /></el-icon>
                <span>电量: {{ scooter.battery }}%</span>
              </div>
              <div class="flex items-center space-x-2">
                <el-icon><Money /></el-icon>
                <span>{{ scooter.pricePerHour }}元/小时</span>
              </div>
            </div>

            <el-button 
              type="primary"
              :disabled="scooter.status !== 'available'"
              @click="handleRent(scooter)"
            >
              立即租用
            </el-button>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useScooterStore } from '@/stores/scooter'
import { ElMessage } from 'element-plus'
import { 
  Search,
  Location,
  Battery,
  Money
} from '@element-plus/icons-vue'
import AMapLoader from '@amap/amap-jsapi-loader'

const router = useRouter()
const scooterStore = useScooterStore()
const mapContainer = ref(null)
const map = ref(null)
const loading = ref(true)
const searchQuery = ref('')
const filterDistance = ref('1000')
const filterBattery = ref('')
const nearbyScooters = ref([])
const currentLocation = ref(null)

// 初始化地图
const initMap = async () => {
  try {
    const AMap = await AMapLoader.load({
      key: import.meta.env.VITE_AMAP_KEY,
      version: '2.0',
      plugins: ['AMap.Geolocation', 'AMap.ToolBar', 'AMap.Scale']
    })

    map.value = new AMap.Map(mapContainer.value, {
      zoom: 15,
      center: [116.397428, 39.90923]
    })

    // 添加控件
    map.value.addControl(new AMap.ToolBar())
    map.value.addControl(new AMap.Scale())

    // 获取当前位置
    const geolocation = new AMap.Geolocation({
      enableHighAccuracy: true,
      timeout: 10000,
      buttonPosition: 'RB',
      buttonOffset: new AMap.Pixel(10, 20),
      zoomToAccuracy: true
    })

    map.value.addControl(geolocation)

    geolocation.getCurrentPosition(async (status, result) => {
      if (status === 'complete') {
        currentLocation.value = {
          latitude: result.position.lat,
          longitude: result.position.lng
        }
        await fetchNearbyScooters()
      } else {
        ElMessage.error('定位失败，请检查定位权限')
      }
    })
  } catch (error) {
    console.error('地图加载失败:', error)
    ElMessage.error('地图加载失败，请刷新页面重试')
  } finally {
    loading.value = false
  }
}

// 获取附近滑板车
const fetchNearbyScooters = async () => {
  if (!currentLocation.value) return

  try {
    loading.value = true
    const result = await scooterStore.fetchNearbyScooters({
      ...currentLocation.value,
      distance: filterDistance.value,
      battery: filterBattery.value
    })

    if (result.success) {
      nearbyScooters.value = result.data
      updateMapMarkers()
    } else {
      ElMessage.error(result.message)
    }
  } catch (error) {
    ElMessage.error('获取附近滑板车失败')
  } finally {
    loading.value = false
  }
}

// 更新地图标记
const updateMapMarkers = () => {
  if (!map.value) return

  map.value.clearMap()

  nearbyScooters.value.forEach(scooter => {
    const marker = new AMap.Marker({
      position: [scooter.longitude, scooter.latitude],
      icon: new AMap.Icon({
        size: new AMap.Size(32, 32),
        image: scooter.status === 'available' 
          ? '/icons/scooter-available.png'
          : '/icons/scooter-unavailable.png'
      }),
      title: `编号: ${scooter.code}`
    })

    marker.on('click', () => {
      handleMarkerClick(scooter)
    })

    map.value.add(marker)
  })
}

// 处理标记点击
const handleMarkerClick = (scooter) => {
  if (scooter.status === 'available') {
    handleRent(scooter)
  } else {
    ElMessage.warning('该滑板车正在使用中')
  }
}

// 处理租赁
const handleRent = (scooter) => {
  router.push({
    path: '/rent',
    query: {
      scooterId: scooter.id
    }
  })
}

// 监听筛选条件变化
watch([filterDistance, filterBattery], () => {
  fetchNearbyScooters()
})

onMounted(() => {
  initMap()
})
</script>

<style scoped>
.el-loading {
  font-size: 24px;
}
</style> 