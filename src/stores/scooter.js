import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'
import { ElMessage } from 'element-plus'

export const useScooterStore = defineStore('scooter', () => {
  const scooters = ref([])
  const currentRental = ref(null)
  const rentalHistory = ref([])

  // 开发模式模拟功能
  const useDevelopmentMode = () => {
    return import.meta.env.DEV
  }

  async function fetchNearbyScooters(location) {
    try {
      const response = await axios.get('/api/scooters/nearby', {
        params: {
          latitude: location.latitude,
          longitude: location.longitude
        }
      })
      scooters.value = response.data
      return { success: true }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || '获取附近滑板车失败'
      }
    }
  }

  async function startRental(scooterId, rentalOptions) {
    try {
      if (useDevelopmentMode()) {
        // 开发模式模拟数据
        currentRental.value = {
          id: 'RENTAL' + Date.now(),
          scooterId,
          startTime: new Date().toISOString(),
          endTime: null,
          status: 'active',
          ...rentalOptions
        }
        return { 
          success: true,
          orderId: currentRental.value.id
        }
      }

      const response = await axios.post('/api/rentals/start', {
        scooterId,
        ...rentalOptions
      })
      
      currentRental.value = response.data
      return { 
        success: true,
        orderId: response.data.id || response.data.orderId
      }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || '开始租赁失败'
      }
    }
  }

  async function endRental(rentalId) {
    try {
      if (useDevelopmentMode()) {
        currentRental.value = null
        return { success: true }
      }

      const response = await axios.post(`/api/rentals/${rentalId}/end`)
      currentRental.value = null
      return { success: true }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || '结束租赁失败'
      }
    }
  }

  async function fetchRentalHistory() {
    try {
      if (useDevelopmentMode()) {
        // 开发模式模拟数据
        rentalHistory.value = [
          {
            id: 'RENTAL001',
            scooterId: 'SCOOTER001',
            startTime: '2024-03-18T08:00:00Z',
            endTime: '2024-03-18T10:00:00Z',
            duration: 2,
            type: 'hourly',
            amount: 40,
            status: 'completed'
          }
        ]
        return { success: true }
      }

      const response = await axios.get('/api/rentals/history')
      rentalHistory.value = response.data
      return { success: true }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || '获取租赁历史失败'
      }
    }
  }

  async function submitFeedback(feedback) {
    try {
      const formData = new FormData()
      formData.append('type', feedback.type)
      formData.append('content', feedback.content)
      if (feedback.image) {
        formData.append('image', feedback.image)
      }

      const response = await axios.post('/api/feedback', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      return { success: true }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || '提交反馈失败'
      }
    }
  }

  return {
    scooters,
    currentRental,
    rentalHistory,
    fetchNearbyScooters,
    startRental,
    endRental,
    fetchRentalHistory,
    submitFeedback
  }
}) 