<template>
  <nav class="navbar fixed-top bg-light">
    <!-- 左侧 Logo -->
    <div class="navbar-left">
      <h1>
        <router-link to="/" class="logo">ScooterHire</router-link>
      </h1>
    </div>

    <!-- 中间搜索框 -->
    <div class="navbar-center">
      <form @submit.prevent="handleSearch" class="search-form">
        <label class="search-label">
          <div class="search-box">
            <input v-model="searchQuery" type="text" class="search-input" placeholder="Search for scooters..." required />
            <button type="submit" class="search-button">
              <img src="/pictures/nav/search.png" alt="Search" />
            </button>
          </div>
        </label>
      </form>
    </div>

    <!-- 右侧导航 -->
    <div class="navbar-right">
      <!-- 用户已登录时显示用户名和登出 -->
      <router-link v-if="isLoggedIn" to="#" class="account">Hello, {{ username }}</router-link>
      <router-link v-if="isLoggedIn" to="#" class="logout" @click="logout">Logout</router-link>

      <!-- 用户未登录时显示“Sign in” -->
      <router-link v-else to="/login" class="account">Hello, Sign in</router-link>

      <router-link to="/orders" class="orders">Returns & Orders</router-link>
      <router-link to="/cart" class="cart">
        <img src="/pictures/nav/shoppingcart.png" alt="shoppingcart" /> Cart
      </router-link>
    </div>
  </nav>
</template>

<script>
export default {
  name: "NavBar",
  data() {
    return {
      searchQuery: "",
      isLoggedIn: false,
      username: "User"
    };
  },
  created() {
    // 检查用户是否已登录
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      this.isLoggedIn = true;
      this.username = user.username || "User";
    }
  },
  methods: {
    handleSearch() {
      if (this.searchQuery) {
        this.$router.push({ path: "/search", query: { q: this.searchQuery } });
      }
    },
    logout() {
      // 清除本地存储的用户信息
      localStorage.removeItem("user");
      this.isLoggedIn = false;
      this.username = "User";

      // 跳转到首页或登录页
      this.$router.push("/login");
    }
  }
};
</script>

<style scoped>
/* 导航栏样式 */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f4f4f4;
  padding: 10px 40px;
  border-bottom: 3px solid #ccc;
}

/* 左侧 Logo */
.navbar-left .logo {
  font-size: 24px;
  font-weight: bold;
  color: #333;
  text-decoration: none;
  margin-left: 20px;
}

/* 中间搜索框 */
.navbar-center {
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.search-form {
  display: flex;
  align-items: center;
}

.search-label {
  font-size: 16px;
  font-weight: bold;
  color: #333;
}

.search-box {
  display: flex;
  align-items: center;
  background: white;
  border-radius: 25px;
  overflow: hidden;
  border: 1px solid #ccc;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  margin-left: 10px;
}

.search-input {
  height: 40px;
  padding: 10px;
  border: none;
  outline: none;
  flex: 1;
  font-size: 16px;
  width: 250px;
}

.search-button {
  background-color: #ff9900;
  border: none;
  padding: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0 25px 25px 0;
}

.search-button img {
  width: 20px;
  height: 20px;
  filter: brightness(0) invert(1);
}

/* 右侧导航 */
.navbar-right {
  display: flex;
  align-items: center;
  margin-right: 20px;
}

.navbar-right a {
  margin-left: 15px;
  text-decoration: none;
  color: #333;
  font-size: 18px;
}

.navbar-right .cart img {
  width: 23px;
  height: 23px;
  margin-right: 5px;
}
</style>
