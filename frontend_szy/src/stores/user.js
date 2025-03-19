import { defineStore } from 'pinia'
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import { ElMessage } from 'element-plus'

export const useUserStore = defineStore('user', () => {
  const token = ref(localStorage.getItem('token') || '')
  const userInfo = ref(null)
  const isAdmin = ref(localStorage.getItem('isAdmin') === 'true')

  const isAuthenticated = computed(() => !!token.value)
  
  // 开发模式模拟功能
  const useDevelopmentMode = () => {
    // 仅在开发环境中使用模拟数据
    return import.meta.env.DEV
  }

  // 自动登录（仅开发模式）
  const autoLogin = async () => {
    try {
      if (useDevelopmentMode() && !isAuthenticated.value) {
        const result = await login({ username: 'test_user', password: 'test123' })
        if (result.success) {
          await fetchUserInfo()
          return { success: true }
        }
      }
      return { success: false }
    } catch (error) {
      console.error('Auto login failed:', error)
      return { success: false }
    }
  }

  async function login(credentials) {
    try {
      // 开发模式模拟登录
      if (useDevelopmentMode()) {
        token.value = 'mock-token'
        userInfo.value = {
          id: 1,
          username: credentials.username || 'test_user',
          nickname: '测试用户',
          balance: 100,
          isAdmin: credentials.username === 'admin'
        }
        isAdmin.value = credentials.username === 'admin'
        
        localStorage.setItem('token', token.value)
        localStorage.setItem('isAdmin', isAdmin.value)
        
        ElMessage.warning('开发模式：使用模拟登录')
        return { success: true }
      }
      
      const response = await axios.post('/api/auth/login', credentials)
      token.value = response.data.token
      userInfo.value = response.data.user
      isAdmin.value = response.data.user.isAdmin
      
      localStorage.setItem('token', token.value)
      localStorage.setItem('isAdmin', isAdmin.value)
      
      return { success: true }
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || '登录失败，请稍后重试'
      }
    }
  }

  async function register(userData) {
    try {
      // 开发模式模拟注册
      if (useDevelopmentMode()) {
        ElMessage.warning('开发模式：模拟注册成功')
        return { success: true }
      }
      
      const response = await axios.post('/api/auth/register', userData)
      return { success: true }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || '注册失败，请稍后重试'
      }
    }
  }

  async function logout() {
    token.value = ''
    userInfo.value = null
    isAdmin.value = false
    localStorage.removeItem('token')
    localStorage.removeItem('isAdmin')
    
    if (useDevelopmentMode()) {
      ElMessage.warning('开发模式：已退出登录')
    }
  }

  async function fetchUserInfo() {
    try {
      // 开发模式模拟用户信息
      if (useDevelopmentMode()) {
        userInfo.value = {
          id: 1,
          username: 'test_user',
          nickname: '测试用户',
          balance: 100,
          isAdmin: isAdmin.value
        }
        return { success: true }
      }
      
      const response = await axios.get('/api/user/profile')
      userInfo.value = response.data
      return { success: true }
    } catch (error) {
      if (import.meta.env.DEV) {
        console.warn('开发环境获取用户信息失败，使用模拟数据', error)
        userInfo.value = {
          id: 1,
          username: 'test_user',
          nickname: '测试用户',
          balance: 100,
          isAdmin: isAdmin.value
        }
        return { success: true }
      }
      
      return {
        success: false,
        message: error.response?.data?.message || '获取用户信息失败'
      }
    }
  }

  async function updateProfile(profileData) {
    try {
      // 开发模式模拟更新个人信息
      if (useDevelopmentMode()) {
        userInfo.value = { ...userInfo.value, ...profileData }
        ElMessage.success('个人信息更新成功')
        return { success: true }
      }
      
      const response = await axios.put('/api/user/profile', profileData)
      userInfo.value = response.data
      return { success: true }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || '更新个人信息失败'
      }
    }
  }

  async function updatePassword(passwordData) {
    try {
      // 开发模式模拟更新密码
      if (useDevelopmentMode()) {
        ElMessage.success('密码更新成功')
        return { success: true }
      }
      
      const response = await axios.put('/api/user/password', passwordData)
      return { success: true }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || '更新密码失败'
      }
    }
  }

  async function recharge(rechargeData) {
    try {
      // 开发模式模拟充值
      if (useDevelopmentMode()) {
        userInfo.value.balance += Number(rechargeData.amount)
        ElMessage.success(`成功充值 ${rechargeData.amount} 元`)
        return { success: true }
      }
      
      const response = await axios.post('/api/user/recharge', rechargeData)
      return { success: true }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || '充值失败'
      }
    }
  }

  return {
    token,
    userInfo,
    isAdmin,
    isAuthenticated,
    login,
    register,
    logout,
    fetchUserInfo,
    updateProfile,
    updatePassword,
    recharge,
    autoLogin
  }
}) 