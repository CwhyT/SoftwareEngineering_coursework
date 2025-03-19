import axios from 'axios'
import {
  mockDashboardStats,
  mockRevenueTrend,
  mockUserActivity,
  mockDeviceUsage,
  mockFeedbackStats,
  mockRecentActivities,
  mockRecentActivitiesPage2
} from './mock/admin'

// 是否使用模拟数据（开发环境）
const useMockData = import.meta.env.MODE === 'development'

/**
 * 获取仪表盘统计数据
 * @returns {Promise} 返回仪表盘数据
 */
export function getDashboardStats() {
  if (useMockData) {
    return Promise.resolve({ data: mockDashboardStats })
  }
  return axios.get('/api/admin/dashboard/stats')
}

/**
 * 获取收入趋势数据
 * @param {string} period - 时间段 (week/month/year)
 * @returns {Promise} 返回收入趋势数据
 */
export function getRevenueTrend(period = 'week') {
  if (useMockData) {
    return Promise.resolve({ data: mockRevenueTrend[period] })
  }
  return axios.get(`/api/admin/revenue/trend/${period}`)
}

/**
 * 获取用户活跃度数据
 * @param {string} period - 时间段 (week/month)
 * @returns {Promise} 返回用户活跃度数据
 */
export function getUserActivity(period = 'week') {
  if (useMockData) {
    return Promise.resolve({ data: mockUserActivity[period] })
  }
  return axios.get(`/api/admin/users/activity/${period}`)
}

/**
 * 获取设备使用率数据
 * @returns {Promise} 返回设备使用率数据
 */
export function getDeviceUsage() {
  if (useMockData) {
    return Promise.resolve({ data: mockDeviceUsage })
  }
  return axios.get('/api/admin/devices/usage')
}

/**
 * 获取问题反馈统计数据
 * @returns {Promise} 返回问题反馈统计数据
 */
export function getFeedbackStats() {
  if (useMockData) {
    return Promise.resolve({ data: mockFeedbackStats })
  }
  return axios.get('/api/admin/feedback/stats')
}

/**
 * 获取最近活动
 * @param {number} page - 页码
 * @param {number} pageSize - 每页条数
 * @returns {Promise} 返回最近活动数据
 */
export function getRecentActivities(page = 1, pageSize = 10) {
  if (useMockData) {
    // 模拟分页
    return Promise.resolve({
      data: page === 1 ? mockRecentActivities : mockRecentActivitiesPage2
    })
  }
  return axios.get('/api/admin/activities', {
    params: { page, pageSize }
  })
} 