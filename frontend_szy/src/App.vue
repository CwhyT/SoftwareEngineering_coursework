<template>
  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<script setup>
import { onErrorCaptured, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// App root component

// 全局错误捕获
onErrorCaptured((err, instance, info) => {
  console.error('应用程序错误:', err)
  console.error('错误来源组件:', instance)
  console.error('错误信息:', info)
  return false // 阻止错误继续传播
})

// 监控路由更改
onMounted(() => {
  console.log('应用已加载')
  
  // 打印开发模式状态
  console.log('开发模式状态:', import.meta.env.DEV ? '激活' : '未激活')
  
  // 添加路由更改监听器
  router.afterEach((to, from) => {
    console.log(`路由从 ${from.path} 更改到 ${to.path}`)
  })
})
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style> 