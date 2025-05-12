<template>
  <div class="about-page pt-6">
    <div class="container mx-auto px-6">
      <h1 class="text-2xl font-bold mb-8 text-center">About Us</h1>
      
      <div class="max-w-3xl mx-auto">
        <!-- 公司介绍 -->
        <section class="mb-12">
          <div class="bg-white rounded-xl shadow-md p-6 mb-6">
            <h2 class="text-xl font-semibold mb-4 text-blue-600 flex items-center">
              <ScooterIcon :size="28" class="mr-2" />
              Company Overview
            </h2>
            <div class="text-gray-700 space-y-4">
              <p>We are a technology company focused on urban short-distance travel solutions, dedicated to providing convenient, environmentally friendly, and economical transportation options for urban residents through shared scooter services.</p>
              <p>Since our establishment in 2020, we have deployed over 500,000 smart scooters in more than 20 cities across the country, serving more than 5 million users, with daily orders exceeding 300,000.</p>
              <p>We have our own independently developed intelligent vehicle management system and precise electronic fence technology, ensuring standardized vehicle deployment and usage, contributing to urban governance.</p>
            </div>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="stat-card bg-blue-50 rounded-lg p-5 text-center">
              <div class="text-3xl font-bold text-blue-600 mb-2">500,000+</div>
              <div class="text-gray-600">Vehicle Fleet</div>
            </div>
            <div class="stat-card bg-green-50 rounded-lg p-5 text-center">
              <div class="text-3xl font-bold text-green-600 mb-2">20+</div>
              <div class="text-gray-600">Cities Covered</div>
            </div>
            <div class="stat-card bg-purple-50 rounded-lg p-5 text-center">
              <div class="text-3xl font-bold text-purple-600 mb-2">5 million+</div>
              <div class="text-gray-600">Total Users</div>
            </div>
          </div>
        </section>
        
        <!-- 使命与愿景 -->
        <section class="mb-12">
          <div class="bg-white rounded-xl shadow-md p-6">
            <h2 class="text-xl font-semibold mb-4 text-blue-600">Mission & Vision</h2>
            <div class="mission-vision grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="mission p-4 bg-blue-50 rounded-lg">
                <h3 class="font-medium text-lg mb-2 text-blue-700">Our Mission</h3>
                <p class="text-gray-700">Innovate urban transportation methods, enhance travel efficiency through technology, reduce carbon emissions, and provide more convenient, green, and intelligent short-distance transportation solutions for urban residents.</p>
              </div>
              <div class="vision p-4 bg-green-50 rounded-lg">
                <h3 class="font-medium text-lg mb-2 text-green-700">Our Vision</h3>
                <p class="text-gray-700">To become a global leader in micro-mobility services, where every ride contributes to green transportation, making urban travel more environmentally friendly and human-centered.</p>
              </div>
            </div>
          </div>
        </section>
        
        <!-- 企业文化 -->
        <section class="mb-12">
          <div class="bg-white rounded-xl shadow-md p-6">
            <h2 class="text-xl font-semibold mb-4 text-blue-600">Corporate Culture</h2>
            <div class="values grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="value-card p-4 border border-gray-200 rounded-lg">
                <h3 class="font-medium mb-2 flex items-center">
                  <div class="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                    <el-icon color="#3b82f6"><Star /></el-icon>
                  </div>
                  Innovation Driven
                </h3>
                <p class="text-gray-600 text-sm">Continuously exploring technological innovation, leading industry development, and maintaining a pioneering spirit.</p>
              </div>
              
              <div class="value-card p-4 border border-gray-200 rounded-lg">
                <h3 class="font-medium mb-2 flex items-center">
                  <div class="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-2">
                    <el-icon color="#22c55e"><Promotion /></el-icon>
                  </div>
                  User-Centered
                </h3>
                <p class="text-gray-600 text-sm">Everything centers on user needs, continuously improving user experience, and creating higher user value.</p>
              </div>
              
              <div class="value-card p-4 border border-gray-200 rounded-lg">
                <h3 class="font-medium mb-2 flex items-center">
                  <div class="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center mr-2">
                    <el-icon color="#eab308"><Service /></el-icon>
                  </div>
                  Collaborative Win-Win
                </h3>
                <p class="text-gray-600 text-sm">Team collaboration, creating value with partners, users, and society, achieving win-win outcomes for all parties.</p>
              </div>
              
              <div class="value-card p-4 border border-gray-200 rounded-lg">
                <h3 class="font-medium mb-2 flex items-center">
                  <div class="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mr-2">
                    <el-icon color="#a855f7"><Van /></el-icon>
                  </div>
                  Environmental Responsibility
                </h3>
                <p class="text-gray-600 text-sm">Promoting green transportation, reducing carbon emissions, fulfilling corporate social responsibility, and building a sustainable future.</p>
              </div>
            </div>
          </div>
        </section>
        
        <!-- 发展历程 -->
        <section class="mb-12">
          <div class="bg-white rounded-xl shadow-md p-6">
            <h2 class="text-xl font-semibold mb-6 text-blue-600">Development History</h2>
            <div class="timeline relative pl-8">
              <div class="timeline-item relative mb-8 pb-2">
                <div class="time-dot absolute left-[-24px] w-5 h-5 rounded-full bg-blue-500"></div>
                <div class="time-line absolute left-[-22px] top-5 bottom-[-12px] w-1 bg-gray-200"></div>
                <div class="time-year font-bold text-lg mb-1">2020</div>
                <div class="time-content text-gray-700">
                  <p>Company established, received angel round funding</p>
                  <p>Pilot operation of shared scooter services in Beijing and Shanghai</p>
                </div>
              </div>
              
              <div class="timeline-item relative mb-8 pb-2">
                <div class="time-dot absolute left-[-24px] w-5 h-5 rounded-full bg-green-500"></div>
                <div class="time-line absolute left-[-22px] top-5 bottom-[-12px] w-1 bg-gray-200"></div>
                <div class="time-year font-bold text-lg mb-1">2021</div>
                <div class="time-content text-gray-700">
                  <p>Expanded to 10 cities, deployed over 100,000 scooters</p>
                  <p>Completed Series A funding, valuation reached 300 million yuan</p>
                  <p>Launched self-developed intelligent vehicle management system version 1.0</p>
                </div>
              </div>
              
              <div class="timeline-item relative mb-8 pb-2">
                <div class="time-dot absolute left-[-24px] w-5 h-5 rounded-full bg-yellow-500"></div>
                <div class="time-line absolute left-[-22px] top-5 bottom-[-12px] w-1 bg-gray-200"></div>
                <div class="time-year font-bold text-lg mb-1">2022</div>
                <div class="time-content text-gray-700">
                  <p>Covered 20 cities nationwide, daily orders exceeded 100,000</p>
                  <p>Initiated electronic fence technology development for standardized parking management</p>
                  <p>Launched new generation of eco-friendly scooters with 30% improved range</p>
                </div>
              </div>
              
              <div class="timeline-item relative">
                <div class="time-dot absolute left-[-24px] w-5 h-5 rounded-full bg-purple-500"></div>
                <div class="time-year font-bold text-lg mb-1">2023 to Present</div>
                <div class="time-content text-gray-700">
                  <p>Completed Series B funding, valuation reached 1 billion yuan</p>
                  <p>Expanded to 25 cities nationwide, deployed over 500,000 scooters</p>
                  <p>Launched new APP platform, significantly improved user experience</p>
                  <p>Signed strategic cooperation agreements with multiple city governments to build green transportation ecosystem</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <!-- 联系我们 -->
        <section class="mb-8">
          <div class="bg-white rounded-xl shadow-md p-6">
            <h2 class="text-xl font-semibold mb-4 text-blue-600">Contact Us</h2>
            <div class="contact-info grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="contact-item">
                <h3 class="font-medium mb-3">Customer Service Hotline</h3>
                <p class="flex items-center text-gray-700">
                  <el-icon class="mr-2" color="#3b82f6"><Phone /></el-icon>
                  400-123-4567
                </p>
                <p class="text-sm text-gray-500 mt-1">Service Hours: 9:00-22:00</p>
              </div>
              
              <div class="contact-item">
                <h3 class="font-medium mb-3">Business Cooperation</h3>
                <p class="flex items-center text-gray-700">
                  <el-icon class="mr-2" color="#3b82f6"><Message /></el-icon>
                  business@scooter.com
                </p>
                <p class="text-sm text-gray-500 mt-1">Looking forward to cooperating with you</p>
              </div>
              
              <div class="contact-item">
                <h3 class="font-medium mb-3">Company Address</h3>
                <p class="flex items-center text-gray-700">
                  <el-icon class="mr-2" color="#3b82f6"><Location /></el-icon>
                  Zhongguancun Science Park, Haidian District, Beijing
                </p>
                <p class="text-sm text-gray-500 mt-1">Postal Code: 100080</p>
              </div>
              
              <div class="contact-item">
                <h3 class="font-medium mb-3">Follow Us</h3>
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