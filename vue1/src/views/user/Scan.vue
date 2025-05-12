<template>
  <div class="scan-container">
    <h1 class="text-2xl font-bold text-center mb-6">Scan to Rent</h1>
    <div class="scan-box">
      <div class="camera-view">
        <el-icon class="scan-icon"><Camera /></el-icon>
        <p class="text-gray-500 mt-3">Please align the QR code with the scan frame</p>
      </div>
      <el-button type="primary" class="scan-btn" @click="handleScan">Start Scanning</el-button>
      
      <div class="mt-4 text-center">
        <el-button type="text" @click="router.push('/rent')">
          Back to Vehicle List
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage, ElMessageBox } from 'element-plus';
import { Camera } from '@element-plus/icons-vue';

const router = useRouter();
const isScanActive = ref(false);

// Simulate scanning functionality
const handleScan = async () => {
  if (isScanActive.value) return;
  
  isScanActive.value = true;
  ElMessage.info({
    message: 'Scanning...',
    duration: 1500
  });
  
  // Simulate scanning delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Simulate finding a vehicle
  const scannedScooterId = 'A' + Math.floor(1000 + Math.random() * 9000);
  
  ElMessageBox.confirm(
    `Scanned vehicle: ${scannedScooterId}, Battery: 85%, Confirm rental?`,
    'Scan Successful',
    {
      confirmButtonText: 'Confirm Rental',
      cancelButtonText: 'Cancel',
      type: 'success'
    }
  ).then(() => {
    ElMessage({
      type: 'success',
      message: 'Rental successful, unlocking vehicle...',
      duration: 1500
    });
    setTimeout(() => {
      router.push('/payment');
    }, 1000);
  }).catch(() => {
    ElMessage({
      type: 'info',
      message: 'Rental cancelled',
      duration: 1500
    });
  }).finally(() => {
    isScanActive.value = false;
  });
};

onMounted(() => {
  console.log('Scan page loaded');
  
  // Camera permission request prompt
  ElMessage({
    message: 'Please allow camera access to scan vehicle QR code',
    type: 'info',
    duration: 1500
  });
});
</script>

<style scoped>
.scan-container {
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background-color: #f8f9fa;
}

.scan-box {
  margin-top: 30px;
  width: 300px;
  height: 380px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid #dcdfe6;
  border-radius: 12px;
  background: #ffffff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  padding: 20px;
}

.camera-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 250px;
  height: 250px;
  border: 2px dashed #409eff;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.camera-view::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: #409eff;
  animation: scan 2s linear infinite;
}

@keyframes scan {
  0% { top: 0; }
  50% { top: 100%; }
  51% { top: 100%; }
  100% { top: 0; }
}

.scan-icon {
  font-size: 64px;
  color: #409eff;
  margin-bottom: 16px;
}

.scan-btn {
  margin-top: 24px;
  width: 200px;
}
</style>
