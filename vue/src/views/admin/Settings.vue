<template>
  <div class="settings-page">
    <div class="mb-6">
      <h1 class="text-2xl font-bold">系统设置</h1>
      <p class="text-gray-600">管理系统配置和参数</p>
    </div>

    <!-- 设置选项卡 -->
    <el-card shadow="hover" class="mb-6">
      <el-tabs v-model="activeTab">
        <el-tab-pane label="基础设置" name="general">
          <div class="py-4">
            <h2 class="text-lg font-medium mb-4">基础设置</h2>
            
            <el-form label-width="180px" label-position="left" :model="generalSettings">
              <el-form-item label="系统名称">
                <el-input v-model="generalSettings.systemName" placeholder="电动滑板车租赁系统" />
              </el-form-item>
              
              <el-form-item label="公司名称">
                <el-input v-model="generalSettings.companyName" placeholder="您的公司名称" />
              </el-form-item>
              
              <el-form-item label="联系电话">
                <el-input v-model="generalSettings.contactPhone" placeholder="客服电话" />
              </el-form-item>
              
              <el-form-item label="客服邮箱">
                <el-input v-model="generalSettings.serviceEmail" placeholder="客服邮箱" />
              </el-form-item>
              
              <el-form-item label="网站域名">
                <el-input v-model="generalSettings.websiteDomain" placeholder="您的网站域名" />
              </el-form-item>
              
              <el-form-item label="系统时区">
                <el-select v-model="generalSettings.timezone" placeholder="请选择时区" style="width: 100%">
                  <el-option label="北京时间 (GMT+8)" value="Asia/Shanghai" />
                  <el-option label="东京时间 (GMT+9)" value="Asia/Tokyo" />
                  <el-option label="伦敦时间 (GMT+0)" value="Europe/London" />
                  <el-option label="纽约时间 (GMT-5)" value="America/New_York" />
                </el-select>
              </el-form-item>
              
              <el-form-item label="系统货币">
                <el-select v-model="generalSettings.currency" placeholder="请选择货币" style="width: 100%">
                  <el-option label="人民币 (CNY)" value="CNY" />
                  <el-option label="美元 (USD)" value="USD" />
                  <el-option label="欧元 (EUR)" value="EUR" />
                  <el-option label="日元 (JPY)" value="JPY" />
                </el-select>
              </el-form-item>
              
              <el-form-item label="维护模式">
                <el-switch
                  v-model="generalSettings.maintenanceMode"
                  active-text="开启"
                  inactive-text="关闭"
                />
              </el-form-item>
              
              <el-form-item>
                <el-button type="primary" @click="saveGeneralSettings">保存设置</el-button>
                <el-button @click="resetGeneralSettings">重置</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>
        
        <el-tab-pane label="租赁设置" name="rental">
          <div class="py-4">
            <h2 class="text-lg font-medium mb-4">租赁参数设置</h2>
            
            <el-form label-width="180px" label-position="left" :model="rentalSettings">
              <el-form-item label="基础骑行费率(元/分钟)">
                <el-input-number v-model="rentalSettings.baseRate" :min="0" :precision="2" :step="0.1" />
              </el-form-item>
              
              <el-form-item label="预付款金额(元)">
                <el-input-number v-model="rentalSettings.depositAmount" :min="0" :precision="2" :step="10" />
              </el-form-item>
              
              <el-form-item label="骑行时长上限(分钟)">
                <el-input-number v-model="rentalSettings.maxRideTime" :min="0" :step="10" />
              </el-form-item>
              
              <el-form-item label="预约保留时间(分钟)">
                <el-input-number v-model="rentalSettings.reservationTime" :min="0" :step="5" />
              </el-form-item>
              
              <el-form-item label="加班费率(元/分钟)">
                <el-input-number v-model="rentalSettings.overtimeRate" :min="0" :precision="2" :step="0.1" />
              </el-form-item>
              
              <el-form-item label="月卡价格(元)">
                <el-input-number v-model="rentalSettings.monthlyPassPrice" :min="0" :precision="2" :step="10" />
              </el-form-item>
              
              <el-form-item label="季卡价格(元)">
                <el-input-number v-model="rentalSettings.quarterlyPassPrice" :min="0" :precision="2" :step="10" />
              </el-form-item>
              
              <el-form-item label="年卡价格(元)">
                <el-input-number v-model="rentalSettings.yearlyPassPrice" :min="0" :precision="2" :step="10" />
              </el-form-item>
              
              <el-form-item label="免费骑行时间(分钟)">
                <el-input-number v-model="rentalSettings.freeRideTime" :min="0" :step="5" />
              </el-form-item>
              
              <el-form-item>
                <el-button type="primary" @click="saveRentalSettings">保存设置</el-button>
                <el-button @click="resetRentalSettings">重置</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>
        
        <el-tab-pane label="用户设置" name="user">
          <div class="py-4">
            <h2 class="text-lg font-medium mb-4">用户设置</h2>
            
            <el-form label-width="180px" label-position="left" :model="userSettings">
              <el-form-item label="默认注册角色">
                <el-select v-model="userSettings.defaultRole" placeholder="请选择默认角色" style="width: 100%">
                  <el-option label="普通用户" value="user" />
                  <el-option label="会员用户" value="member" />
                </el-select>
              </el-form-item>
              
              <el-form-item label="需要邮箱验证">
                <el-switch
                  v-model="userSettings.requireEmailVerification"
                  active-text="是"
                  inactive-text="否"
                />
              </el-form-item>
              
              <el-form-item label="需要手机验证">
                <el-switch
                  v-model="userSettings.requirePhoneVerification"
                  active-text="是"
                  inactive-text="否"
                />
              </el-form-item>
              
              <el-form-item label="登录失败尝试次数">
                <el-input-number v-model="userSettings.maxLoginAttempts" :min="1" :max="10" />
              </el-form-item>
              
              <el-form-item label="锁定时间(分钟)">
                <el-input-number v-model="userSettings.lockoutTime" :min="5" :step="5" />
              </el-form-item>
              
              <el-form-item label="密码最小长度">
                <el-input-number v-model="userSettings.minPasswordLength" :min="6" :max="20" />
              </el-form-item>
              
              <el-form-item label="密码复杂度要求">
                <el-checkbox-group v-model="userSettings.passwordRequirements">
                  <el-checkbox label="uppercase">包含大写字母</el-checkbox>
                  <el-checkbox label="lowercase">包含小写字母</el-checkbox>
                  <el-checkbox label="numbers">包含数字</el-checkbox>
                  <el-checkbox label="special">包含特殊字符</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              
              <el-form-item label="用户行为记录">
                <el-switch
                  v-model="userSettings.trackUserBehavior"
                  active-text="启用"
                  inactive-text="禁用"
                />
              </el-form-item>
              
              <el-form-item>
                <el-button type="primary" @click="saveUserSettings">保存设置</el-button>
                <el-button @click="resetUserSettings">重置</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>
        
        <el-tab-pane label="通知设置" name="notification">
          <div class="py-4">
            <h2 class="text-lg font-medium mb-4">通知设置</h2>
            
            <el-form label-width="180px" label-position="left" :model="notificationSettings">
              <el-form-item label="系统通知">
                <el-switch
                  v-model="notificationSettings.systemNotifications"
                  active-text="启用"
                  inactive-text="禁用"
                />
              </el-form-item>
              
              <el-form-item label="邮件通知">
                <el-switch
                  v-model="notificationSettings.emailNotifications"
                  active-text="启用"
                  inactive-text="禁用"
                />
              </el-form-item>
              
              <el-form-item label="短信通知">
                <el-switch
                  v-model="notificationSettings.smsNotifications"
                  active-text="启用"
                  inactive-text="禁用"
                />
              </el-form-item>
              
              <el-form-item label="推送通知">
                <el-switch
                  v-model="notificationSettings.pushNotifications"
                  active-text="启用"
                  inactive-text="禁用"
                />
              </el-form-item>
              
              <h3 class="text-md font-medium my-4">通知发送类型</h3>
              
              <el-form-item label="订单确认通知">
                <el-checkbox-group v-model="notificationSettings.orderConfirmation">
                  <el-checkbox label="email">邮件</el-checkbox>
                  <el-checkbox label="sms">短信</el-checkbox>
                  <el-checkbox label="push">推送</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              
              <el-form-item label="租赁开始通知">
                <el-checkbox-group v-model="notificationSettings.rentalStart">
                  <el-checkbox label="email">邮件</el-checkbox>
                  <el-checkbox label="sms">短信</el-checkbox>
                  <el-checkbox label="push">推送</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              
              <el-form-item label="租赁结束通知">
                <el-checkbox-group v-model="notificationSettings.rentalEnd">
                  <el-checkbox label="email">邮件</el-checkbox>
                  <el-checkbox label="sms">短信</el-checkbox>
                  <el-checkbox label="push">推送</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              
              <el-form-item label="支付成功通知">
                <el-checkbox-group v-model="notificationSettings.paymentSuccess">
                  <el-checkbox label="email">邮件</el-checkbox>
                  <el-checkbox label="sms">短信</el-checkbox>
                  <el-checkbox label="push">推送</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              
              <el-form-item>
                <el-button type="primary" @click="saveNotificationSettings">保存设置</el-button>
                <el-button @click="resetNotificationSettings">重置</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>
        
        <el-tab-pane label="系统日志" name="logs">
          <div class="py-4">
            <div class="flex justify-between items-center mb-4">
              <h2 class="text-lg font-medium">系统日志</h2>
              <div>
                <el-button type="primary" @click="refreshLogs">
                  <el-icon class="mr-1"><Refresh /></el-icon>
                  刷新
                </el-button>
                <el-button @click="clearLogs">
                  <el-icon class="mr-1"><Delete /></el-icon>
                  清空日志
                </el-button>
              </div>
            </div>
            
            <el-table :data="logs" style="width: 100%" height="500">
              <el-table-column type="index" width="50" />
              <el-table-column prop="timestamp" label="时间" width="180" />
              <el-table-column prop="level" label="级别" width="100">
                <template #default="{ row }">
                  <el-tag :type="getLogLevelType(row.level)" size="small">
                    {{ row.level }}
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column prop="source" label="来源" width="150" />
              <el-table-column prop="message" label="消息" min-width="300" :show-overflow-tooltip="true" />
              <el-table-column prop="user" label="用户" width="120" />
              <el-table-column label="操作" width="80" fixed="right">
                <template #default="{ row }">
                  <el-button size="small" type="primary" plain @click="viewLogDetail(row)">
                    详情
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
    <el-dialog v-model="logDetailVisible" title="日志详情" width="600px">
      <div v-if="selectedLog">
        <div class="mb-4">
          <div class="text-sm text-gray-500 mb-1">时间</div>
          <div>{{ selectedLog.timestamp }}</div>
        </div>
        
        <div class="mb-4">
          <div class="text-sm text-gray-500 mb-1">级别</div>
          <el-tag :type="getLogLevelType(selectedLog.level)">
            {{ selectedLog.level }}
          </el-tag>
        </div>
        
        <div class="mb-4">
          <div class="text-sm text-gray-500 mb-1">来源</div>
          <div>{{ selectedLog.source }}</div>
        </div>
        
        <div class="mb-4">
          <div class="text-sm text-gray-500 mb-1">消息</div>
          <div class="p-3 bg-gray-50 rounded border border-gray-200 whitespace-pre-wrap">
            {{ selectedLog.message }}
          </div>
        </div>
        
        <div class="mb-4">
          <div class="text-sm text-gray-500 mb-1">用户</div>
          <div>{{ selectedLog.user }}</div>
        </div>
        
        <div class="mb-4">
          <div class="text-sm text-gray-500 mb-1">IP地址</div>
          <div>{{ selectedLog.ip }}</div>
        </div>
        
        <div class="mb-4">
          <div class="text-sm text-gray-500 mb-1">用户代理</div>
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
  systemName: '电动滑板车租赁系统',
  companyName: '智慧出行科技有限公司',
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
    source: '用户登录',
    message: '用户成功登录',
    user: 'admin',
    ip: '192.168.1.1',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
  },
  {
    id: 2,
    timestamp: '2024-03-25 09:45:12',
    level: 'WARNING',
    source: '车辆管理',
    message: '车辆电量不足 (ID: E1005)',
    user: 'system',
    ip: '192.168.1.10',
    userAgent: 'SystemMonitor/1.0'
  },
  {
    id: 3,
    timestamp: '2024-03-24 18:23:45',
    level: 'ERROR',
    source: '支付系统',
    message: '支付处理失败: 银行返回错误代码 DECLINED\n交易ID: TX12345678\n用户ID: 42\n金额: ¥50.00',
    user: 'user42',
    ip: '192.168.1.42',
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1'
  },
  {
    id: 4,
    timestamp: '2024-03-24 15:10:33',
    level: 'INFO',
    source: '订单系统',
    message: '新订单创建成功 (订单ID: ORD-2403-1234)',
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
  ElMessage.success('基础设置已保存');
}

function saveRentalSettings() {
  ElMessage.success('租赁设置已保存');
}

function saveUserSettings() {
  ElMessage.success('用户设置已保存');
}

function saveNotificationSettings() {
  ElMessage.success('通知设置已保存');
}

// 重置设置函数
function resetGeneralSettings() {
  ElMessageBox.confirm(
    '确定要重置为默认设置吗？',
    '重置确认',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }
  ).then(() => {
    generalSettings.value = {
      systemName: '电动滑板车租赁系统',
      companyName: '智慧出行科技有限公司',
      contactPhone: '400-123-4567',
      serviceEmail: 'service@example.com',
      websiteDomain: 'www.example.com',
      timezone: 'Asia/Shanghai',
      currency: 'CNY',
      maintenanceMode: false
    };
    ElMessage.success('已重置为默认设置');
  });
}

function resetRentalSettings() {
  ElMessageBox.confirm(
    '确定要重置为默认设置吗？',
    '重置确认',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
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
    ElMessage.success('已重置为默认设置');
  });
}

function resetUserSettings() {
  ElMessageBox.confirm(
    '确定要重置为默认设置吗？',
    '重置确认',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
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
    ElMessage.success('已重置为默认设置');
  });
}

function resetNotificationSettings() {
  ElMessageBox.confirm(
    '确定要重置为默认设置吗？',
    '重置确认',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
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
    ElMessage.success('已重置为默认设置');
  });
}

// 日志相关函数
function refreshLogs() {
  ElMessage.success('日志已刷新');
}

function clearLogs() {
  ElMessageBox.confirm(
    '确定要清空所有系统日志吗？此操作不可恢复。',
    '清空日志',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'danger'
    }
  ).then(() => {
    logs.value = [];
    totalLogs.value = 0;
    ElMessage.success('已清空系统日志');
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