<template>
  <div class="help-page py-8">
    <div class="container mx-auto px-4 sm:px-6 md:px-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <!-- 左侧导航 -->
        <div class="md:col-span-1">
          <div class="bg-white rounded-xl shadow-md overflow-hidden sticky top-20">
            <div class="p-4 bg-blue-500 text-white">
              <h2 class="text-lg font-bold">Help Center</h2>
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
              <h2 class="text-xl font-bold mb-6 pb-2 border-b border-gray-200">Frequently Asked Questions</h2>

              <el-collapse v-model="activeCollapseNames">
                <el-collapse-item title="How to start using shared scooters?" name="1">
                  <div class="py-2 px-1">
                    <p class="text-gray-700">
                      Using shared scooters is very simple, just follow these steps:
                    </p>
                    <ol class="mt-3 list-decimal list-inside text-gray-700 space-y-2">
                      <li>Download and install our app</li>
                      <li>Complete registration and verify your identity</li>
                      <li>Find nearby scooters on the map</li>
                      <li>Scan the QR code on the scooter to unlock</li>
                      <li>After riding, park the scooter in the designated area and lock it</li>
                    </ol>
                  </div>
                </el-collapse-item>

                <el-collapse-item title="How to recharge balance?" name="2">
                  <div class="py-2 px-1">
                    <p class="text-gray-700">
                      You can recharge your account balance through the following methods:
                    </p>
                    <ul class="mt-3 list-disc list-inside text-gray-700 space-y-2">
                      <li>Click the "Recharge" button in the "My Wallet" page</li>
                      <li>Select recharge amount or enter custom amount</li>
                      <li>Choose payment method: Alipay, WeChat Pay, Bank Card</li>
                      <li>Confirm payment and complete recharge</li>
                    </ul>
                    <p class="mt-3 text-gray-700">
                      <span class="text-blue-600 font-medium">Tip:</span> Get an extra ¥5 riding coupon for first recharge over ¥50.
                    </p>
                  </div>
                </el-collapse-item>

                <el-collapse-item title="How are fees calculated?" name="3">
                  <div class="py-2 px-1">
                    <p class="text-gray-700">
                      Our billing method is: base fee + time fee.
                    </p>
                    <ul class="mt-3 list-disc list-inside text-gray-700 space-y-2">
                      <li>Base fee: ¥1 to unlock the scooter</li>
                      <li>Time fee: ¥0.5 per 15 minutes</li>
                      <li>Partial periods less than 15 minutes are charged as 15 minutes</li>
                    </ul>
                    <div class="mt-4 bg-amber-50 p-3 rounded-md">
                      <p class="text-amber-800 text-sm">
                        <el-icon class="mr-1"><InfoFilled /></el-icon>
                        Example: 35 minutes ride, fee = ¥1(base fee) + ¥0.5×3(time fee) = ¥2.5
                      </p>
                    </div>
                  </div>
                </el-collapse-item>

                <el-collapse-item title="What to do if the scooter malfunctions?" name="4">
                  <div class="py-2 px-1">
                    <p class="text-gray-700">
                      When encountering scooter malfunctions, please follow these steps:
                    </p>
                    <ol class="mt-3 list-decimal list-inside text-gray-700 space-y-2">
                      <li>Click "End Trip" in the APP to lock the scooter</li>
                      <li>Find the "Feedback" option in the APP</li>
                      <li>Select "Scooter Malfunction" and upload photos</li>
                      <li>After submitting feedback, we will process it promptly and contact you</li>
                    </ol>
                    <p class="mt-3 text-gray-700">
                      <span class="text-red-600 font-medium">Important:</span> Please do not attempt to repair or disassemble the scooter yourself, as this may cause more serious damage or safety hazards.
                    </p>
                  </div>
                </el-collapse-item>

                <el-collapse-item title="How to report improperly parked scooters?" name="5">
                  <div class="py-2 px-1">
                    <p class="text-gray-700">
                      If you find improperly parked shared scooters, you can report them through the following methods:
                    </p>
                    <ul class="mt-3 list-disc list-inside text-gray-700 space-y-2">
                      <li>Click the "Scan" button on the APP homepage</li>
                      <li>Scan the QR code of the improperly parked scooter</li>
                      <li>Select "Report Improper Parking"</li>
                      <li>Upload photos and submit</li>
                    </ul>
                    <p class="mt-3 text-gray-700 italic">
                      Thank you for helping us maintain city order. Successful reports will be rewarded with points.
                    </p>
                  </div>
                </el-collapse-item>
              </el-collapse>
            </div>

            <!-- 使用指南 -->
            <div v-else-if="activeSection === 1" class="p-6">
              <h2 class="text-xl font-bold mb-6 pb-2 border-b border-gray-200">User Guide</h2>

              <div class="mb-8">
                <h3 class="text-lg font-semibold text-gray-800 mb-3">Safety Riding Guidelines</h3>
                <ul class="list-disc list-inside text-gray-700 space-y-2">
                  <li>Check the scooter's brakes, tires, and steering mechanism before riding</li>
                  <li>Wear a helmet and protective gear for safety</li>
                  <li>Follow traffic rules, do not ride on motor vehicle lanes</li>
                  <li>Do not overload, no passengers allowed</li>
                  <li>Do not ride under the influence of alcohol</li>
                </ul>
              </div>

              <div class="mb-8">
                <h3 class="text-lg font-semibold text-gray-800 mb-3">Proper Parking Methods</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div class="bg-green-50 p-3 rounded-md">
                    <h4 class="text-green-700 font-medium mb-2">√ Correct Examples</h4>
                    <ul class="list-disc list-inside text-gray-700 space-y-1">
                      <li>Park in designated parking areas</li>
                      <li>Arrange neatly, do not block passage</li>
                      <li>Use the scooter's kickstand</li>
                    </ul>
                  </div>

                  <div class="bg-red-50 p-3 rounded-md">
                    <h4 class="text-red-700 font-medium mb-2">× Incorrect Examples</h4>
                    <ul class="list-disc list-inside text-gray-700 space-y-1">
                      <li>Parking on blind paths or fire lanes</li>
                      <li>Lying across the middle of sidewalks</li>
                      <li>Parking at building entrances</li>
                    </ul>
                  </div>
                </div>
                <div class="text-sm text-gray-600">
                  Improper parking may result in account point deduction or fines. Please cooperate with proper parking.
                </div>
              </div>

              <div class="mb-8">
                <h3 class="text-lg font-semibold text-gray-800 mb-3">Charging and Battery</h3>
                <p class="text-gray-700 mb-3">
                  Our scooters are equipped with intelligent battery management systems, showing real-time battery levels. You can see the remaining battery of each scooter on the map.
                </p>
                <div class="bg-blue-50 p-3 rounded-md">
                  <h4 class="text-blue-700 font-medium mb-2">Battery Tips</h4>
                  <ul class="list-disc list-inside text-gray-700 space-y-1">
                    <li>Choose scooters with over 50% battery for long-distance rides</li>
                    <li>Scooters will automatically limit speed when battery is below 20%</li>
                    <li>Scooters may not start when battery is below 10%</li>
                  </ul>
                </div>
              </div>
            </div>

            <!-- 联系我们 -->
            <div v-else-if="activeSection === 2" class="p-6">
              <h2 class="text-xl font-bold mb-6 pb-2 border-b border-gray-200">Contact Us</h2>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 class="text-lg font-semibold text-gray-800 mb-4">Customer Service Information</h3>

                  <div class="space-y-4">
                    <div class="flex items-start">
                      <el-icon class="mr-3 p-1.5 bg-blue-100 text-blue-600 rounded-md" size="20"><Phone /></el-icon>
                      <div>
                        <div class="text-sm text-gray-500">Customer Service Hotline</div>
                        <div class="text-gray-800 font-medium">400-123-4567</div>
                        <div class="text-xs text-gray-500 mt-1">Monday to Sunday 8:00-22:00</div>
                      </div>
                    </div>

                    <div class="flex items-start">
                      <el-icon class="mr-3 p-1.5 bg-blue-100 text-blue-600 rounded-md" size="20"><Message /></el-icon>
                      <div>
                        <div class="text-sm text-gray-500">Customer Service Email</div>
                        <div class="text-gray-800 font-medium">support@scooter-share.com</div>
                        <div class="text-xs text-gray-500 mt-1">Usually responds within 1-2 business days</div>
                      </div>
                    </div>

                    <div class="flex items-start">
                      <el-icon class="mr-3 p-1.5 bg-blue-100 text-blue-600 rounded-md" size="20"><Location /></el-icon>
                      <div>
                        <div class="text-sm text-gray-500">Company Address</div>
                        <div class="text-gray-800 font-medium">Zhangjiang Hi-Tech Park, Pudong New Area, Shanghai</div>
                        <div class="text-xs text-gray-500 mt-1">Postal Code: 201203</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 class="text-lg font-semibold text-gray-800 mb-4">Feedback</h3>

                  <el-form :model="feedbackForm" label-position="top" @submit.prevent="submitFeedback">
                    <el-form-item label="Issue Type" required>
                      <el-select v-model="feedbackForm.type" placeholder="Please select issue type" class="w-full">
                        <el-option label="Scooter Malfunction" value="Scooter Malfunction"></el-option>
                        <el-option label="Account Issue" value="Account Issue"></el-option>
                        <el-option label="Billing Issue" value="Billing Issue"></el-option>
                        <el-option label="Usage Suggestion" value="Usage Suggestion"></el-option>
                        <el-option label="Complaint" value="Complaint"></el-option>
                        <el-option label="Other Issues" value="Other Issues"></el-option>
                      </el-select>
                    </el-form-item>

                    <el-form-item label="Issue Description" required>
                      <el-input
                        v-model="feedbackForm.content"
                        type="textarea"
                        :rows="4"
                        placeholder="Please describe your issue or suggestion in detail"
                      ></el-input>
                    </el-form-item>

                    <el-form-item label="Contact Information" required>
                      <el-input v-model="feedbackForm.email" placeholder="Please leave your email for our response"></el-input>
                    </el-form-item>

                    <div class="mt-2">
                      <el-button type="primary" native-type="submit" class="w-full" :loading="submittingFeedback">
                        Submit Feedback
                      </el-button>
                    </div>
                  </el-form>
                </div>
              </div>

              <div v-if="feedbackSubmitted" class="mt-6 p-4 bg-green-50 rounded-lg">
                <div class="flex items-center">
                  <el-icon class="mr-2 text-green-600" size="20"><CircleCheckFilled /></el-icon>
                  <span class="text-green-700 font-medium">Feedback submitted successfully</span>
                </div>
                <p class="mt-2 text-sm text-gray-700">
                  Thank you for your feedback! We will process your issue and contact you as soon as possible.
                  Your feedback ID: <span class="font-medium">{{ feedbackId }}</span>
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
    title: 'Frequently Asked Questions',
    icon: 'QuestionFilled'
  },
  {
    title: 'User Guide',
    icon: 'Document'
  },
  {
    title: 'Contact Us',
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
    ElMessage.warning('Please select issue type');
    return;
  }

  if (!feedbackForm.content || feedbackForm.content.trim().length < 10) {
    ElMessage.warning('Please enter at least 10 characters for issue description');
    return;
  }

  submittingFeedback.value = true;
  adminListApi.feedbackAdd(feedbackForm).then(res => {
    submittingFeedback.value = false;
    // 重置表单
    feedbackForm.type = '';
    feedbackForm.content = '';
    feedbackForm.email = '';
    ElMessage.success('Feedback submitted successfully, thank you for your valuable feedback');
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
