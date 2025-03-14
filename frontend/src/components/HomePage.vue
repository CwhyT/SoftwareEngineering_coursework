<template>
  <div class="home-container">
    <NavBar />
    
    <main class="main-content">
      <section class="banner">
        <h2>轻松租车，畅享骑行</h2>
        <p>简单、便捷、高效的单车租赁平台</p>
        <router-link to="/rent" class="btn-primary">立即租车</router-link>
      </section>
    </main>

    <footer class="footer">
      <p>&copy; 2025 单车租赁系统. 版权所有.</p>
    </footer>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";

export default {
  name: "HomePage",
  components: {
    NavBar
  }
};
</script>

<style scoped>
.home-container {
  text-align: center;
  font-family: Arial, sans-serif;
}

.main-content {
  padding: 2rem;
  margin-top: 80px; /* 避免导航栏遮挡内容 */
}

.banner {
  background: url('/path/to/banner.jpg') no-repeat center center;
  background-size: cover;
  padding: 5rem 0;
  color: black;
}

.btn-primary {
  display: inline-block;
  margin-top: 1rem;
  padding: 0.75rem 1.5rem;
  background-color: #e74c3c;
  color: white;
  text-decoration: none;
  border-radius: 5px;
}

.footer {
  background-color: #2c3e50;
  color: white;
  padding: 1rem;
  margin-top: 2rem;
}
</style>