import { defineStore } from 'pinia';

export const useDeviceStore = defineStore('device', {
  state: () => ({
    devices: [
      {
        id: 'SCT001',
        name: '滑板车 #001',
        status: 'online',
        location: '西湖区文教路',
        battery: 87,
        lastActive: '2025-05-05 08:30:24',
        totalUsage: 128,
        totalDistance: 356.2,
        avgRideTime: 23,
        deploymentDate: '2025-01-15',
        lastMaintenance: '2025-04-20',
        nextMaintenance: '2025-06-20'
      },
      {
        id: 'SCT002',
        name: '滑板车 #002',
        status: 'online',
        location: '西湖区文一路',
        battery: 65,
        lastActive: '2025-05-05 09:15:42',
        totalUsage: 95,
        totalDistance: 278.5,
        avgRideTime: 19,
        deploymentDate: '2025-01-20',
        lastMaintenance: '2025-04-15',
        nextMaintenance: '2025-06-15'
      },
      {
        id: 'SCT003',
        name: '滑板车 #003',
        status: 'maintenance',
        location: '余杭区良渚街道',
        battery: 12,
        lastActive: '2025-05-04 16:28:03',
        totalUsage: 157,
        totalDistance: 423.1,
        avgRideTime: 25,
        deploymentDate: '2025-01-10',
        lastMaintenance: '2025-05-05',
        nextMaintenance: '2025-07-05'
      },
      {
        id: 'SCT004',
        name: '滑板车 #004',
        status: 'offline',
        location: '上城区湖滨路',
        battery: 0,
        lastActive: '2025-05-03 10:45:17',
        totalUsage: 112,
        totalDistance: 315.8,
        avgRideTime: 21,
        deploymentDate: '2025-01-25',
        lastMaintenance: '2025-04-01',
        nextMaintenance: '2025-06-01'
      },
      {
        id: 'SCT005',
        name: '滑板车 #005',
        status: 'online',
        location: '滨江区江南大道',
        battery: 92,
        lastActive: '2025-05-05 09:30:51',
        totalUsage: 73,
        totalDistance: 198.4,
        avgRideTime: 17,
        deploymentDate: '2025-02-01',
        lastMaintenance: '2025-04-25',
        nextMaintenance: '2025-06-25'
      },
      {
        id: 'SCT006',
        name: '滑板车 #006',
        status: 'low_battery',
        location: '拱墅区莫干山路',
        battery: 15,
        lastActive: '2025-05-05 08:12:33',
        totalUsage: 89,
        totalDistance: 245.6,
        avgRideTime: 20,
        deploymentDate: '2025-02-05',
        lastMaintenance: '2025-04-10',
        nextMaintenance: '2025-06-10'
      }
    ],
    selectedDevice: null,
    loading: false,
    error: null
  }),
  
  getters: {
    getDeviceById: (state) => (id) => {
      return state.devices.find(device => device.id === id) || null;
    },
    
    availableDevices: (state) => {
      return state.devices.filter(device => device.status === 'online');
    },
    
    maintenanceDevices: (state) => {
      return state.devices.filter(device => device.status === 'maintenance');
    },
    
    offlineDevices: (state) => {
      return state.devices.filter(device => 
        device.status === 'offline' || device.status === 'low_battery'
      );
    },
    
    deviceStats: (state) => {
      return {
        total: state.devices.length,
        online: state.devices.filter(d => d.status === 'online').length,
        maintenance: state.devices.filter(d => d.status === 'maintenance').length,
        offline: state.devices.filter(d => d.status === 'offline').length,
        lowBattery: state.devices.filter(d => d.status === 'low_battery').length
      };
    }
  },
  
  actions: {
    async fetchDevices() {
      this.loading = true;
      try {
        // 在实际应用中这里应该调用API获取设备列表
        // 这里我们使用模拟数据，保持state中的数据不变
        // const response = await api.get('/devices');
        // this.devices = response.data;
        console.log('已加载设备数据:', this.devices.length, '条记录');
        this.loading = false;
      } catch (error) {
        console.error('获取设备数据失败:', error);
        this.error = '获取设备列表失败';
        this.loading = false;
      }
    },
    
    selectDevice(deviceId) {
      this.selectedDevice = this.getDeviceById(deviceId);
    },
    
    updateDeviceStatus(deviceId, status) {
      const device = this.getDeviceById(deviceId);
      if (device) {
        device.status = status;
        // 在实际应用中这里应该调用API更新设备状态
        console.log(`已更新设备 ${deviceId} 状态为 ${status}`);
      }
    }
  }
}); 