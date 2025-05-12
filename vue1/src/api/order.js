import api from './index';

// Order management APIs
export const orderApi = {
  // Create order
  createOrder: (data) => api.post('/orders', data),

  // Get all orders (admin)
  getAllOrders: () => api.get('/orders'),

  // Get user orders
  getUserOrders: () => api.get('/orders/my-orders'),

  // Get single order
  getOrderById: (id) => api.get(`/orders/${id}`),

  // End order
  endOrder: (id, data) => api.put(`/orders/${id}/end`, data),

  // Cancel order
  cancelOrder: (id) => api.put(`/orders/${id}/cancel`),

  // Get order statistics
  getOrderStats: () => api.get('/orders/stats')
}; 