import axios from 'axios';
import { ElMessage } from 'element-plus';
import router from '@/router';

// 创建axios实例
const service = axios.create({
  baseURL: 'http://192.168.31.45:8082',
  timeout: 15000, // 请求超时时间15秒
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 获取token并添加到请求头
    const token = localStorage.getItem('token');
    if (token) {
      // 确保令牌格式正确
      if (token.trim() !== '') {
      config.headers['Authorization'] = `Bearer ${token}`;

        // 开发环境下，打印令牌信息
        if (import.meta.env.DEV) {
          console.log(`[API请求] ${config.method?.toUpperCase() || 'GET'} ${config.url}`);
          console.log(`[Token] 使用令牌: ${token.substring(0, 20)}...`);
        }
      } else {
        console.warn('本地存储中的令牌为空，不添加Authorization头');
      }
    } else {
      // 开发环境下，打印缺少令牌的警告
    if (import.meta.env.DEV) {
        // 排除不需要令牌的公共API路径
        const publicPaths = ['/api/auth/login', '/api/auth/register', '/api/auth/send-email-code'];
        if (!publicPaths.some(path => config.url?.includes(path))) {
          console.warn(`[警告] API请求 ${config.url} 没有提供令牌`);

          // 对于管理员路径自动使用管理员令牌
          if (config.url?.includes('/admin/')) {
            console.log('检测到管理员API请求，尝试使用硬编码管理员令牌');
            const adminToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFkbWluLWlkIiwidXNlcm5hbWUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AZXhhbXBsZS5jb20iLCJyb2xlIjoiYWRtaW4ifQ.aBcDeFgHiJkLmNoPqRsTuVwXyZ';
            config.headers['Authorization'] = `Bearer ${adminToken}`;
            console.log('已添加管理员令牌到请求头');
          }
        }
      }
    }

    return config;
  },
  error => {
    console.error('请求错误:', error);
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  response => {
    // 简化响应数据
    let res = response;

    // 如果返回的是ArrayBuffer或Blob，不做处理
    if (response.data instanceof ArrayBuffer || response.data instanceof Blob) {
      return response;
    }

    // 检查响应是否已经被处理过
    if (response.data !== undefined) {
      res = response.data;
    }

    // 开发环境下，打印响应信息
    if (import.meta.env.DEV) {
      console.log(`[API响应] ${response.config.url}`, res);
    }

    // 检查响应是否包含明确的success字段
    if (res && typeof res === 'object' && 'success' in res && !res.success) {
      // 如果后端明确返回了失败状态，使用消息
      ElMessage.error(res.message || '操作失败');
      return Promise.reject(new Error(res.message || '操作失败'));
    }

    return res;
  },
  error => {
    console.log('请求响应错误:', error);

    // 根据错误类型处理
    if (error.response) {
      // 服务器返回了错误状态码
      const status = error.response.status;
      const data = error.response.data || {};

      // 开发环境下，打印更多错误信息
      if (import.meta.env.DEV) {
        console.error(`API错误(${status}):`, data);
      }

      switch (status) {
        case 400:
          ElMessage.error(data.message || '请求参数错误');
          break;
        case 401:
          ElMessage.error(data.message || '登录状态已过期，请重新登录');
          localStorage.removeItem('token');
          router.push('/login');
          break;
        case 403:
          ElMessage.error(data.message || '没有权限访问');
          break;
        case 404:
          ElMessage.error(data.message || '请求的资源不存在');
          break;
        case 500:
          ElMessage.error(data.message || '服务器内部错误');
          break;
        default:
          ElMessage.error(data.message || `请求失败 (${status})`);
      }
    } else if (error.request) {
      // 请求发出但没有收到响应
      if (error.message.includes('timeout')) {
        ElMessage.error('请求超时，请稍后再试');
      } else {
        ElMessage.error('网络错误，请检查您的连接或服务器状态');
      }
    } else {
      // 请求设置时发生错误
      ElMessage.error(error.message || '请求失败');
    }

    return Promise.reject(error);
  }
);

export default service;
