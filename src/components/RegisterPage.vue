<template>
  <div class="register-box">
    <h1>Create Account</h1>
    <div v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>
    <div v-if="successMessage" class="alert alert-success">{{ successMessage }}</div>
    <form @submit.prevent="handleRegister">
      <div class="form-group">
        <label for="username" class="form-label">Username</label>
        <input v-model="form.username" type="text" class="form-control" required />
      </div>
      <div class="form-group">
        <label for="email" class="form-label">Email</label>
        <input v-model="form.email" type="email" class="form-control" required />
      </div>
      <div class="form-group">
        <label for="password" class="form-label">Password</label>
        <input v-model="form.password" type="password" class="form-control" required />
      </div>
      <div class="form-group">
        <label for="confirmPassword" class="form-label">Confirm Password</label>
        <input v-model="form.confirmPassword" type="password" class="form-control" required />
        <div v-if="passwordMismatch" class="alert alert-warning">Passwords do not match</div>
      </div>
      
      <button type="submit" class="btn btn-primary" :disabled="passwordMismatch || loading">
        {{ loading ? "Creating Account..." : "Create Account" }}
      </button>
      <hr />
      <div class="footer-link">
        <p>Already have an account?</p>
        <router-link to="/login" class="btn btn-secondary w-100">Login to your account</router-link>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "RegisterPage",
  data() {
    return {
      form: {
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
      },
      errorMessage: "",
      successMessage: "",
      loading: false
    };
  },
  computed: {
    passwordMismatch() {
      return this.form.password !== this.form.confirmPassword;
    }
  },
  methods: {
    async handleRegister() {
      if (this.passwordMismatch) {
        this.errorMessage = "Passwords do not match";
        return;
      }

      this.loading = true; // 显示加载状态
      this.errorMessage = "";
      this.successMessage = "";

      try {
        const response = await axios.post("http://localhost:8080/api/user/register", {
          username: this.form.username,
          email: this.form.email,
          password: this.form.password
        });

        if (response.data.message === "User registered successfully") {
          // 注册成功，存储用户信息
          localStorage.setItem("user", JSON.stringify(response.data));

          this.successMessage = "Registration successful! Redirecting...";
          setTimeout(() => {
            this.$router.push("/home"); // 直接跳转到主页
          }, 1500);
        } else {
          this.errorMessage = response.data.message || "Unexpected response from server";
        }
      } catch (error) {
        this.errorMessage = error.response?.data?.message || "Registration failed, please try again";
      } finally {
        this.loading = false; // 关闭加载状态
      }
    }
  }
};
</script>

<style scoped>
@import '@/assets/bootstrap/css/bootstrap.min.css';

.register-box {
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

.form-label {
  font-size: 14px;
  font-weight: bold;
  color: #333;
  display: block;
  margin-bottom: 5px;
}

.form-control {
  width: 100%;
  height: 38px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  box-sizing: border-box;
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
