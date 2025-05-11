<template>
  <div class="simple-nav-page">
    <h1>简单路由导航测试</h1>
    
    <div class="nav-buttons">
      <button class="nav-btn" @click="router.push('/')">首页</button>
      <button class="nav-btn" @click="router.push('/rent')">附近车辆</button>
      <button class="nav-btn" @click="router.push('/scan')">扫码租车</button>
      <button class="nav-btn" @click="router.push('/payment')">充值优惠</button>
      <button class="nav-btn" @click="router.push('/profile')">个人中心</button>
    </div>
    
    <div class="route-info">
      <h2>当前路由: {{ $route.path }}</h2>
      <pre>{{ $route }}</pre>
    </div>
    
    <div class="actions">
      <button class="action-btn" @click="goBack">返回上一页</button>
      <button class="action-btn" @click="refreshPage">刷新页面</button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const goBack = () => {
  router.go(-1);
};

const refreshPage = () => {
  window.location.reload();
};
</script>

<style scoped>
.simple-nav-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  text-align: center;
  margin-bottom: 30px;
  color: #1976d2;
}

.nav-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 30px;
  justify-content: center;
}

.nav-btn {
  background-color: #1976d2;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

.nav-btn:hover {
  background-color: #1565c0;
}

.route-info {
  background-color: #f5f5f5;
  padding: 15px;
  border-radius: 4px;
  margin-bottom: 30px;
}

h2 {
  margin-top: 0;
  margin-bottom: 10px;
  font-size: 18px;
}

pre {
  background-color: #e0e0e0;
  padding: 10px;
  border-radius: 4px;
  overflow: auto;
}

.actions {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.action-btn {
  background-color: #ff5722;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

.action-btn:hover {
  background-color: #e64a19;
}
</style> 