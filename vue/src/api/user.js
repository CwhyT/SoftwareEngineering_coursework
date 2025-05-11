import request from '@/utils/request';

// 用户相关API
export const userApi = {
  register: (userData) => request({
    url: '/api/auth/register',
    method: 'post',
    data: userData,
    timeout: 30000, // 30秒超时
    retry: 3, // 自动重试次数
    retryDelay: 2000, // 重试间隔
    transformResponse: [(data) => {
      try {
        // 尝试解析响应数据
        const parsedData = JSON.parse(data);
        console.log('注册响应数据:', parsedData);

        // 如果注册成功，立即保存令牌
        if (parsedData.success && parsedData.token) {
          console.log(`收到令牌(${typeof parsedData.token}):`, parsedData.token.substring(0, 20) + '...');
          if (typeof parsedData.token === 'string' && parsedData.token.trim() !== '') {
            localStorage.setItem('token', parsedData.token);
            console.log('已保存注册返回的令牌');
          } else {
            console.error('收到的令牌格式无效:', parsedData.token);
          }
        } else {
          console.log('注册响应中没有令牌或注册失败');
        }

        return parsedData;
      } catch (e) {
        console.error('转换注册响应出错:', e);
        console.error('原始数据:', data);
        return data;
      }
    }]
  }),
  login: (credentials) => request({
    url: '/api/auth/login',
    method: 'post',
    data: credentials,
    timeout: 15000,
    retry: 2,
    transformResponse: [(data) => {
      try {
        let parsedData = typeof data === 'string' ? JSON.parse(data) : data;
        // 兼容多种结构
        if (parsedData.data) {
          // 兼容{code, data:{token, user}}或{data:{token, user}}
          parsedData = { ...parsedData, ...parsedData.data };
        }
        localStorage.setItem('loginId',parsedData.user.userId)
        localStorage.setItem('money',parsedData.user.money)
        localStorage.setItem('totalOrders',parsedData.user.totalOrders)

        // 标准化返回
        return {
          success: parsedData.success !== undefined ? parsedData.success : parsedData.code === 200,
          token: parsedData.token,
          user: parsedData.user,
          message: parsedData.message || parsedData.msg || '',
          ...parsedData
        };
      } catch (e) {
        console.error('转换登录响应出错:', e);
        return { success: false, message: '响应解析失败' };
      }
    }]
  }),
  getProfile: () => request({
    url: '/api/users/profile?loginId=' + localStorage.getItem('loginId'),
    method: 'get',
    transformResponse: [(data) => {
      try {
        let parsed = typeof data === 'string' ? JSON.parse(data) : data;
        return parsed;
      } catch (e) {
        return data;
      }
    }]
  }),
  updateProfile: (userData) => request({
    url: '/api/users/profile',
    method: 'put',
    data: userData,
    timeout: 15000 // 15秒超时
  }),

  // 验证相关
  verifyEmail: (email, code) => request({
    url: '/api/auth/verify-email',
    method: 'post',
    data: { email, code },
    timeout: 20000, // 20秒超时
    retry: 2, // 自动重试次数
    retryDelay: 2000 // 重试间隔
  }),
  sendEmailCode: (email) => request({
    url: '/api/auth/send-email-code',
    method: 'post',
    data: { email },
    timeout: 30000, // 增加超时时间到30秒
    retry: 3, // 增加重试次数到3次
    retryDelay: 2000, // 重试间隔2秒
    transformResponse: [(data) => {
      try {
        // 尝试解析响应数据
        let result;
        if (typeof data === 'string') {
          result = JSON.parse(data);
        } else {
          result = data;
        }
        console.log('邮箱验证码响应解析结果:', result);

        // 确保返回标准格式的结果
        if (result) {
          const standardResult = {
            success: result.success || false,
            message: result.message || '验证码已发送',
            code: result.code || null
          };

          // 处理不同的响应结构
          if (result.data) {
            standardResult.success = result.data.success || standardResult.success;
            standardResult.message = result.data.message || standardResult.message;
            standardResult.code = result.data.code || standardResult.code;
          }

          return standardResult;
        }
        return result;
      } catch (e) {
        console.error('转换邮箱验证码响应出错:', e);
        console.error('原始数据:', data);
        return {
          success: false,
          message: '解析验证码响应失败'
        };
      }
    }]
  }),

  // 密码找回
  forgotPassword: (email) => request({
    url: '/api/auth/forgot-password',
    method: 'post',
    data: { email },
    timeout: 10000 // 10秒超时
  }),
  resetPassword: (data) => request({
    url: '/api/auth/reset-password',
    method: 'post',
    data: data,
    timeout: 10000 // 10秒超时
  }),

  // 用户管理API
  getAllUsers: () => request({
    url: '/api/users',
    method: 'get',
    timeout: 10000 // 10秒超时
  }),
  getUserById: (id) => request({
    url: `/api/users/${id}`,
    method: 'get',
    timeout: 10000 // 10秒超时
  }),
  updateUser: (id, userData) => request({
    url: `/api/users/${id}`,
    method: 'put',
    data: userData,
    timeout: 10000 // 10秒超时
  }),
  deleteUser: (id) => request({
    url: `/api/users/${id}`,
    method: 'delete',
    timeout: 10000 // 10秒超时
  }),
  getUserStats: () => request({
    url: '/api/users/stats',
    method: 'get',
    timeout: 10000 // 10秒超时
  }),

  // 注销用户账户
  deactivateAccount: () => {
    // 获取token
    const token = localStorage.getItem('token');

    return request({
      url: '/api/auth/deactivate',
      method: 'delete',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      timeout: 10000 // 10秒超时
    });
  },

  // 修改密码
  changePassword: (oldPassword, newPassword) => request({
    url: '/api/users/change-password',
    method: 'post',
    data: { oldPassword, newPassword },
    transformResponse: [(data) => {
      try {
        let parsed = typeof data === 'string' ? JSON.parse(data) : data;
        return parsed;
      } catch (e) {
        return data;
      }
    }]
  }),

  // 注销账户
  deactivateAccount: () => request({
    url: '/api/users/deactivate',
    method: 'post'
  }),

  getOrders: () => request({
    url: '/api/users/orders?loginId=' + localStorage.getItem('loginId'),
    method: 'get',
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    },
    transformResponse: [(data) => {
      try {
        console.log('原始响应数据:', data);
        const parsedData = typeof data === 'string' ? JSON.parse(data) : data;
        console.log('解析后的数据:', parsedData);

        // 处理订单数据
        let orders = [];
        if (Array.isArray(parsedData)) {
          orders = parsedData;
        } else if (parsedData.data && Array.isArray(parsedData.data)) {
          orders = parsedData.data;
        } else if (parsedData.orders && Array.isArray(parsedData.orders)) {
          orders = parsedData.orders;
        }

        // 打印每个订单的原始时间数据
        orders.forEach(order => {
          console.log('订单原始时间数据:', {
            orderId: order.orderId,
            startTime: order.startTime,
            endTime: order.endTime,
            createdAt: order.createdAt
          });
        });

        return {
          success: true,
          data: orders
        };
      } catch (e) {
        console.error('解析订单数据出错:', e);
        return { success: false, message: '解析订单数据失败' };
      }
    }]
  })
};
