import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { userApi } from '@/api/user'  // Import userApi

// Function to generate JWT token (Base64 version, implemented in frontend)
function generateJwtToken(payload, secret) {
  // Frontend cannot use full JWT library, create a simplified token format
  // Note: This is not real JWT encryption, just to simulate token format
  const header = { alg: 'HS256', typ: 'JWT' };
  const encodedHeader = btoa(JSON.stringify(header));
  const encodedPayload = btoa(JSON.stringify(payload));

  // In real cases, this should use a secret key for signing
  // But in frontend we can only simulate
  const signature = btoa(
    JSON.stringify(payload) + secret
  ).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');

  return `${encodedHeader}.${encodedPayload}.${signature}`;
}

export const useUserStore = defineStore('user', () => {
  // State
  const token = ref(localStorage.getItem('token') || '');
  const user = ref(JSON.parse(localStorage.getItem('user') || 'null'));
  const loading = ref(false);
  const error = ref(null);

  // Computed properties
  function isUserInfoValid(u) {
    return u && typeof u === 'object' && u.username && u.email;
  }

  const isLoggedIn = computed(() => !!token.value && isUserInfoValid(user.value));
  const isAuthenticated = isLoggedIn;
  const isAdmin = computed(() => !!user.value && user.value.role === 'admin');
  const username = computed(() => user.value?.username || '');

  // Login functionality
  async function login(credentials) {
    loading.value = true;
    error.value = null;
    try {
      const response = await userApi.login(credentials);
      if (response.success && response.token) {
        setToken(response.token);
        // After login, force fetch user info, use response.user if exists, otherwise call getProfile
        let userInfo = response.user;
        if (!userInfo) {
          const profileResp = await userApi.getProfile();
          if (profileResp && profileResp.username) {
            userInfo = profileResp;
          }
        }
        if (userInfo && userInfo.username) {
          setUser(userInfo);
          return { success: true, user: userInfo };
        } else {
          logout();
          error.value = 'Failed to get user information';
          return { success: false, message: error.value };
        }
      } else {
        error.value = response.message || 'Login failed';
        return { success: false, message: error.value };
      }
    } catch (err) {
      console.error('Login error:', err);
      error.value = err.message || 'An error occurred during login';
      return { success: false, message: error.value };
    } finally {
      loading.value = false;
    }
  }

  // Automatically validate token on startup
  async function checkTokenOnStartup() {
    if (token.value) {
      try {
        const profileResp = await userApi.getProfile();
        if (profileResp && profileResp.username) {
          setUser(profileResp);
        } else {
          logout();
        }
      } catch (e) {
        logout();
      }
    } else {
      logout();
    }
  }
  checkTokenOnStartup();

  // Actions
  function setUser(newUser) {
    user.value = newUser;
    localStorage.setItem('user', JSON.stringify(newUser));
  }

  function setToken(newToken) {
    token.value = newToken;
    localStorage.setItem('token', newToken);
  }

  function logout() {
    token.value = '';
    user.value = null;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  // Set or update phone number
  function setPhone(phoneNumber) {
    if (!user.value) return;

    user.value.phone = phoneNumber;
    localStorage.setItem('user', JSON.stringify(user.value));
    return true;
  }

  // Set or update points
  function setPoints(points) {
    if (!user.value) return false;

    user.value.points = points;
    localStorage.setItem('user', JSON.stringify(user.value));
    return true;
  }

  // Deactivate user account (delete account from system)
  async function deactivateAccount() {
    try {
      // Ensure authentication token exists
      if (!token.value) {
        console.error('Deactivation failed: Not logged in, cannot deactivate account');
        return { success: false, message: 'Not logged in, cannot deactivate account' };
      }

      console.log('Sending deactivation request with token:', token.value);
      // Call backend API to deactivate account
      const response = await userApi.deactivateAccount();
      console.log('Deactivation response:', response);

      if (response && response.data && response.data.success) {
        // Clear local user data after success
        logout();
        return { success: true, message: response.data.message || 'Account successfully deactivated' };
      } else {
        console.error('Deactivation failed:', response?.data);
        return { success: false, message: response?.data?.message || 'Failed to deactivate account' };
      }
    } catch (error) {
      console.error('Account deactivation error:', error);

      // Extract error message
      let errorMessage = 'An error occurred during account deactivation';

      if (error.response) {
        console.error('Error status:', error.response.status);
        console.error('Error data:', error.response.data);
        errorMessage = error.response.data?.message || `Server error (${error.response.status})`;
      } else if (error.request) {
        console.error('Request sent but no response received:', error.request);
        errorMessage = 'Server not responding, please check network connection';
      } else {
        console.error('Request configuration error:', error.message);
        errorMessage = `Request error: ${error.message}`;
      }

      return {
        success: false,
        message: errorMessage
      };
    }
  }

  return {
    token,
    user,
    loading,
    error,
    isLoggedIn,
    isAuthenticated,
    isAdmin,
    username,
    login,
    logout,
    setToken,
    setUser,
    setPhone,
    setPoints,
    deactivateAccount
  }
})
