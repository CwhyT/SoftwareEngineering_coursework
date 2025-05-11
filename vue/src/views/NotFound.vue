<template>
  <div class="not-found">
    <h1>404</h1>
    <h2>页面不存在</h2>
    <p>您访问的页面不存在或已被删除</p>
    <router-link to="/">返回首页</router-link>
  </div>
</template>

<style scoped>
.not-found {
  text-align: center;
  padding: 50px 20px;
}

h1 {
  font-size: 72px;
  color: #e74c3c;
  margin-bottom: 0;
}

h2 {
  font-size: 24px;
  color: #333;
  margin-top: 0;
}

p {
  margin: 20px 0;
  color: #666;
}

a {
  display: inline-block;
  color: #3498db;
  text-decoration: none;
  border: 1px solid #3498db;
  padding: 10px 20px;
  border-radius: 4px;
  transition: all 0.3s;
}

a:hover {
  background-color: #3498db;
  color: white;
}
</style> 