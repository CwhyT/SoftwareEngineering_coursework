import api from './index';

// 订单管理API
export const orderApi = {
  // 创建订单
  createOrder: (data) => api.post('/orders', data),
  
  // 获取所有订单（管理员）
  getAllOrders: () => api.get('/orders'),
  
  // 获取用户订单
  getUserOrders: () => api.get('/orders/my-orders'),
  
  // 获取单个订单
  getOrderById: (id) => api.get(`/orders/${id}`),
  
  // 结束订单
  endOrder: (id, data) => api.put(`/orders/${id}/end`, data),
  
  // 取消订单
  cancelOrder: (id) => api.put(`/orders/${id}/cancel`),
  
  // 获取订单统计
  getOrderStats: () => api.get('/orders/stats')
}; 