import { defineStore } from 'pinia';

export const useDeviceStore = defineStore('device', {
  state: () => ({
    devices: [
      {
        id: 'SCT001',
        name: 'Scooter #001',
        status: 'online',
        location: 'Wenjiao Road, Xihu District',
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
        name: 'Scooter #002',
        status: 'online',
        location: 'Wenyi Road, Xihu District',
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
        name: 'Scooter #003',
        status: 'maintenance',
        location: 'Liangzhu Street, Yuhang District',
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
        name: 'Scooter #004',
        status: 'offline',
        location: 'Hubin Road, Shangcheng District',
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
        name: 'Scooter #005',
        status: 'online',
        location: 'Jiangnan Avenue, Binjiang District',
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
        name: 'Scooter #006',
        status: 'low_battery',
        location: 'Moganshan Road, Gongshu District',
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
        // In a real application, this should call an API to get the device list
        // Here we use mock data, keeping the data in state unchanged
        // const response = await api.get('/devices');
        // this.devices = response.data;
        console.log('Loaded device data:', this.devices.length, 'records');
        this.loading = false;
      } catch (error) {
        console.error('Failed to fetch device data:', error);
        this.error = 'Failed to fetch device list';
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
        // In a real application, this should call an API to update device status
        console.log(`Updated device ${deviceId} status to ${status}`);
      }
    }
  }
}); 