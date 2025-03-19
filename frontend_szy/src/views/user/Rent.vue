<template>
  <div class="container mx-auto px-4 py-8">
    <div class="max-w-2xl mx-auto">
      <div class="bg-white rounded-lg shadow-md p-6 mb-6">
        <h1 class="text-2xl font-bold text-gray-900 mb-4">租赁滑板车</h1>
        <p class="text-gray-600 mb-6">选择租赁时长和支付方式</p>

        <!-- 滑板车信息 -->
        <div class="flex items-center gap-4 mb-6 border-b pb-6">
          <div class="w-24 h-24 rounded bg-gray-100 flex items-center justify-center">
            <img src="@/assets/scooter.png" alt="滑板车" class="w-16 h-16">
          </div>
          <div>
            <p class="text-lg font-medium mb-2">编号: SCOOTER001</p>
            <p class="text-gray-600">电量: 95%</p>
            <p class="text-gray-600">距离: 100米</p>
            <p class="text-gray-600">价格: 20元/小时</p>
          </div>
        </div>

        <!-- 租赁选项 -->
        <div class="mb-6">
          <h2 class="text-lg font-medium mb-4">选择租赁方式</h2>
          <div class="flex gap-4 mb-4">
            <label class="flex items-center">
              <input type="radio" name="rentalType" value="hourly" checked>
              <span class="ml-2">按小时</span>
            </label>
            <label class="flex items-center">
              <input type="radio" name="rentalType" value="daily">
              <span class="ml-2">按天</span>
            </label>
            <label class="flex items-center">
              <input type="radio" name="rentalType" value="weekly">
              <span class="ml-2">按周</span>
            </label>
          </div>
          
          <div class="mb-4">
            <label class="block mb-2">租赁时长</label>
            <input 
              type="range" 
              min="1" 
              max="24" 
              value="1" 
              class="w-full"
              id="durationSlider"
              oninput="updateDuration(this.value)"
            >
            <p id="durationDisplay">1小时</p>
          </div>
          
          <div class="bg-gray-50 p-4 rounded-lg">
            <div class="flex justify-between items-center mb-2">
              <span>基础费用</span>
              <span id="basePrice">¥20</span>
            </div>
            <div class="flex justify-between items-center mb-2">
              <span>押金</span>
              <span>¥299</span>
            </div>
            <div class="flex justify-between items-center text-lg font-medium">
              <span>总计</span>
              <span id="totalPrice">¥319</span>
            </div>
          </div>
        </div>

        <!-- 支付方式 -->
        <div class="mb-6">
          <h2 class="text-lg font-medium mb-4">选择支付方式</h2>
          <div class="space-y-3">
            <label class="flex items-center">
              <input type="radio" name="paymentMethod" value="alipay" checked>
              <div class="w-6 h-6 mx-2 flex items-center justify-center">
                <!-- 支付宝图标 -->
                <img src="@/assets/alipay.png" alt="支付宝" class="w-6 h-6" />
              </div>
              <span>支付宝</span>
            </label>
            <label class="flex items-center">
              <input type="radio" name="paymentMethod" value="wechat">
              <div class="w-6 h-6 mx-2 flex items-center justify-center">
                <!-- 微信图标 -->
                <img src="@/assets/wechat.png" alt="微信支付" class="w-6 h-6" />
              </div>
              <span>微信支付</span>
            </label>
          </div>
        </div>

        <!-- 确认按钮 -->
        <div class="flex justify-end space-x-4">
          <a 
            href="/" 
            class="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg"
          >
            取消
          </a>
          <button 
            id="confirmButton"
            class="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
            onclick="showPayment()"
          >
            确认租赁
          </button>
        </div>
      </div>
      
      <!-- 支付确认框 -->
      <div 
        id="paymentDialog" 
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center hidden"
      >
        <div class="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
          <h2 class="text-xl font-bold mb-4 text-center">确认支付</h2>
          <div class="text-center">
            <div class="mb-4 flex justify-center">
              <div id="alipayQRCode" class="w-48 h-48 bg-white border border-gray-200 p-2 rounded-md relative">
                <div class="w-full h-full flex items-center justify-center">
                  <img src="@/assets/alipay.png" alt="支付宝二维码" class="w-40 h-40" />
                </div>
                <div class="absolute inset-0 flex items-center justify-center text-blue-500 font-bold text-sm bg-white bg-opacity-70">
                  支付宝扫码支付
                </div>
              </div>
              
              <div id="wechatQRCode" class="w-48 h-48 bg-white border border-gray-200 p-2 rounded-md hidden relative">
                <div class="w-full h-full flex items-center justify-center">
                  <img src="@/assets/wechat.png" alt="微信支付二维码" class="w-40 h-40" />
                </div>
                <div class="absolute inset-0 flex items-center justify-center text-green-500 font-bold text-sm bg-white bg-opacity-70">
                  微信扫码支付
                </div>
              </div>
            </div>
            <p class="text-gray-600 mb-2" id="paymentMethodDisplay">
              请使用支付宝扫码支付
            </p>
            <p class="text-blue-500 text-xl font-medium" id="paymentAmount">
              ¥319
            </p>
            <div class="mt-6 flex justify-center">
              <button 
                class="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-lg mr-2"
                onclick="completePayment()"
              >
                完成支付
              </button>
              <button 
                class="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg"
                onclick="closePayment()"
              >
                取消
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RentPage',
  mounted() {
    console.log('租赁页面已加载')
    
    // 添加window对象上的全局函数以供HTML直接调用
    window.updateDuration = (value) => {
      document.getElementById('durationDisplay').textContent = value + '小时'
      const basePrice = value * 20
      document.getElementById('basePrice').textContent = '¥' + basePrice
      document.getElementById('totalPrice').textContent = '¥' + (basePrice + 299)
      document.getElementById('paymentAmount').textContent = '¥' + (basePrice + 299)
    }
    
    window.showPayment = () => {
      document.getElementById('paymentDialog').classList.remove('hidden')
      
      // 获取选中的支付方式
      const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value
      
      // 更新支付方式显示文本
      document.getElementById('paymentMethodDisplay').textContent = 
        `请使用${paymentMethod === 'alipay' ? '支付宝' : '微信支付'}扫码支付`
      
      // 显示对应的二维码
      if (paymentMethod === 'alipay') {
        document.getElementById('alipayQRCode').classList.remove('hidden')
        document.getElementById('wechatQRCode').classList.add('hidden')
      } else {
        document.getElementById('alipayQRCode').classList.add('hidden')
        document.getElementById('wechatQRCode').classList.remove('hidden')
      }
    }
    
    window.closePayment = () => {
      document.getElementById('paymentDialog').classList.add('hidden')
    }
    
    window.completePayment = () => {
      document.getElementById('paymentDialog').classList.add('hidden')
      alert('租赁成功！')
      window.location.href = '/profile'
    }
  }
}
</script>

<style scoped>
#alipayQRCode, #wechatQRCode {
  position: relative;
}
</style> 