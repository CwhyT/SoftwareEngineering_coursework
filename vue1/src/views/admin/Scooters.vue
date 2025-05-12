<template>
  <div class="scooters-page">
    <h1 class="title">Scooter Management</h1>
    
    <div class="filter-bar">
      <div class="filter-group">
        <span class="filter-label">Status:</span>
        <select class="filter-select" v-model="statusFilter">
          <option value="all">All</option>
          <option value="available">Available</option>
          <option value="in-use">In Use</option>
          <option value="maintenance">Maintenance</option>
          <option value="offline">Offline</option>
        </select>
      </div>
      
      <div class="filter-group">
        <span class="filter-label">Battery Level:</span>
        <select class="filter-select" v-model="batteryFilter">
          <option value="all">All</option>
          <option value="high">High (>80%)</option>
          <option value="medium">Medium (20-80%)</option>
          <option value="low">Low (<20%)</option>
        </select>
      </div>
      
      <div class="search-group">
        <input 
          type="text" 
          class="search-input" 
          placeholder="Search by ID or location..."
          v-model="searchQuery"
        >
      </div>
      
      <button class="add-btn" @click="showAddDialog = true">
        <i class="fas fa-plus"></i> Add Scooter
      </button>
    </div>

    <div class="stats-cards">
      <div class="stat-card primary">
        <div class="stat-icon">🛴</div>
        <div class="stat-content">
          <div class="stat-number">156</div>
          <div class="stat-label">Total Scooters</div>
        </div>
        <div class="stat-change up">+12</div>
      </div>

      <div class="stat-card success">
        <div class="stat-icon">✓</div>
        <div class="stat-content">
          <div class="stat-number">98</div>
          <div class="stat-label">Available</div>
        </div>
        <div class="stat-change up">+5</div>
      </div>

      <div class="stat-card warning">
        <div class="stat-icon">⚡</div>
        <div class="stat-content">
          <div class="stat-number">45</div>
          <div class="stat-label">Low Battery</div>
        </div>
        <div class="stat-change down">-8</div>
      </div>

      <div class="stat-card danger">
        <div class="stat-icon">🔧</div>
        <div class="stat-content">
          <div class="stat-number">13</div>
          <div class="stat-label">Maintenance</div>
        </div>
        <div class="stat-change up">+3</div>
      </div>
    </div>

    <div class="scooters-grid">
      <div v-for="scooter in filteredScooters" :key="scooter.id" class="scooter-card">
        <div class="scooter-header">
          <span class="scooter-id">#{{ scooter.id }}</span>
          <span :class="['status-badge', scooter.status]">{{ getStatusText(scooter.status) }}</span>
        </div>
        
        <div class="scooter-info">
          <div class="info-item">
            <i class="fas fa-map-marker-alt"></i>
            <span>{{ scooter.location }}</span>
          </div>
          <div class="info-item">
            <i class="fas fa-battery-three-quarters"></i>
            <span>{{ scooter.battery }}%</span>
          </div>
          <div class="info-item">
            <i class="fas fa-tachometer-alt"></i>
            <span>{{ scooter.mileage }}km</span>
          </div>
        </div>
        
        <div class="scooter-actions">
          <button class="action-btn edit" @click="editScooter(scooter)">
            <i class="fas fa-edit"></i>
          </button>
          <button class="action-btn maintenance" @click="showMaintenanceDialog(scooter)">
            <i class="fas fa-tools"></i>
          </button>
          <button class="action-btn delete" @click="deleteScooter(scooter)">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </div>
    </div>

    <!-- Add Scooter Dialog -->
    <div class="dialog" v-if="showAddDialog">
      <div class="dialog-content">
        <h2>Add New Scooter</h2>
        <form @submit.prevent="addScooter">
          <div class="form-group">
            <label>Scooter ID</label>
            <input type="text" v-model="newScooter.id" required>
          </div>
          <div class="form-group">
            <label>Location</label>
            <input type="text" v-model="newScooter.location" required>
          </div>
          <div class="form-group">
            <label>Battery Level</label>
            <input type="number" v-model="newScooter.battery" min="0" max="100" required>
          </div>
          <div class="dialog-actions">
            <button type="button" class="cancel-btn" @click="showAddDialog = false">Cancel</button>
            <button type="submit" class="confirm-btn">Add</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Maintenance Dialog -->
    <div class="dialog" v-if="showMaintenanceDialog">
      <div class="dialog-content">
        <h2>Maintenance Record</h2>
        <form @submit.prevent="submitMaintenance">
          <div class="form-group">
            <label>Issue Description</label>
            <textarea v-model="maintenanceRecord.description" required></textarea>
          </div>
          <div class="form-group">
            <label>Estimated Duration (days)</label>
            <input type="number" v-model="maintenanceRecord.duration" min="1" required>
          </div>
          <div class="dialog-actions">
            <button type="button" class="cancel-btn" @click="showMaintenanceDialog = false">Cancel</button>
            <button type="submit" class="confirm-btn">Submit</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'

// State
const statusFilter = ref('all')
const batteryFilter = ref('all')
const searchQuery = ref('')
const showAddDialog = ref(false)
const showMaintenanceDialog = ref(false)
const selectedScooter = ref(null)

const newScooter = ref({
  id: '',
  location: '',
  battery: 100
})

const maintenanceRecord = ref({
  description: '',
  duration: 1
})

// Mock data
const scooters = ref([
  {
    id: 'SC001',
    status: 'available',
    location: 'Tech Park',
    battery: 85,
    mileage: 120
  },
  {
    id: 'SC002',
    status: 'in-use',
    location: 'University District',
    battery: 45,
    mileage: 230
  },
  {
    id: 'SC003',
    status: 'maintenance',
    location: 'Central Park',
    battery: 0,
    mileage: 150
  }
])

// Computed
const filteredScooters = computed(() => {
  return scooters.value.filter(scooter => {
    const matchesStatus = statusFilter.value === 'all' || scooter.status === statusFilter.value
    const matchesBattery = batteryFilter.value === 'all' || 
      (batteryFilter.value === 'high' && scooter.battery > 80) ||
      (batteryFilter.value === 'medium' && scooter.battery >= 20 && scooter.battery <= 80) ||
      (batteryFilter.value === 'low' && scooter.battery < 20)
    const matchesSearch = !searchQuery.value || 
      scooter.id.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      scooter.location.toLowerCase().includes(searchQuery.value.toLowerCase())
    
    return matchesStatus && matchesBattery && matchesSearch
  })
})

// Methods
const getStatusText = (status) => {
  const statusMap = {
    available: 'Available',
    'in-use': 'In Use',
    maintenance: 'Maintenance',
    offline: 'Offline'
  }
  return statusMap[status] || status
}

const addScooter = () => {
  scooters.value.push({
    ...newScooter.value,
    status: 'available',
    mileage: 0
  })
  showAddDialog.value = false
  newScooter.value = {
    id: '',
    location: '',
    battery: 100
  }
  ElMessage.success('Scooter added successfully')
}

const editScooter = (scooter) => {
  selectedScooter.value = scooter
  // Implement edit logic
}

const showMaintenanceDialog = (scooter) => {
  selectedScooter.value = scooter
  showMaintenanceDialog.value = true
}

const submitMaintenance = () => {
  if (selectedScooter.value) {
    selectedScooter.value.status = 'maintenance'
    // Add maintenance record logic here
    showMaintenanceDialog.value = false
    ElMessage.success('Maintenance record submitted')
  }
}

const deleteScooter = (scooter) => {
  ElMessageBox.confirm(
    'Are you sure you want to delete this scooter?',
    'Warning',
    {
      confirmButtonText: 'Confirm',
      cancelButtonText: 'Cancel',
      type: 'warning'
    }
  ).then(() => {
    const index = scooters.value.findIndex(s => s.id === scooter.id)
    if (index !== -1) {
      scooters.value.splice(index, 1)
      ElMessage.success('Scooter deleted successfully')
    }
  }).catch(() => {})
}
</script>

<style scoped>
.scooters-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.title {
  text-align: center;
  margin-bottom: 30px;
  color: #2c3e50;
}

.filter-bar {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 15px;
  align-items: center;
}

.filter-group {
  display: flex;
  align-items: center;
}

.filter-label {
  margin-right: 8px;
  color: #666;
  white-space: nowrap;
}

.filter-select {
  padding: 6px 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  outline: none;
}

.search-group {
  flex: 1;
  max-width: 300px;
}

.search-input {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  outline: none;
}

.add-btn {
  background-color: #16a085;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 15px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
}

.stats-cards {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  margin-bottom: 20px;
}

@media (min-width: 768px) {
  .stats-cards {
    grid-template-columns: repeat(4, 1fr);
  }
}

.stat-card {
  display: flex;
  align-items: center;
  background-color: white;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
}

.stat-card.primary {
  border-left: 4px solid #3498db;
}

.stat-card.success {
  border-left: 4px solid #2ecc71;
}

.stat-card.warning {
  border-left: 4px solid #f1c40f;
}

.stat-card.danger {
  border-left: 4px solid #e74c3c;
}

.stat-icon {
  font-size: 1.8rem;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  color: #34495e;
}

.stat-content {
  flex: 1;
}

.stat-number {
  font-size: 1.3rem;
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 3px;
}

.stat-label {
  color: #7f8c8d;
  font-size: 0.85rem;
}

.stat-change {
  font-size: 0.9rem;
  font-weight: 500;
  padding: 3px 6px;
  border-radius: 12px;
}

.stat-change.up {
  color: #2ecc71;
  background-color: rgba(46, 204, 113, 0.1);
}

.stat-change.down {
  color: #e74c3c;
  background-color: rgba(231, 76, 60, 0.1);
}

.scooters-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}

.scooter-card {
  background-color: white;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
}

.scooter-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.scooter-id {
  font-weight: bold;
  color: #2c3e50;
}

.status-badge {
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.85rem;
  font-weight: 500;
}

.status-badge.available {
  background-color: rgba(46, 204, 113, 0.1);
  color: #2ecc71;
}

.status-badge.in-use {
  background-color: rgba(52, 152, 219, 0.1);
  color: #3498db;
}

.status-badge.maintenance {
  background-color: rgba(241, 196, 15, 0.1);
  color: #f1c40f;
}

.status-badge.offline {
  background-color: rgba(231, 76, 60, 0.1);
  color: #e74c3c;
}

.scooter-info {
  margin-bottom: 15px;
}

.info-item {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  color: #7f8c8d;
}

.info-item i {
  width: 20px;
  margin-right: 8px;
  color: #34495e;
}

.scooter-actions {
  display: flex;
  gap: 10px;
}

.action-btn {
  flex: 1;
  padding: 8px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.action-btn.edit {
  background-color: #3498db;
}

.action-btn.maintenance {
  background-color: #f1c40f;
}

.action-btn.delete {
  background-color: #e74c3c;
}

.dialog {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.dialog-content {
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  width: 100%;
  max-width: 500px;
}

.dialog-content h2 {
  margin-bottom: 20px;
  color: #2c3e50;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  color: #666;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  outline: none;
}

.form-group textarea {
  height: 100px;
  resize: vertical;
}

.dialog-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}

.cancel-btn,
.confirm-btn {
  padding: 8px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.cancel-btn {
  background-color: #95a5a6;
  color: white;
}

.confirm-btn {
  background-color: #16a085;
  color: white;
}
</style> 