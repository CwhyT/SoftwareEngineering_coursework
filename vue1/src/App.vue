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
  console.log('App.vue mounted, routing system initialized');
  
  // Administrator account requires manual login, no longer automatically restores user state
  console.log('Administrator needs to log in with username and password');
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
