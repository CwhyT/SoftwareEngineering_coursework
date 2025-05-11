<template>
  <div class="help-page py-8">
    <div class="container mx-auto px-4 sm:px-6 md:px-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <!-- 左侧导航 -->
        <div class="md:col-span-1">
          <div class="bg-white rounded-xl shadow-md overflow-hidden sticky top-20">
            <div class="p-4 bg-blue-500 text-white">
              <h2 class="text-lg font-bold">帮助中心</h2>
            </div>

            <ul class="p-4">
              <li
                v-for="(section, index) in sections"
                :key="index"
                @click="activeSection = index"
                :class="['py-2.5 px-4 mb-1 rounded-md cursor-pointer transition-colors duration-200 flex items-center',
                  activeSection === index ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100 text-gray-700']"
              >
                <el-icon class="mr-2" :size="16"><component :is="section.icon" /></el-icon>
                <span>{{ section.title }}</span>
              </li>
            </ul>
          </div>
        </div>

        <!-- 右侧内容区 -->
        <div class="md:col-span-3">
          <div class="bg-white rounded-xl shadow-md overflow-hidden">
            <!-- 常见问题 -->
            <div v-if="activeSection === 0" class="p-6">
              <h2 class="text-xl font-bold mb-6 pb-2 border-b border-gray-200">常见问题</h2>

              <el-collapse v-model="activeCollapseNames">
                <el-collapse-item title="如何开始使用共享滑板车？" name="1">
                  <div class="py-2 px-1">
                    <p class="text-gray-700">
                      使用共享滑板车非常简单，只需按照以下步骤操作：
                    </p>
                    <ol class="mt-3 list-decimal list-inside text-gray-700 space-y-2">
                      <li>下载并安装我们的应用</li>
                      <li>完成注册并验证您的身份</li>
                      <li>在地图上找到附近的滑板车</li>
                      <li>扫描车身上的二维码解锁</li>
                      <li>骑行结束后，将车辆停放在指定区域并锁车</li>
                    </ol>
                  </div>
                </el-collapse-item>

                <el-collapse-item title="如何充值余额？" name="2">
                  <div class="py-2 px-1">
                    <p class="text-gray-700">
                      您可以通过以下方式充值账户余额：
                    </p>
                    <ul class="mt-3 list-disc list-inside text-gray-700 space-y-2">
                      <li>在"我的钱包"页面，点击"充值"按钮</li>
                      <li>选择充值金额或输入自定义金额</li>
                      <li>选择支付方式：支付宝、微信支付、银行卡</li>
                      <li>确认支付并完成充值</li>
                    </ul>
                    <p class="mt-3 text-gray-700">
                      <span class="text-blue-600 font-medium">提示：</span>首次充值满50元可获得额外5元骑行券。
                    </p>
                  </div>
                </el-collapse-item>

                <el-collapse-item title="费用是如何计算的？" name="3">
                  <div class="py-2 px-1">
                    <p class="text-gray-700">
                      我们的计费方式为：基础费用 + 时长费用。
                    </p>
                    <ul class="mt-3 list-disc list-inside text-gray-700 space-y-2">
                      <li>基础费用：解锁滑板车需支付1元</li>
                      <li>时长费用：每15分钟0.5元</li>
                      <li>不足15分钟的部分按照15分钟计算</li>
                    </ul>
                    <div class="mt-4 bg-amber-50 p-3 rounded-md">
                      <p class="text-amber-800 text-sm">
                        <el-icon class="mr-1"><InfoFilled /></el-icon>
                        示例：骑行35分钟，费用 = 1元(基础费用) + 0.5元×3(时长费用) = 2.5元
                      </p>
                    </div>
                  </div>
                </el-collapse-item>

                <el-collapse-item title="如果车辆发生故障怎么办？" name="4">
                  <div class="py-2 px-1">
                    <p class="text-gray-700">
                      遇到车辆故障时，请按照以下步骤处理：
                    </p>
                    <ol class="mt-3 list-decimal list-inside text-gray-700 space-y-2">
                      <li>在APP中点击"结束行程"以锁定车辆</li>
                      <li>在APP中找到"问题反馈"选项</li>
                      <li>选择"车辆故障"并拍照上传</li>
                      <li>提交反馈后，我们会尽快处理并联系您</li>
                    </ol>
                    <p class="mt-3 text-gray-700">
                      <span class="text-red-600 font-medium">重要：</span>请勿自行维修或拆卸车辆，以免造成更严重的损坏或安全隐患。
                    </p>
                  </div>
                </el-collapse-item>

                <el-collapse-item title="如何举报违规停放的车辆？" name="5">
                  <div class="py-2 px-1">
                    <p class="text-gray-700">
                      如果您发现违规停放的共享滑板车，可以通过以下方式举报：
                    </p>
                    <ul class="mt-3 list-disc list-inside text-gray-700 space-y-2">
                      <li>在APP首页点击"扫码"按钮</li>
                      <li>扫描违规车辆的二维码</li>
                      <li>选择"举报违规停放"</li>
                      <li>拍照上传并提交</li>
                    </ul>
                    <p class="mt-3 text-gray-700 italic">
                      感谢您帮助我们维护城市秩序，成功举报将获得积分奖励。
                    </p>
                  </div>
                </el-collapse-item>
              </el-collapse>
            </div>

            <!-- 使用指南 -->
            <div v-else-if="activeSection === 1" class="p-6">
              <h2 class="text-xl font-bold mb-6 pb-2 border-b border-gray-200">使用指南</h2>

              <div class="mb-8">
                <h3 class="text-lg font-semibold text-gray-800 mb-3">安全骑行须知</h3>
                <ul class="list-disc list-inside text-gray-700 space-y-2">
                  <li>骑行前检查滑板车的刹车、轮胎和转向机构是否正常</li>
                  <li>建议佩戴头盔和护具，保障自身安全</li>
                  <li>遵守交通规则，不在机动车道上骑行</li>
                  <li>不要超载，不能载人</li>
                  <li>不要酒后骑行</li>
                </ul>
              </div>

              <div class="mb-8">
                <h3 class="text-lg font-semibold text-gray-800 mb-3">正确的停放方式</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div class="bg-green-50 p-3 rounded-md">
                    <h4 class="text-green-700 font-medium mb-2">√ 正确示范</h4>
                    <ul class="list-disc list-inside text-gray-700 space-y-1">
                      <li>停放在专用停车区内</li>
                      <li>整齐摆放，不阻碍通行</li>
                      <li>使用滑板车支架支撑车辆</li>
                    </ul>
                  </div>

                  <div class="bg-red-50 p-3 rounded-md">
                    <h4 class="text-red-700 font-medium mb-2">× 错误示范</h4>
                    <ul class="list-disc list-inside text-gray-700 space-y-1">
                      <li>停放在盲道或消防通道上</li>
                      <li>横躺在人行道中间</li>
                      <li>停放在建筑物入口处</li>
                    </ul>
                  </div>
                </div>
                <div class="text-sm text-gray-600">
                  违规停放将可能导致账号扣分或罚款，请您配合规范停放。
                </div>
              </div>

              <div class="mb-8">
                <h3 class="text-lg font-semibold text-gray-800 mb-3">充电与电量</h3>
                <p class="text-gray-700 mb-3">
                  我们的滑板车配备智能电池管理系统，显示的电量为实时数据。您可以在地图上看到每辆车的剩余电量。
                </p>
                <div class="bg-blue-50 p-3 rounded-md">
                  <h4 class="text-blue-700 font-medium mb-2">电量提示</h4>
                  <ul class="list-disc list-inside text-gray-700 space-y-1">
                    <li>建议选择电量超过50%的车辆进行长距离骑行</li>
                    <li>电量低于20%时车辆会自动限速</li>
                    <li>电量低于10%时可能无法启动</li>
                  </ul>
                </div>
              </div>
            </div>

            <!-- 联系我们 -->
            <div v-else-if="activeSection === 2" class="p-6">
              <h2 class="text-xl font-bold mb-6 pb-2 border-b border-gray-200">联系我们</h2>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 class="text-lg font-semibold text-gray-800 mb-4">客服信息</h3>

                  <div class="space-y-4">
                    <div class="flex items-start">
                      <el-icon class="mr-3 p-1.5 bg-blue-100 text-blue-600 rounded-md" size="20"><Phone /></el-icon>
                      <div>
                        <div class="text-sm text-gray-500">客服热线</div>
                        <div class="text-gray-800 font-medium">400-123-4567</div>
                        <div class="text-xs text-gray-500 mt-1">周一至周日 8:00-22:00</div>
                      </div>
                    </div>

                    <div class="flex items-start">
                      <el-icon class="mr-3 p-1.5 bg-blue-100 text-blue-600 rounded-md" size="20"><Message /></el-icon>
                      <div>
                        <div class="text-sm text-gray-500">客服邮箱</div>
                        <div class="text-gray-800 font-medium">support@scooter-share.com</div>
                        <div class="text-xs text-gray-500 mt-1">一般会在1-2个工作日内回复</div>
                      </div>
                    </div>

                    <div class="flex items-start">
                      <el-icon class="mr-3 p-1.5 bg-blue-100 text-blue-600 rounded-md" size="20"><Location /></el-icon>
                      <div>
                        <div class="text-sm text-gray-500">公司地址</div>
                        <div class="text-gray-800 font-medium">上海市浦东新区张江高科技园区</div>
                        <div class="text-xs text-gray-500 mt-1">邮编: 201203</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 class="text-lg font-semibold text-gray-800 mb-4">问题反馈</h3>

                  <el-form :model="feedbackForm" label-position="top" @submit.prevent="submitFeedback">
                    <el-form-item label="问题类型" required>
                      <el-select v-model="feedbackForm.type" placeholder="请选择问题类型" class="w-full">
                        <el-option label="车辆故障" value="车辆故障"></el-option>
                        <el-option label="账户问题" value="账户问题"></el-option>
                        <el-option label="收费问题" value="收费问题"></el-option>
                        <el-option label="使用建议" value="使用建议"></el-option>
                        <el-option label="投诉" value="投诉"></el-option>
                        <el-option label="其他问题" value="其他问题"></el-option>
                      </el-select>
                    </el-form-item>

                    <el-form-item label="问题描述" required>
                      <el-input
                        v-model="feedbackForm.content"
                        type="textarea"
                        :rows="4"
                        placeholder="请详细描述您遇到的问题或建议"
                      ></el-input>
                    </el-form-item>

                    <el-form-item label="联系方式" required>
                      <el-input v-model="feedbackForm.email" placeholder="请留下您的邮箱，以便我们回复您"></el-input>
                    </el-form-item>


                    <div class="mt-2">
                      <el-button type="primary" native-type="submit" class="w-full" :loading="submittingFeedback">
                        提交反馈
                      </el-button>
                    </div>
                  </el-form>
                </div>
              </div>

              <div v-if="feedbackSubmitted" class="mt-6 p-4 bg-green-50 rounded-lg">
                <div class="flex items-center">
                  <el-icon class="mr-2 text-green-600" size="20"><CircleCheckFilled /></el-icon>
                  <span class="text-green-700 font-medium">反馈提交成功</span>
                </div>
                <p class="mt-2 text-sm text-gray-700">
                  感谢您的反馈！我们将尽快处理您的问题并与您联系。
                  您的反馈编号：<span class="font-medium">{{ feedbackId }}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { ElMessage } from 'element-plus';
import {
  QuestionFilled, InfoFilled, CircleCheckFilled,
  Phone, Message, Location, ChatLineRound, Edit,
  Document, Connection
} from '@element-plus/icons-vue';
import {adminApi, adminListApi} from "@/api/index.js";

// 活动面板部分
const activeSection = ref(0);
const activeCollapseNames = ref(['1']);

// 导航部分
const sections = [
  {
    title: '常见问题',
    icon: 'QuestionFilled'
  },
  {
    title: '使用指南',
    icon: 'Document'
  },
  {
    title: '联系我们',
    icon: 'Message'
  }
];

// 反馈表单
const feedbackForm = reactive({
  type: '',
  content: '',
  contact: '',
  email: '',
  files: []
});

const submittingFeedback = ref(false);
const feedbackSubmitted = ref(false);
const feedbackId = ref('');

// 处理文件上传
const handleFileChange = (file) => {
  if (feedbackForm.files.length < 3) {
    feedbackForm.files.push(file);
  }
};

// 提交反馈
const submitFeedback = () => {
  // 表单验证
  if (!feedbackForm.type) {
    ElMessage.warning('请选择问题类型');
    return;
  }

  if (!feedbackForm.content || feedbackForm.content.trim().length < 10) {
    ElMessage.warning('请至少输入10个字的问题描述');
    return;
  }

  submittingFeedback.value = true;
  adminListApi.feedbackAdd(feedbackForm).then(res => {
    submittingFeedback.value = false;
    // 重置表单
    feedbackForm.type = '';
    feedbackForm.content = '';
    feedbackForm.email = '';
    ElMessage.success('反馈提交成功，感谢您的宝贵意见');
  })
};
</script>

<style scoped>
:deep(.el-collapse-item__header) {
  font-weight: 500;
  color: #334155;
}

:deep(.el-collapse-item__wrap) {
  background-color: #f8fafc;
  border-radius: 0 0 6px 6px;
}
</style>
