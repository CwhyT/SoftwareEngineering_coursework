<template>
  <IconPreloader />
  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </transition>
  </router-view>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';
import IconPreloader from '@/components/common/IconPreloader.vue';

const router = useRouter();
const userStore = useUserStore();

onMounted(() => {
  console.log('App.vue已挂载，路由系统初始化完成');
  
  // 管理员账号需要手动登录，不再自动恢复用户状态
  console.log('管理员需要通过账户密码登录系统');
});
</script>

<style>
body {
  margin: 0;
  padding: 0;
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #f5f7fa;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* 确保图标可见性 */
.el-icon {
  display: inline-flex !important;
  align-items: center;
  justify-content: center;
}
</style>
