<template>
  <div class="user-profile">
    <div class="profile-card">
      <h2>Personal Information</h2>
      <div v-if="user">
        <div class="info-row"><span>Username:</span>{{ user.username }}</div>
        <div class="info-row"><span>Email:</span>{{ user.email }}</div>
        <div class="info-row"><span>Phone Number:</span>{{ user.phoneNumber }}</div>
        <div class="info-row"><span>Birth Date:</span>{{ user.birthDate }}</div>
      </div>
      <div v-else>Loading...</div>
      <button class="change-btn" @click="showPwd = !showPwd">Change Password</button>
      <div v-if="showPwd" class="change-password">
        <input v-model="oldPassword" type="password" placeholder="Old Password" />
        <input v-model="newPassword" type="password" placeholder="New Password" />
        <button @click="changePassword">Confirm Change</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { userApi } from '../api/user';

const user = ref(null);
const showPwd = ref(false);
const oldPassword = ref('');
const newPassword = ref('');

onMounted(async () => {
  user.value = await userApi.getProfile();
});

const changePassword = async () => {
  if (!oldPassword.value || !newPassword.value) {
    alert('Please enter complete information');
    return;
  }
  const res = await userApi.changePassword(oldPassword.value, newPassword.value);
  if (res && res.success !== false) {
    alert('Password changed successfully');
    showPwd.value = false;
    oldPassword.value = '';
    newPassword.value = '';
  } else {
    alert(res.message || 'Failed to change password');
  }
};
</script>

<style scoped>
.user-profile {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  background: #f5f7fa;
}
.profile-card {
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.08);
  padding: 32px 40px;
  min-width: 320px;
  max-width: 90vw;
}
.profile-card h2 {
  text-align: center;
  margin-bottom: 24px;
}
.info-row {
  margin-bottom: 12px;
  font-size: 16px;
  color: #333;
}
.info-row span {
  color: #888;
  margin-right: 8px;
}
.change-btn {
  width: 100%;
  margin: 18px 0 0 0;
  padding: 10px;
  background: #409eff;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
}
.change-btn:hover {
  background: #1976d2;
}
.change-password {
  margin-top: 18px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.change-password input {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}
.change-password button {
  padding: 8px;
  background: #67c23a;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.change-password button:hover {
  background: #43a047;
}
</style> 