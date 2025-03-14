<template>
  <div class="login-box">
    <h1>Sign in</h1>
    <div v-if="errorMessage" class="alert alert-danger" role="alert">
      {{ errorMessage }}
    </div>
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label for="email" class="form-label">Email</label>
        <input v-model="form.email" type="email" id="email" class="form-control" required />
      </div>
      <div class="form-group">
        <label for="password" class="form-label">Password</label>
        <input v-model="form.password" type="password" id="password" class="form-control" required />
      </div>
      <button type="submit" class="btn btn-primary">Continue</button>
    </form>
    <div class="footer-link mt-3">
      <a href="#">Need help?</a>
    </div>
    <hr />
    <div class="footer-link">
      <p>New to our platform?</p>
      <router-link to="/register" class="btn btn-secondary w-100">Create your account</router-link>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "LoginPage",
  data() {
    return {
      form: {
        email: "",
        password: ""
      },
      errorMessage: ""
    };
  },
  methods: {
    async handleLogin() {
      if (!this.form.email || !this.form.password) {
        this.errorMessage = "Email and password are required!";
        return;
      }

      try {
        const response = await axios.post("http://localhost:8080/api/user/login", {
          email: this.form.email,
          password: this.form.password
        });

        // 存储用户信息
        localStorage.setItem("user", JSON.stringify(response.data));

        // 登录成功后跳转到主页
        this.$router.push("/home");
      } catch (error) {
        this.errorMessage = error.response?.data?.message || "Login failed, please check your credentials.";
      }
    }
  }
};
</script>

<style scoped>
@import '@/assets/bootstrap/css/bootstrap.min.css';

.login-box {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 350px;
  text-align: center;
}

h1 {
  font-size: 24px;
  margin-bottom: 20px;
  font-weight: bold;
  color: #111;
}

.form-group {
  text-align: left;
  margin-bottom: 15px;
}

.btn-primary {
  background-color: #f0c14b;
  border-color: #a88734;
  color: #111;
  width: 100%;
  height: 40px;
  font-size: 16px;
  margin-top: 10px;
  border-radius: 4px;
  cursor: pointer;
}

.btn-primary:hover {
  background-color: #ddb347;
}
</style>
