import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'
import './styles/index.css'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import { ElMessage } from 'element-plus'

// 配置 axios
axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL || '/api'
axios.defaults.timeout = 10000
axios.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => {
    console.error('请求拦截器错误:', error)
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  response => response,
  error => {
    console.error('API错误:', error?.response?.data || error?.message || error)
    
    // 开发模式下拦截所有API请求并返回模拟数据
    if (import.meta.env.DEV) {
      console.log('开发模式：模拟API请求', error.config?.url)
      
      // 根据请求URL返回不同的模拟数据
      if (error.config?.url.includes('/user/profile')) {
        return Promise.resolve({ 
          data: { 
            id: 1, 
            username: 'test_user', 
            nickname: '测试用户',
            balance: 100,
            avatar: ''
          } 
        })
      } 
      else if (error.config?.url.includes('/user/stats')) {
        return Promise.resolve({
          data: {
            totalRentals: 5,
            totalDistance: 25.5,
            totalTime: 180,
            savedCarbon: 10.2
          }
        })
      }
      else if (error.config?.url.includes('/user/transactions')) {
        return Promise.resolve({
          data: {
            list: [
              {
                id: 'TX001',
                type: 'rental',
                amount: -20,
                time: new Date().toISOString(),
                description: '滑板车租赁'
              },
              {
                id: 'TX002',
                type: 'recharge',
                amount: 100,
                time: new Date().toISOString(),
                description: '账户充值'
              }
            ],
            total: 2
          }
        })
      }
      else if (error.config?.url.includes('/feedback')) {
        return Promise.resolve({
          data: {
            success: true
          }
        })
      }
      
      // 默认返回空数据
      return Promise.resolve({
        data: {}
      })
    }
    
    return Promise.reject(error)
  }
)

const app = createApp(App)
const pinia = createPinia()

// 注册 Element Plus 图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

// 添加全局错误处理
app.config.errorHandler = (err, vm, info) => {
  console.error('全局错误:', err)
  console.error('错误信息:', info)
  
  // 开发模式下不显示错误通知，避免干扰
  if (!import.meta.env.DEV) {
    ElMessage.error('系统错误，请刷新页面')
  }
}

app.use(pinia)
app.use(router)
app.use(ElementPlus)

// 在开发模式下自动设置登录令牌
if (import.meta.env.DEV && !localStorage.getItem('token')) {
  console.log('开发模式：设置自动登录')
  localStorage.setItem('token', 'dev-token')
}

app.mount('#app') 