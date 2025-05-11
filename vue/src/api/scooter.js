import api from './index';

// 电动车管理API
export const scooterApi = {
  // 获取电动车列表
  getAllScooters: () => api.get('/scooters'),
  
  // 获取电动车统计
  getScooterStats: () => api.get('/scooters/stats'),
  
  // 获取单个电动车
  getScooterById: (id) => api.get(`/scooters/${id}`),
  
  // 创建电动车
  createScooter: (data) => api.post('/scooters', data),
  
  // 更新电动车
  updateScooter: (id, data) => api.put(`/scooters/${id}`, data),
  
  // 删除电动车
  deleteScooter: (id) => api.delete(`/scooters/${id}`),
  
  // 更新电动车状态
  updateScooterStatus: (id, status) => api.put(`/scooters/${id}/status`, { status }),
  
  // 更新电动车位置
  updateScooterLocation: (id, location) => api.put(`/scooters/${id}/location`, location),
  
  // 获取附近电动车
  getNearbyScooters: (lat, lng, radius) => api.get(`/scooters/nearby?lat=${lat}&lng=${lng}&radius=${radius || 1000}`)
}; 