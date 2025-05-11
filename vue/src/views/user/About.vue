<template>
  <div class="about-page pt-6">
    <div class="container mx-auto px-6">
      <h1 class="text-2xl font-bold mb-8 text-center">关于我们</h1>
      
      <div class="max-w-3xl mx-auto">
        <!-- 公司介绍 -->
        <section class="mb-12">
          <div class="bg-white rounded-xl shadow-md p-6 mb-6">
            <h2 class="text-xl font-semibold mb-4 text-blue-600 flex items-center">
              <ScooterIcon :size="28" class="mr-2" />
              公司简介
            </h2>
            <div class="text-gray-700 space-y-4">
              <p>我们是一家专注于城市短途出行解决方案的科技企业，致力于通过共享滑板车服务，为城市居民提供便捷、环保、经济的出行方式。</p>
              <p>自2020年成立以来，我们已在全国20多个城市投放超过50万辆智能滑板车，累计服务用户超过500万，日均完成订单量突破30万单。</p>
              <p>我们拥有自主研发的智能车辆管理系统和精准的电子围栏技术，确保车辆规范投放和使用，为城市治理贡献力量。</p>
            </div>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="stat-card bg-blue-50 rounded-lg p-5 text-center">
              <div class="text-3xl font-bold text-blue-600 mb-2">50万+</div>
              <div class="text-gray-600">车辆规模</div>
            </div>
            <div class="stat-card bg-green-50 rounded-lg p-5 text-center">
              <div class="text-3xl font-bold text-green-600 mb-2">20+</div>
              <div class="text-gray-600">覆盖城市</div>
            </div>
            <div class="stat-card bg-purple-50 rounded-lg p-5 text-center">
              <div class="text-3xl font-bold text-purple-600 mb-2">500万+</div>
              <div class="text-gray-600">累计用户</div>
            </div>
          </div>
        </section>
        
        <!-- 使命与愿景 -->
        <section class="mb-12">
          <div class="bg-white rounded-xl shadow-md p-6">
            <h2 class="text-xl font-semibold mb-4 text-blue-600">使命与愿景</h2>
            <div class="mission-vision grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="mission p-4 bg-blue-50 rounded-lg">
                <h3 class="font-medium text-lg mb-2 text-blue-700">我们的使命</h3>
                <p class="text-gray-700">创新城市出行方式，以科技提升出行效率，减少碳排放，为城市居民提供更加便捷、绿色、智能的短途交通解决方案。</p>
              </div>
              <div class="vision p-4 bg-green-50 rounded-lg">
                <h3 class="font-medium text-lg mb-2 text-green-700">我们的愿景</h3>
                <p class="text-gray-700">成为全球领先的微出行服务提供商，每一次骑行都是对绿色出行的贡献，让城市出行更加环保和人性化。</p>
              </div>
            </div>
          </div>
        </section>
        
        <!-- 企业文化 -->
        <section class="mb-12">
          <div class="bg-white rounded-xl shadow-md p-6">
            <h2 class="text-xl font-semibold mb-4 text-blue-600">企业文化</h2>
            <div class="values grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="value-card p-4 border border-gray-200 rounded-lg">
                <h3 class="font-medium mb-2 flex items-center">
                  <div class="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                    <el-icon color="#3b82f6"><Star /></el-icon>
                  </div>
                  创新驱动
                </h3>
                <p class="text-gray-600 text-sm">不断探索技术创新，引领行业发展，永远保持开拓精神。</p>
              </div>
              
              <div class="value-card p-4 border border-gray-200 rounded-lg">
                <h3 class="font-medium mb-2 flex items-center">
                  <div class="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-2">
                    <el-icon color="#22c55e"><Promotion /></el-icon>
                  </div>
                  用户至上
                </h3>
                <p class="text-gray-600 text-sm">一切以用户需求为中心，持续提升用户体验，创造更高的用户价值。</p>
              </div>
              
              <div class="value-card p-4 border border-gray-200 rounded-lg">
                <h3 class="font-medium mb-2 flex items-center">
                  <div class="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center mr-2">
                    <el-icon color="#eab308"><Service /></el-icon>
                  </div>
                  协作共赢
                </h3>
                <p class="text-gray-600 text-sm">团队协作，与合作伙伴、用户、社会共创价值，实现多方共赢。</p>
              </div>
              
              <div class="value-card p-4 border border-gray-200 rounded-lg">
                <h3 class="font-medium mb-2 flex items-center">
                  <div class="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mr-2">
                    <el-icon color="#a855f7"><Van /></el-icon>
                  </div>
                  环保责任
                </h3>
                <p class="text-gray-600 text-sm">推动绿色出行，降低碳排放，履行企业社会责任，建设可持续发展的未来。</p>
              </div>
            </div>
          </div>
        </section>
        
        <!-- 发展历程 -->
        <section class="mb-12">
          <div class="bg-white rounded-xl shadow-md p-6">
            <h2 class="text-xl font-semibold mb-6 text-blue-600">发展历程</h2>
            <div class="timeline relative pl-8">
              <div class="timeline-item relative mb-8 pb-2">
                <div class="time-dot absolute left-[-24px] w-5 h-5 rounded-full bg-blue-500"></div>
                <div class="time-line absolute left-[-22px] top-5 bottom-[-12px] w-1 bg-gray-200"></div>
                <div class="time-year font-bold text-lg mb-1">2020年</div>
                <div class="time-content text-gray-700">
                  <p>公司成立，获得天使轮融资</p>
                  <p>在北京、上海两地试运营共享滑板车服务</p>
                </div>
              </div>
              
              <div class="timeline-item relative mb-8 pb-2">
                <div class="time-dot absolute left-[-24px] w-5 h-5 rounded-full bg-green-500"></div>
                <div class="time-line absolute left-[-22px] top-5 bottom-[-12px] w-1 bg-gray-200"></div>
                <div class="time-year font-bold text-lg mb-1">2021年</div>
                <div class="time-content text-gray-700">
                  <p>业务扩展至10个城市，投放滑板车超过10万辆</p>
                  <p>完成A轮融资，估值达3亿元</p>
                  <p>推出自主研发的智能车辆管理系统1.0版</p>
                </div>
              </div>
              
              <div class="timeline-item relative mb-8 pb-2">
                <div class="time-dot absolute left-[-24px] w-5 h-5 rounded-full bg-yellow-500"></div>
                <div class="time-line absolute left-[-22px] top-5 bottom-[-12px] w-1 bg-gray-200"></div>
                <div class="time-year font-bold text-lg mb-1">2022年</div>
                <div class="time-content text-gray-700">
                  <p>业务覆盖全国20个城市，日订单量突破10万</p>
                  <p>启动电子围栏技术研发，规范停车管理</p>
                  <p>推出全新一代环保节能滑板车，续航能力提升30%</p>
                </div>
              </div>
              
              <div class="timeline-item relative">
                <div class="time-dot absolute left-[-24px] w-5 h-5 rounded-full bg-purple-500"></div>
                <div class="time-year font-bold text-lg mb-1">2023年至今</div>
                <div class="time-content text-gray-700">
                  <p>完成B轮融资，估值达10亿元</p>
                  <p>业务扩展至全国25个城市，投放滑板车突破50万辆</p>
                  <p>推出全新APP平台，用户体验大幅提升</p>
                  <p>与多个城市政府签署战略合作协议，共建绿色出行生态</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <!-- 联系我们 -->
        <section class="mb-8">
          <div class="bg-white rounded-xl shadow-md p-6">
            <h2 class="text-xl font-semibold mb-4 text-blue-600">联系我们</h2>
            <div class="contact-info grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="contact-item">
                <h3 class="font-medium mb-3">全国客服热线</h3>
                <p class="flex items-center text-gray-700">
                  <el-icon class="mr-2" color="#3b82f6"><Phone /></el-icon>
                  400-123-4567
                </p>
                <p class="text-sm text-gray-500 mt-1">服务时间：9:00-22:00</p>
              </div>
              
              <div class="contact-item">
                <h3 class="font-medium mb-3">商务合作</h3>
                <p class="flex items-center text-gray-700">
                  <el-icon class="mr-2" color="#3b82f6"><Message /></el-icon>
                  business@scooter.com
                </p>
                <p class="text-sm text-gray-500 mt-1">期待与您的合作</p>
              </div>
              
              <div class="contact-item">
                <h3 class="font-medium mb-3">公司地址</h3>
                <p class="flex items-center text-gray-700">
                  <el-icon class="mr-2" color="#3b82f6"><Location /></el-icon>
                  北京市海淀区中关村科技园区
                </p>
                <p class="text-sm text-gray-500 mt-1">邮编：100080</p>
              </div>
              
              <div class="contact-item">
                <h3 class="font-medium mb-3">关注我们</h3>
                <div class="social-media flex items-center space-x-4 mt-2">
                  <a href="#" class="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <el-icon color="#3b82f6"><Share /></el-icon>
                  </a>
                  <a href="#" class="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                    <el-icon color="#22c55e"><ChatDotRound /></el-icon>
                  </a>
                  <a href="#" class="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                    <el-icon color="#ef4444"><VideoPlay /></el-icon>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
import { 
  Star, Promotion, Service, Van, 
  Phone, Message, Location, Share, 
  ChatDotRound, VideoPlay 
} from '@element-plus/icons-vue';
import ScooterIcon from '@/components/ScooterIcon.vue';
</script>

<style scoped>
.time-dot::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 3px;
  height: 3px;
  background-color: white;
  border-radius: 50%;
}

.timeline-item:last-child .time-line {
  display: none;
}
</style> 