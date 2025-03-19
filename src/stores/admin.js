import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'
import * as adminApi from '@/api/admin'

export const useAdminStore = defineStore('admin', () => {
  const dashboardStats = ref({
    totalUsers: 0,
    totalRevenue: 0,
    activeRentals: 0,
    pendingFeedbacks: 0,
    usersTrend: 5.2,
    revenueTrend: 8.5,
    rentalsTrend: -2.3,
    feedbacksTrend: 12.7
  })
  
  const usersList = ref([])
  const revenueData = ref({
    daily: [],
    weekly: [],
    monthly: []
  })
  const feedbackList = ref([])
  const recentActivities = ref([])

  async function fetchDashboardStats() {
    try {
      const response = await adminApi.getDashboardStats()
      dashboardStats.value = {
        ...dashboardStats.value,
        ...response.data
      }
      return { success: true }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || '获取仪表盘数据失败'
      }
    }
  }

  async function fetchRevenueTrend(period = 'week') {
    try {
      const response = await adminApi.getRevenueTrend(period)
      return { 
        success: true,
        data: response.data
      }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || '获取收入趋势数据失败'
      }
    }
  }

  async function fetchUserActivity(period = 'week') {
    try {
      const response = await adminApi.getUserActivity(period)
      return { 
        success: true,
        data: response.data
      }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || '获取用户活跃度数据失败'
      }
    }
  }

  async function fetchDeviceUsage() {
    try {
      const response = await adminApi.getDeviceUsage()
      return { 
        success: true,
        data: response.data
      }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || '获取设备使用率数据失败'
      }
    }
  }

  async function fetchFeedbackStats() {
    try {
      const response = await adminApi.getFeedbackStats()
      return { 
        success: true,
        data: response.data
      }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || '获取问题反馈统计数据失败'
      }
    }
  }

  async function fetchRecentActivities(page = 1) {
    try {
      const response = await adminApi.getRecentActivities(page)
      recentActivities.value = page === 1 
        ? response.data.items 
        : [...recentActivities.value, ...response.data.items]
      return { 
        success: true,
        hasMore: response.data.hasMore
      }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || '获取最近活动失败'
      }
    }
  }

  async function fetchUsers(params = {}) {
    try {
      const response = await axios.get('/api/admin/users', { params })
      usersList.value = response.data
      return { success: true }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || '获取用户列表失败'
      }
    }
  }

  async function updateUser(userId, userData) {
    try {
      const response = await axios.put(`/api/admin/users/${userId}`, userData)
      return { success: true }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || '更新用户信息失败'
      }
    }
  }

  async function deleteUser(userId) {
    try {
      await axios.delete(`/api/admin/users/${userId}`)
      return { success: true }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || '删除用户失败'
      }
    }
  }

  async function fetchRevenueData(period = 'daily') {
    try {
      const response = await axios.get(`/api/admin/revenue/${period}`)
      revenueData.value[period] = response.data
      return { success: true }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || '获取收入数据失败'
      }
    }
  }

  async function fetchFeedbacks(status = 'pending') {
    try {
      const response = await axios.get('/api/admin/feedbacks', {
        params: { status }
      })
      feedbackList.value = response.data
      return { success: true }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || '获取反馈列表失败'
      }
    }
  }

  async function updateFeedbackStatus(feedbackId, status, reply) {
    try {
      const response = await axios.put(`/api/admin/feedbacks/${feedbackId}`, {
        status,
        reply
      })
      return { success: true }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || '更新反馈状态失败'
      }
    }
  }

  return {
    dashboardStats,
    usersList,
    revenueData,
    feedbackList,
    recentActivities,
    fetchDashboardStats,
    fetchRevenueTrend,
    fetchUserActivity,
    fetchDeviceUsage,
    fetchFeedbackStats,
    fetchRecentActivities,
    fetchUsers,
    updateUser,
    deleteUser,
    fetchRevenueData,
    fetchFeedbacks,
    updateFeedbackStatus
  }
}) 