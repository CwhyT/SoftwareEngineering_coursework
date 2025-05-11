import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { userApi } from '@/api/user'  // 导入userApi

// 生成JWT令牌的函数 (Base64版本，在前端实现)
function generateJwtToken(payload, secret) {
  // 前端无法使用完整的JWT库，创建一个简化的令牌格式
  // 注意：这不是真正的JWT加密，只是为了模拟令牌格式
  const header = { alg: 'HS256', typ: 'JWT' };
  const encodedHeader = btoa(JSON.stringify(header));
  const encodedPayload = btoa(JSON.stringify(payload));

  // 在实际情况下，这里应该使用密钥进行签名
  // 但在前端我们只能模拟
  const signature = btoa(
    JSON.stringify(payload) + secret
  ).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');

  return `${encodedHeader}.${encodedPayload}.${signature}`;
}

export const useUserStore = defineStore('user', () => {
  // 状态
  const token = ref(localStorage.getItem('token') || '');
  const user = ref(JSON.parse(localStorage.getItem('user') || 'null'));
  const loading = ref(false);
  const error = ref(null);

  // 计算属性
  function isUserInfoValid(u) {
    return u && typeof u === 'object' && u.username && u.email;
  }

  const isLoggedIn = computed(() => !!token.value && isUserInfoValid(user.value));
  const isAuthenticated = isLoggedIn;
  const isAdmin = computed(() => !!user.value && user.value.role === 'admin');
  const username = computed(() => user.value?.username || '');

  // 登录功能
  async function login(credentials) {
    loading.value = true;
    error.value = null;
    try {
      const response = await userApi.login(credentials);
      if (response.success && response.token) {
        setToken(response.token);
        // 登录后强制拉取用户信息，如果response.user存在优先用，否则再调getProfile
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
          error.value = '获取用户信息失败';
          return { success: false, message: error.value };
        }
      } else {
        error.value = response.message || '登录失败';
        return { success: false, message: error.value };
      }
    } catch (err) {
      console.error('登录错误:', err);
      error.value = err.message || '登录过程中发生错误';
      return { success: false, message: error.value };
    } finally {
      loading.value = false;
    }
  }

  // 启动时自动校验token有效性
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

  // 动作
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

  // 设置或更新手机号
  function setPhone(phoneNumber) {
    if (!user.value) return;

    user.value.phone = phoneNumber;
    localStorage.setItem('user', JSON.stringify(user.value));
    return true;
  }

  // 设置或更新积分
  function setPoints(points) {
    if (!user.value) return false;

    user.value.points = points;
    localStorage.setItem('user', JSON.stringify(user.value));
    return true;
  }

  // 注销用户账户（从系统中删除账户）
  async function deactivateAccount() {
    try {
      // 确保有认证令牌
      if (!token.value) {
        console.error('注销失败: 未登录状态，无法注销账户');
        return { success: false, message: '未登录状态，无法注销账户' };
      }

      console.log('发送注销账户请求，使用令牌:', token.value);
      // 调用后端API注销账户
      const response = await userApi.deactivateAccount();
      console.log('注销账户响应:', response);

      if (response && response.data && response.data.success) {
        // 成功后清除本地用户数据
        logout();
        return { success: true, message: response.data.message || '账户已成功注销' };
      } else {
        console.error('注销失败:', response?.data);
        return { success: false, message: response?.data?.message || '注销账户失败' };
      }
    } catch (error) {
      console.error('注销账户错误:', error);

      // 提取错误信息
      let errorMessage = '注销账户过程中发生错误';

      if (error.response) {
        console.error('错误状态:', error.response.status);
        console.error('错误数据:', error.response.data);
        errorMessage = error.response.data?.message || `服务器错误(${error.response.status})`;
      } else if (error.request) {
        console.error('请求发送但未收到响应:', error.request);
        errorMessage = '服务器未响应，请检查网络连接';
      } else {
        console.error('请求配置错误:', error.message);
        errorMessage = `请求错误: ${error.message}`;
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
