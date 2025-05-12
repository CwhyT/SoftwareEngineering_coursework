import request from '@/utils/request';

// User related APIs
export const userApi = {
  register: (userData) => request({
    url: '/api/auth/register',
    method: 'post',
    data: userData,
    timeout: 30000, // 30 seconds timeout
    retry: 3, // Auto retry count
    retryDelay: 2000, // Retry interval
    transformResponse: [(data) => {
      try {
        // Try to parse response data
        const parsedData = JSON.parse(data);
        console.log('Registration response data:', parsedData);

        // If registration successful, immediately save token
        if (parsedData.success && parsedData.token) {
          console.log(`Received token(${typeof parsedData.token}):`, parsedData.token.substring(0, 20) + '...');
          if (typeof parsedData.token === 'string' && parsedData.token.trim() !== '') {
            localStorage.setItem('token', parsedData.token);
            console.log('Saved registration token');
          } else {
            console.error('Invalid token format received:', parsedData.token);
          }
        } else {
          console.log('No token in registration response or registration failed');
        }

        return parsedData;
      } catch (e) {
        console.error('Error converting registration response:', e);
        console.error('Original data:', data);
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
        // Compatible with multiple structures
        if (parsedData.data) {
          // Compatible with {code, data:{token, user}} or {data:{token, user}}
          parsedData = { ...parsedData, ...parsedData.data };
        }
        localStorage.setItem('loginId', parsedData.user.userId)
        localStorage.setItem('money', parsedData.user.money)
        localStorage.setItem('totalOrders', parsedData.user.totalOrders)

        // Standardize return
        return {
          success: parsedData.success !== undefined ? parsedData.success : parsedData.code === 200,
          token: parsedData.token,
          user: parsedData.user,
          message: parsedData.message || parsedData.msg || '',
          ...parsedData
        };
      } catch (e) {
        console.error('Error converting login response:', e);
        return { success: false, message: 'Invalid username or password' };
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
    timeout: 15000 // 15 seconds timeout
  }),

  // Verification related
  verifyEmail: (email, code) => request({
    url: '/api/auth/verify-email',
    method: 'post',
    data: { email, code },
    timeout: 20000, // 20 seconds timeout
    retry: 2, // Auto retry count
    retryDelay: 2000 // Retry interval
  }),
  sendEmailCode: (email) => request({
    url: '/api/auth/send-email-code',
    method: 'post',
    data: { email },
    timeout: 30000, // Increase timeout to 30 seconds
    retry: 3, // Increase retry count to 3
    retryDelay: 2000, // Retry interval 2 seconds
    transformResponse: [(data) => {
      try {
        // Try to parse response data
        let result;
        if (typeof data === 'string') {
          result = JSON.parse(data);
        } else {
          result = data;
        }
        console.log('Email verification code response parse result:', result);

        // Ensure return standard format result
        if (result) {
          const standardResult = {
            success: result.success || false,
            message: result.message || 'Verification code sent',
            code: result.code || null
          };

          // Handle different response structures
          if (result.data) {
            standardResult.success = result.data.success || standardResult.success;
            standardResult.message = result.data.message || standardResult.message;
            standardResult.code = result.data.code || standardResult.code;
          }

          return standardResult;
        }
        return result;
      } catch (e) {
        console.error('Error converting email verification code response:', e);
        console.error('Original data:', data);
        return {
          success: false,
          message: 'Failed to parse verification code response'
        };
      }
    }]
  }),

  // Password recovery
  forgotPassword: (email) => request({
    url: '/api/auth/forgot-password',
    method: 'post',
    data: { email },
    timeout: 10000 // 10 seconds timeout
  }),
  resetPassword: (data) => request({
    url: '/api/auth/reset-password',
    method: 'post',
    data: data,
    timeout: 10000 // 10 seconds timeout
  }),

  // User management APIs
  getAllUsers: () => request({
    url: '/api/users',
    method: 'get',
    timeout: 10000 // 10 seconds timeout
  }),
  getUserById: (id) => request({
    url: `/api/users/${id}`,
    method: 'get',
    timeout: 10000 // 10 seconds timeout
  }),
  updateUser: (id, userData) => request({
    url: `/api/users/${id}`,
    method: 'put',
    data: userData,
    timeout: 10000 // 10 seconds timeout
  }),
  deleteUser: (id) => request({
    url: `/api/users/${id}`,
    method: 'delete',
    timeout: 10000 // 10 seconds timeout
  }),
  getUserStats: () => request({
    url: '/api/users/stats',
    method: 'get',
    timeout: 10000 // 10 seconds timeout
  }),

  // Deactivate user account
  deactivateAccount: () => {
    // Get token
    const token = localStorage.getItem('token');

    return request({
      url: '/api/auth/deactivate',
      method: 'delete',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      timeout: 10000 // 10 seconds timeout
    });
  },

  // Change password
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

  // Deactivate account
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
        console.log('Original response data:', data);
        const parsedData = typeof data === 'string' ? JSON.parse(data) : data;
        console.log('Parsed data:', parsedData);

        // Process order data
        let orders = [];
        if (Array.isArray(parsedData)) {
          orders = parsedData;
        } else if (parsedData.data && Array.isArray(parsedData.data)) {
          orders = parsedData.data;
        } else if (parsedData.orders && Array.isArray(parsedData.orders)) {
          orders = parsedData.orders;
        }

        // Print original time data for each order
        orders.forEach(order => {
          console.log('Order original time data:', {
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
        console.error('Error parsing order data:', e);
        return { success: false, message: 'Failed to parse order data' };
      }
    }]
  })
};
