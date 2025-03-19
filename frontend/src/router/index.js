import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/components/HomePage.vue';
import RegisterPage from '@/components/RegisterPage.vue';
import LoginPage from '@/components/LoginPage.vue';

const routes = [
    { path: '/', redirect: '/home' },  // 访问 `/` 时自动跳转到 `/home`
    { path: '/home', component: Home },
    { path: '/register', component: RegisterPage },
    { path: '/login', component: LoginPage }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
