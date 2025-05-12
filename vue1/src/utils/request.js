import axios from 'axios';
import { ElMessage } from 'element-plus';
import router from '@/router';

// Create axios instance
const service = axios.create({
  baseURL: 'http://192.168.1.4:8082',
  timeout: 15000, // Request timeout 15 seconds
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Request interceptor
service.interceptors.request.use(
  config => {
    // Get token and add to request header
    const token = localStorage.getItem('token');
    if (token) {
      // Ensure token format is correct
      if (token.trim() !== '') {
        config.headers['Authorization'] = `Bearer ${token}`;

        // Print token info in development environment
        if (import.meta.env.DEV) {
          console.log(`[API Request] ${config.method?.toUpperCase() || 'GET'} ${config.url}`);
          console.log(`[Token] Using token: ${token.substring(0, 20)}...`);
        }
      } else {
        console.warn('Token in local storage is empty, not adding Authorization header');
      }
    } else {
      // Print warning about missing token in development environment
      if (import.meta.env.DEV) {
        // Exclude public API paths that don't need token
        const publicPaths = ['/api/auth/login', '/api/auth/register', '/api/auth/send-email-code'];
        if (!publicPaths.some(path => config.url?.includes(path))) {
          console.warn(`[Warning] API request ${config.url} has no token provided`);

          // For admin paths, automatically use admin token
          if (config.url?.includes('/admin/')) {
            console.log('Detected admin API request, trying to use hardcoded admin token');
            const adminToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFkbWluLWlkIiwidXNlcm5hbWUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AZXhhbXBsZS5jb20iLCJyb2xlIjoiYWRtaW4ifQ.aBcDeFgHiJkLmNoPqRsTuVwXyZ';
            config.headers['Authorization'] = `Bearer ${adminToken}`;
            console.log('Added admin token to request header');
          }
        }
      }
    }

    return config;
  },
  error => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
service.interceptors.response.use(
  response => {
    // Simplify response data
    let res = response;

    // If response is ArrayBuffer or Blob, don't process
    if (response.data instanceof ArrayBuffer || response.data instanceof Blob) {
      return response;
    }

    // Check if response has been processed
    if (response.data !== undefined) {
      res = response.data;
    }

    // Print response info in development environment
    if (import.meta.env.DEV) {
      console.log(`[API Response] ${response.config.url}`, res);
    }

    // Check if response contains explicit success field
    if (res && typeof res === 'object' && 'success' in res && !res.success) {
      // If backend explicitly returns failure status, use message
      ElMessage.error(res.message || 'Operation failed');
      return Promise.reject(new Error(res.message || 'Operation failed'));
    }

    return res;
  },
  error => {
    console.log('Request response error:', error);

    // Handle based on error type
    if (error.response) {
      // Server returned error status code
      const status = error.response.status;
      const data = error.response.data || {};

      // Print more error info in development environment
      if (import.meta.env.DEV) {
        console.error(`API Error(${status}):`, data);
      }

      switch (status) {
        case 400:
          ElMessage.error(data.message || 'Invalid request parameters');
          break;
        case 401:
          ElMessage.error(data.message || 'Login status expired, please login again');
          localStorage.removeItem('token');
          router.push('/login');
          break;
        case 403:
          ElMessage.error(data.message || 'No permission to access');
          break;
        case 404:
          ElMessage.error(data.message || 'Requested resource not found');
          break;
        case 500:
          ElMessage.error(data.message || 'Internal server error');
          break;
        default:
          ElMessage.error(data.message || `Request failed (${status})`);
      }
    } else if (error.request) {
      // Request sent but no response received
      if (error.message.includes('timeout')) {
        ElMessage.error('Request timeout, please try again later');
      } else {
        ElMessage.error('Network error, please check your connection or server status');
      }
    } else {
      // Error occurred while setting up request
      ElMessage.error(error.message || 'Request failed');
    }

    return Promise.reject(error);
  }
);

export default service;
