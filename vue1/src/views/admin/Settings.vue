<template>
  <div class="settings-page">
    <div class="mb-6">
      <h1 class="text-2xl font-bold">System Settings</h1>
      <p class="text-gray-600">Manage system configuration and parameters</p>
    </div>

    <!-- 设置选项卡 -->
    <el-card shadow="hover" class="mb-6">
      <el-tabs v-model="activeTab">
        <el-tab-pane label="Basic Settings" name="general">
          <div class="py-4">
            <h2 class="text-lg font-medium mb-4">Basic Settings</h2>
            
            <el-form label-width="180px" label-position="left" :model="generalSettings">
              <el-form-item label="System Name">
                <el-input v-model="generalSettings.systemName" placeholder="Electric Scooter Rental System" />
              </el-form-item>
              
              <el-form-item label="Company Name">
                <el-input v-model="generalSettings.companyName" placeholder="Your Company Name" />
              </el-form-item>
              
              <el-form-item label="Contact Phone">
                <el-input v-model="generalSettings.contactPhone" placeholder="Customer Service Phone" />
              </el-form-item>
              
              <el-form-item label="Service Email">
                <el-input v-model="generalSettings.serviceEmail" placeholder="Customer Service Email" />
              </el-form-item>
              
              <el-form-item label="Website Domain">
                <el-input v-model="generalSettings.websiteDomain" placeholder="Your Website Domain" />
              </el-form-item>
              
              <el-form-item label="System Timezone">
                <el-select v-model="generalSettings.timezone" placeholder="Select Timezone" style="width: 100%">
                  <el-option label="Beijing Time (GMT+8)" value="Asia/Shanghai" />
                  <el-option label="Tokyo Time (GMT+9)" value="Asia/Tokyo" />
                  <el-option label="London Time (GMT+0)" value="Europe/London" />
                  <el-option label="New York Time (GMT-5)" value="America/New_York" />
                </el-select>
              </el-form-item>
              
              <el-form-item label="System Currency">
                <el-select v-model="generalSettings.currency" placeholder="Select Currency" style="width: 100%">
                  <el-option label="Chinese Yuan (CNY)" value="CNY" />
                  <el-option label="US Dollar (USD)" value="USD" />
                  <el-option label="Euro (EUR)" value="EUR" />
                  <el-option label="Japanese Yen (JPY)" value="JPY" />
                </el-select>
              </el-form-item>
              
              <el-form-item label="Maintenance Mode">
                <el-switch
                  v-model="generalSettings.maintenanceMode"
                  active-text="Enable"
                  inactive-text="Disable"
                />
              </el-form-item>
              
              <el-form-item>
                <el-button type="primary" @click="saveGeneralSettings">Save Settings</el-button>
                <el-button @click="resetGeneralSettings">Reset</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>
        
        <el-tab-pane label="Rental Settings" name="rental">
          <div class="py-4">
            <h2 class="text-lg font-medium mb-4">Rental Parameter Settings</h2>
            
            <el-form label-width="180px" label-position="left" :model="rentalSettings">
              <el-form-item label="Base Riding Rate (yuan/minute)">
                <el-input-number v-model="rentalSettings.baseRate" :min="0" :precision="2" :step="0.1" />
              </el-form-item>
              
              <el-form-item label="Deposit Amount (yuan)">
                <el-input-number v-model="rentalSettings.depositAmount" :min="0" :precision="2" :step="10" />
              </el-form-item>
              
              <el-form-item label="Riding Time Limit (minutes)">
                <el-input-number v-model="rentalSettings.maxRideTime" :min="0" :step="10" />
              </el-form-item>
              
              <el-form-item label="Reservation Time (minutes)">
                <el-input-number v-model="rentalSettings.reservationTime" :min="0" :step="5" />
              </el-form-item>
              
              <el-form-item label="Overtime Rate (yuan/minute)">
                <el-input-number v-model="rentalSettings.overtimeRate" :min="0" :precision="2" :step="0.1" />
              </el-form-item>
              
              <el-form-item label="Monthly Pass Price (yuan)">
                <el-input-number v-model="rentalSettings.monthlyPassPrice" :min="0" :precision="2" :step="10" />
              </el-form-item>
              
              <el-form-item label="Quarterly Pass Price (yuan)">
                <el-input-number v-model="rentalSettings.quarterlyPassPrice" :min="0" :precision="2" :step="10" />
              </el-form-item>
              
              <el-form-item label="Yearly Pass Price (yuan)">
                <el-input-number v-model="rentalSettings.yearlyPassPrice" :min="0" :precision="2" :step="10" />
              </el-form-item>
              
              <el-form-item label="Free Riding Time (minutes)">
                <el-input-number v-model="rentalSettings.freeRideTime" :min="0" :step="5" />
              </el-form-item>
              
              <el-form-item>
                <el-button type="primary" @click="saveRentalSettings">Save Settings</el-button>
                <el-button @click="resetRentalSettings">Reset</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>
        
        <el-tab-pane label="User Settings" name="user">
          <div class="py-4">
            <h2 class="text-lg font-medium mb-4">User Settings</h2>
            
            <el-form label-width="180px" label-position="left" :model="userSettings">
              <el-form-item label="Default Registration Role">
                <el-select v-model="userSettings.defaultRole" placeholder="Select Default Role" style="width: 100%">
                  <el-option label="Normal User" value="user" />
                  <el-option label="Member User" value="member" />
                </el-select>
              </el-form-item>
              
              <el-form-item label="Require Email Verification">
                <el-switch
                  v-model="userSettings.requireEmailVerification"
                  active-text="Yes"
                  inactive-text="No"
                />
              </el-form-item>
              
              <el-form-item label="Require Phone Verification">
                <el-switch
                  v-model="userSettings.requirePhoneVerification"
                  active-text="Yes"
                  inactive-text="No"
                />
              </el-form-item>
              
              <el-form-item label="Login Failure Attempts">
                <el-input-number v-model="userSettings.maxLoginAttempts" :min="1" :max="10" />
              </el-form-item>
              
              <el-form-item label="Lockout Time (minutes)">
                <el-input-number v-model="userSettings.lockoutTime" :min="5" :step="5" />
              </el-form-item>
              
              <el-form-item label="Password Minimum Length">
                <el-input-number v-model="userSettings.minPasswordLength" :min="6" :max="20" />
              </el-form-item>
              
              <el-form-item label="Password Complexity Requirements">
                <el-checkbox-group v-model="userSettings.passwordRequirements">
                  <el-checkbox label="uppercase">Contains Uppercase Letters</el-checkbox>
                  <el-checkbox label="lowercase">Contains Lowercase Letters</el-checkbox>
                  <el-checkbox label="numbers">Contains Numbers</el-checkbox>
                  <el-checkbox label="special">Contains Special Characters</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              
              <el-form-item label="User Behavior Tracking">
                <el-switch
                  v-model="userSettings.trackUserBehavior"
                  active-text="Enable"
                  inactive-text="Disable"
                />
              </el-form-item>
              
              <el-form-item>
                <el-button type="primary" @click="saveUserSettings">Save Settings</el-button>
                <el-button @click="resetUserSettings">Reset</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>
        
        <el-tab-pane label="Notification Settings" name="notification">
          <div class="py-4">
            <h2 class="text-lg font-medium mb-4">Notification Settings</h2>
            
            <el-form label-width="180px" label-position="left" :model="notificationSettings">
              <el-form-item label="System Notifications">
                <el-switch
                  v-model="notificationSettings.systemNotifications"
                  active-text="Enable"
                  inactive-text="Disable"
                />
              </el-form-item>
              
              <el-form-item label="Email Notifications">
                <el-switch
                  v-model="notificationSettings.emailNotifications"
                  active-text="Enable"
                  inactive-text="Disable"
                />
              </el-form-item>
              
              <el-form-item label="SMS Notifications">
                <el-switch
                  v-model="notificationSettings.smsNotifications"
                  active-text="Enable"
                  inactive-text="Disable"
                />
              </el-form-item>
              
              <el-form-item label="Push Notifications">
                <el-switch
                  v-model="notificationSettings.pushNotifications"
                  active-text="Enable"
                  inactive-text="Disable"
                />
              </el-form-item>
              
              <h3 class="text-md font-medium my-4">Notification Types</h3>
              
              <el-form-item label="Order Confirmation">
                <el-checkbox-group v-model="notificationSettings.orderConfirmation">
                  <el-checkbox label="email">Email</el-checkbox>
                  <el-checkbox label="sms">SMS</el-checkbox>
                  <el-checkbox label="push">Push</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              
              <el-form-item label="Rental Start Notification">
                <el-checkbox-group v-model="notificationSettings.rentalStart">
                  <el-checkbox label="email">Email</el-checkbox>
                  <el-checkbox label="sms">SMS</el-checkbox>
                  <el-checkbox label="push">Push</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              
              <el-form-item label="Rental End Notification">
                <el-checkbox-group v-model="notificationSettings.rentalEnd">
                  <el-checkbox label="email">Email</el-checkbox>
                  <el-checkbox label="sms">SMS</el-checkbox>
                  <el-checkbox label="push">Push</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              
              <el-form-item label="Payment Success Notification">
                <el-checkbox-group v-model="notificationSettings.paymentSuccess">
                  <el-checkbox label="email">Email</el-checkbox>
                  <el-checkbox label="sms">SMS</el-checkbox>
                  <el-checkbox label="push">Push</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              
              <el-form-item>
                <el-button type="primary" @click="saveNotificationSettings">Save Settings</el-button>
                <el-button @click="resetNotificationSettings">Reset</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>
        
        <el-tab-pane label="System Logs" name="logs">
          <div class="py-4">
            <div class="flex justify-between items-center mb-4">
              <h2 class="text-lg font-medium">System Logs</h2>
              <div>
                <el-button type="primary" @click="refreshLogs">
                  <el-icon class="mr-1"><Refresh /></el-icon>
                  Refresh
                </el-button>
                <el-button @click="clearLogs">
                  <el-icon class="mr-1"><Delete /></el-icon>
                  Clear Logs
                </el-button>
              </div>
            </div>
            
            <el-table :data="logs" style="width: 100%" height="500">
              <el-table-column type="index" width="50" />
              <el-table-column prop="timestamp" label="Time" width="180" />
              <el-table-column prop="level" label="Level" width="100">
                <template #default="{ row }">
                  <el-tag :type="getLogLevelType(row.level)" size="small">
                    {{ row.level }}
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column prop="source" label="Source" width="150" />
              <el-table-column prop="message" label="Message" min-width="300" :show-overflow-tooltip="true" />
              <el-table-column prop="user" label="User" width="120" />
              <el-table-column label="Actions" width="80" fixed="right">
                <template #default="{ row }">
                  <el-button size="small" type="primary" plain @click="viewLogDetail(row)">
                    Details
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
            
            <!-- 分页 -->
            <div class="flex justify-end mt-4">
              <el-pagination
                v-model:current-page="currentPage"
                v-model:page-size="pageSize"
                :page-sizes="[10, 20, 50, 100]"
                :total="totalLogs"
                layout="total, sizes, prev, pager, next"
              />
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-card>
    
    <!-- 日志详情对话框 -->
    <el-dialog v-model="logDetailVisible" title="Log Details" width="600px">
      <div v-if="selectedLog">
        <div class="mb-4">
          <div class="text-sm text-gray-500 mb-1">Time</div>
          <div>{{ selectedLog.timestamp }}</div>
        </div>
        
        <div class="mb-4">
          <div class="text-sm text-gray-500 mb-1">Level</div>
          <el-tag :type="getLogLevelType(selectedLog.level)">
            {{ selectedLog.level }}
          </el-tag>
        </div>
        
        <div class="mb-4">
          <div class="text-sm text-gray-500 mb-1">Source</div>
          <div>{{ selectedLog.source }}</div>
        </div>
        
        <div class="mb-4">
          <div class="text-sm text-gray-500 mb-1">Message</div>
          <div class="p-3 bg-gray-50 rounded border border-gray-200 whitespace-pre-wrap">
            {{ selectedLog.message }}
          </div>
        </div>
        
        <div class="mb-4">
          <div class="text-sm text-gray-500 mb-1">User</div>
          <div>{{ selectedLog.user }}</div>
        </div>
        
        <div class="mb-4">
          <div class="text-sm text-gray-500 mb-1">IP Address</div>
          <div>{{ selectedLog.ip }}</div>
        </div>
        
        <div class="mb-4">
          <div class="text-sm text-gray-500 mb-1">User Agent</div>
          <div class="text-xs text-gray-700">{{ selectedLog.userAgent }}</div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { 
  Delete, 
  Refresh,
} from '@element-plus/icons-vue';

// 选项卡状态
const activeTab = ref('general');

// 基础设置
const generalSettings = ref({
  systemName: 'Electric Scooter Rental System',
  companyName: 'Smart Mobility Technology Co., Ltd.',
  contactPhone: '400-123-4567',
  serviceEmail: 'service@example.com',
  websiteDomain: 'www.example.com',
  timezone: 'Asia/Shanghai',
  currency: 'CNY',
  maintenanceMode: false
});

// 租赁设置
const rentalSettings = ref({
  baseRate: 0.5,
  depositAmount: 99,
  maxRideTime: 120,
  reservationTime: 15,
  overtimeRate: 1,
  monthlyPassPrice: 29.9,
  quarterlyPassPrice: 79.9,
  yearlyPassPrice: 299.9,
  freeRideTime: 15
});

// 用户设置
const userSettings = ref({
  defaultRole: 'user',
  requireEmailVerification: true,
  requirePhoneVerification: true,
  maxLoginAttempts: 5,
  lockoutTime: 30,
  minPasswordLength: 8,
  passwordRequirements: ['lowercase', 'numbers'],
  trackUserBehavior: true
});

// 通知设置
const notificationSettings = ref({
  systemNotifications: true,
  emailNotifications: true,
  smsNotifications: true,
  pushNotifications: true,
  orderConfirmation: ['email', 'push'],
  rentalStart: ['sms', 'push'],
  rentalEnd: ['sms', 'push'],
  paymentSuccess: ['email', 'push']
});

// 日志相关
const logs = ref([
  {
    id: 1,
    timestamp: '2024-03-25 10:15:23',
    level: 'INFO',
    source: 'User Login',
    message: 'User successfully logged in',
    user: 'admin',
    ip: '192.168.1.1',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
  },
  {
    id: 2,
    timestamp: '2024-03-25 09:45:12',
    level: 'WARNING',
    source: 'Vehicle Management',
    message: 'Vehicle battery low (ID: E1005)',
    user: 'system',
    ip: '192.168.1.10',
    userAgent: 'SystemMonitor/1.0'
  },
  {
    id: 3,
    timestamp: '2024-03-24 18:23:45',
    level: 'ERROR',
    source: 'Payment System',
    message: 'Payment processing failed: Bank returned error code DECLINED\nTransaction ID: TX12345678\nUser ID: 42\nAmount: ¥50.00',
    user: 'user42',
    ip: '192.168.1.42',
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1'
  },
  {
    id: 4,
    timestamp: '2024-03-24 15:10:33',
    level: 'INFO',
    source: 'Order System',
    message: 'New order created successfully (Order ID: ORD-2403-1234)',
    user: 'user78',
    ip: '192.168.1.78',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
  }
]);

const currentPage = ref(1);
const pageSize = ref(10);
const totalLogs = ref(42);
const logDetailVisible = ref(false);
const selectedLog = ref(null);

// 保存设置函数
function saveGeneralSettings() {
  ElMessage.success('Basic Settings have been saved');
}

function saveRentalSettings() {
  ElMessage.success('Rental Parameter Settings have been saved');
}

function saveUserSettings() {
  ElMessage.success('User Settings have been saved');
}

function saveNotificationSettings() {
  ElMessage.success('Notification Settings have been saved');
}

// 重置设置函数
function resetGeneralSettings() {
  ElMessageBox.confirm(
    'Are you sure you want to reset to default settings?',
    'Reset Confirmation',
    {
      confirmButtonText: 'Confirm',
      cancelButtonText: 'Cancel',
      type: 'warning'
    }
  ).then(() => {
    generalSettings.value = {
      systemName: 'Electric Scooter Rental System',
      companyName: 'Smart Mobility Technology Co., Ltd.',
      contactPhone: '400-123-4567',
      serviceEmail: 'service@example.com',
      websiteDomain: 'www.example.com',
      timezone: 'Asia/Shanghai',
      currency: 'CNY',
      maintenanceMode: false
    };
    ElMessage.success('Settings have been reset to default');
  });
}

function resetRentalSettings() {
  ElMessageBox.confirm(
    'Are you sure you want to reset to default settings?',
    'Reset Confirmation',
    {
      confirmButtonText: 'Confirm',
      cancelButtonText: 'Cancel',
      type: 'warning'
    }
  ).then(() => {
    rentalSettings.value = {
      baseRate: 0.5,
      depositAmount: 99,
      maxRideTime: 120,
      reservationTime: 15,
      overtimeRate: 1,
      monthlyPassPrice: 29.9,
      quarterlyPassPrice: 79.9,
      yearlyPassPrice: 299.9,
      freeRideTime: 15
    };
    ElMessage.success('Settings have been reset to default');
  });
}

function resetUserSettings() {
  ElMessageBox.confirm(
    'Are you sure you want to reset to default settings?',
    'Reset Confirmation',
    {
      confirmButtonText: 'Confirm',
      cancelButtonText: 'Cancel',
      type: 'warning'
    }
  ).then(() => {
    userSettings.value = {
      defaultRole: 'user',
      requireEmailVerification: true,
      requirePhoneVerification: true,
      maxLoginAttempts: 5,
      lockoutTime: 30,
      minPasswordLength: 8,
      passwordRequirements: ['lowercase', 'numbers'],
      trackUserBehavior: true
    };
    ElMessage.success('Settings have been reset to default');
  });
}

function resetNotificationSettings() {
  ElMessageBox.confirm(
    'Are you sure you want to reset to default settings?',
    'Reset Confirmation',
    {
      confirmButtonText: 'Confirm',
      cancelButtonText: 'Cancel',
      type: 'warning'
    }
  ).then(() => {
    notificationSettings.value = {
      systemNotifications: true,
      emailNotifications: true,
      smsNotifications: true,
      pushNotifications: true,
      orderConfirmation: ['email', 'push'],
      rentalStart: ['sms', 'push'],
      rentalEnd: ['sms', 'push'],
      paymentSuccess: ['email', 'push']
    };
    ElMessage.success('Settings have been reset to default');
  });
}

// 日志相关函数
function refreshLogs() {
  ElMessage.success('Logs have been refreshed');
}

function clearLogs() {
  ElMessageBox.confirm(
    'Are you sure you want to clear all system logs? This operation cannot be undone.',
    'Clear Logs',
    {
      confirmButtonText: 'Confirm',
      cancelButtonText: 'Cancel',
      type: 'danger'
    }
  ).then(() => {
    logs.value = [];
    totalLogs.value = 0;
    ElMessage.success('System logs have been cleared');
  });
}

function viewLogDetail(log) {
  selectedLog.value = log;
  logDetailVisible.value = true;
}

function getLogLevelType(level) {
  const types = {
    'INFO': 'info',
    'WARNING': 'warning',
    'ERROR': 'danger',
    'DEBUG': 'success'
  };
  return types[level] || 'info';
}
</script>

<style scoped>
.settings-page {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}
</style> 