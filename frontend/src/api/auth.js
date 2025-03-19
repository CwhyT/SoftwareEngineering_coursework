import axios from 'axios';

const API_URL = 'http://localhost:8080/api/user';

const authApi = {
    /**
     * 用户注册
     * @param {Object} userData - { username, email, password }
     * @returns {Promise<Object>} - 返回后端的 JSON 响应
     */
    register(userData) {
        return axios.post(`${API_URL}/register`, userData)
            .then(response => response.data)
            .catch(error => {
                console.error('注册失败:', error.response?.data || error.message);
                throw error.response ? error.response.data : error;
            });
    },

    /**
     * 用户登录
     * @param {Object} credentials - { email, password }
     * @returns {Promise<Object>} - 返回后端的 JSON 响应
     */
    login(credentials) {
        return axios.post(`${API_URL}/login`, credentials)
            .then(response => response.data)
            .catch(error => {
                console.error('登录失败:', error.response?.data || error.message);
                throw error.response ? error.response.data : error;
            });
    }
};

export default authApi;
