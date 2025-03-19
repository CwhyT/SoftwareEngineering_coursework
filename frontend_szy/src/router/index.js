import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/user'

// 用户端路由
const userRoutes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/user/Login.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/user/Register.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/',
    component: () => import('@/layouts/UserLayout.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/views/user/SimpleHome.vue')
      },
      {
        path: 'rent',
        name: 'Rent',
        component: () => import('@/views/user/Rent.vue'),
        meta: { requiresAuth: false }
      },
      {
        path: 'payment',
        name: 'Payment',
        component: () => import('@/views/user/Payment.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'profile',
        name: 'Profile',
        component: () => import('@/views/user/Profile.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'feedback',
        name: 'Feedback',
        component: () => import('@/views/user/Feedback.vue'),
        meta: { requiresAuth: true }
      }
    ]
  }
]

// 管理员端路由
const adminRoutes = [
  {
    path: '/admin/login',
    name: 'AdminLogin',
    component: () => import('@/views/admin/Login.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/admin',
    component: () => import('@/layouts/AdminLayout.vue'),
    meta: { requiresAuth: true, isAdmin: true },
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: () => import('@/views/admin/Dashboard.vue')
      },
      {
        path: 'users',
        name: 'UserManagement',
        component: () => import('@/views/admin/UserManagement.vue')
      },
      {
        path: 'revenue',
        name: 'Revenue',
        component: () => import('@/views/admin/Revenue.vue')
      },
      {
        path: 'feedback',
        name: 'FeedbackManagement',
        component: () => import('@/views/admin/FeedbackManagement.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes: [...userRoutes, ...adminRoutes]
})

// 路由守卫
router.beforeEach((to, from, next) => {
  // 开发模式下，忽略认证要求
  if (import.meta.env.DEV) {
    return next()
  }
  
  const userStore = useUserStore()
  const isAuthenticated = userStore.isAuthenticated
  
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login')
  } else if (to.meta.isAdmin && !userStore.isAdmin) {
    next('/')
  } else {
    next()
  }
})

export default router 