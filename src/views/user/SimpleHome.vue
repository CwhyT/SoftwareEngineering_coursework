<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold text-center text-primary mb-6">电动滑板车租赁系统</h1>
    <div class="bg-white rounded-lg shadow-md p-6">
      <p class="text-xl text-center mb-4">欢迎使用我们的电动滑板车租赁服务</p>
      <div class="flex flex-col items-center gap-4">
        <!-- 使用普通HTML按钮 -->
        <button 
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg text-lg"
          onclick="window.location.href='/rent?scooterId=SCOOTER001'"
        >
          开始使用
        </button>
        
        <!-- 纯HTML链接 -->
        <a 
          href="/rent?scooterId=SCOOTER001" 
          class="text-blue-500 underline"
        >
          直接进入租赁页面
        </a>
      </div>
    </div>
  </div>
</template>

<script>
// 不使用setup语法，改用选项式API
export default {
  name: 'SimpleHome',
  mounted() {
    console.log('首页已加载')
  }
}
</script> 