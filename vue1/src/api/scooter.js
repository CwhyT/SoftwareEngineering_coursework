import api from './index';

// Electric scooter management APIs
export const scooterApi = {
  // Get scooter list
  getAllScooters: () => api.get('/scooters'),

  // Get scooter statistics
  getScooterStats: () => api.get('/scooters/stats'),

  // Get single scooter
  getScooterById: (id) => api.get(`/scooters/${id}`),

  // Create scooter
  createScooter: (data) => api.post('/scooters', data),

  // Update scooter
  updateScooter: (id, data) => api.put(`/scooters/${id}`, data),

  // Delete scooter
  deleteScooter: (id) => api.delete(`/scooters/${id}`),

  // Update scooter status
  updateScooterStatus: (id, status) => api.put(`/scooters/${id}/status`, { status }),

  // Update scooter location
  updateScooterLocation: (id, location) => api.put(`/scooters/${id}/location`, location),

  // Get nearby scooters
  getNearbyScooters: (lat, lng, radius) => api.get(`/scooters/nearby?lat=${lat}&lng=${lng}&radius=${radius || 1000}`)
}; 