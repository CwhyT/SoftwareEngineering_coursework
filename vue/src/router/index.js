import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '../stores/user'
import { ElMessage } from 'element-plus'
import UserPage  from '@/views/admin/Users.vue'

// 路由配置
const routes = [
  // 默认路由 - 使用直接导入而非懒加载以避免首页闪烁
  {
    path: '/',
    component: () => import('../layouts/UserLayout.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('../views/user/Home.vue'),
        meta: { title: '首页' }
      },
      {
        path: 'profile',
        name: 'profile',
        component: () => import('../views/user/Profile.vue'),
        meta: { title: '个人中心', requiresAuth: true }
      },
      {
        path: 'payment',
        name: 'payment',
        component: () => import('../views/user/Payment.vue'),
        meta: { title: '充值', requiresAuth: true }
      },
      {
        path: 'rent',
        name: 'rent',
        component: () => import('../views/user/Rent.vue'),
        meta: { title: '租车', requiresAuth: true }
      },
      {
        path: 'scan',
        name: 'scan',
        component: () => import('../views/user/Scan.vue'),
        meta: { title: '扫码用车', requiresAuth: true }
      },
      {
        path: 'coupons',
        name: 'coupons',
        component: () => import('../views/user/Coupons.vue'),
        meta: { title: '优惠券', requiresAuth: true }
      },
      {
        path: 'messages',
        name: 'messages',
        component: () => import('../views/user/Messages.vue'),
        meta: { title: '消息通知', requiresAuth: true }
      },
      {
        path: 'help',
        name: 'help',
        component: () => import('../views/user/Help.vue'),
        meta: { title: '帮助中心' }
      },
      {
        path: 'about',
        name: 'about',
        component: () => import('../views/user/About.vue'),
        meta: { title: '关于我们' }
      },
      {
        path: 'rent/store/:storeId',
        name: 'RentStore',
        component: () => import('../views/user/RentStore.vue'),
        meta: { title: '门店车辆', requiresAuth: true }
      },
      {
        path: 'orders',
        name: 'OrderHistory',
        component: () => import('../views/user/OrderHistory.vue'),
        meta: { title: '历史订单', requiresAuth: true }
      }
    ]
  },

  // 管理员路由
  {
    path: '/admin',
    component: () => import('../layouts/AdminLayout.vue'),
    meta: { requiresAuth: true, requiresAdmin: true },
    children: [
      {
        path: 'store',
        name: 'admin-dashboard',
        component: () => import('../views/admin/Store.vue'),
        meta: { title: '车店管理', requiresAuth: true, requiresAdmin: true }
      },
      {
        path: 'users',
        name: 'admin-users',
        component:  UserPage,
        meta: { title: '用户管理', requiresAuth: true, requiresAdmin: true }
      },
      {
        path: 'vehicles',
        name: 'admin-vehicles',
        component: () => import('../views/admin/Vehicles.vue'),
        meta: { title: '车辆管理', requiresAuth: true, requiresAdmin: true }
      },
      {
        path: 'orders',
        name: 'admin-orders',
        component: () => import('../views/admin/Orders.vue'),
        meta: { title: '订单管理', requiresAuth: true, requiresAdmin: true }
      },
      {
        path: 'maintenance',
        name: 'admin-maintenance',
        component: () => import('../views/admin/Maintenance.vue'),
        meta: { title: '问题反馈管理', requiresAuth: true, requiresAdmin: true }
      },
      {
        path: 'database',
        name: 'admin-database',
        component: () => import('../views/admin/DatabaseManager.vue'),
        meta: { title: '优惠卷管理', requiresAuth: true, requiresAdmin: true }
      },
      {
        path: 'reports',
        name: 'admin-reports',
        component: () => import('../views/admin/Reports.vue'),
        meta: { title: '数据报表', requiresAuth: true, requiresAdmin: true }
      },
      {
        path: 'settings',
        name: 'admin-settings',
        component: () => import('../views/admin/Settings.vue'),
        meta: { title: '系统设置', requiresAuth: true, requiresAdmin: true }
      },
      {
        path: 'feedback',
        name: 'admin-feedback',
        component: () => import('../views/admin/Feedback.vue'),
        meta: { title: '反馈管理', requiresAuth: true, requiresAdmin: true }
      },
      {
        path: 'charts',
        name: 'admin-charts',
        component: () => import('../views/admin/Charts.vue'),
        meta: { title: '图表测试', requiresAuth: true, requiresAdmin: true }
      }
    ]
  },

  // 认证路由
  {
    path: '/auth',
    component: () => import('../layouts/UserLayout.vue'),
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import('../views/auth/Login.vue'),
        meta: { title: '登录' }
      },
      {
        path: 'register',
        name: 'register',
        component: () => import('../views/auth/Register.vue'),
        meta: { title: '注册' }
      },
      {
        path: 'forgot-password',
        name: 'forgot-password',
        component: () => import('../views/auth/ForgotPassword.vue'),
        meta: { title: '找回密码' }
      },
      {
        path: 'reset-password',
        name: 'reset-password',
        component: () => import('../views/auth/ResetPassword.vue'),
        meta: { title: '重置密码' }
      },
      {
        path: 'verify-email/:token?',
        name: 'verify-email',
        component: () => import('../views/auth/VerifyEmail.vue'),
        meta: { title: '验证邮箱' }
      }
    ]
  },

  // 登录注册别名路由
  {
    path: '/login',
    redirect: '/auth/login'
  },
  {
    path: '/register',
    redirect: '/auth/register'
  },

  // 404路由
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('../views/NotFound.vue'),
    meta: { title: '页面未找到' }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// 添加路由守卫
router.beforeEach((to, from, next) => {
  // 设置页面标题
  document.title = to.meta.title ? `${to.meta.title} - 电动滑板车租赁系统` : '电动滑板车租赁系统'

  const userStore = useUserStore()

  // 自动为开发环境生成管理员账户
  // if (import.meta.env.DEV && to.meta.requiresAdmin) {
  //   userStore.validateAdminAccess();
  // }

  // 需要登录的路由检查
  if (to.meta.requiresAuth && !userStore.isLoggedIn) {
    ElMessage({
      type: 'warning',
      message: '请先登录',
      duration: 2000
    })
    next({ name: 'login', query: { redirect: to.fullPath } })
    return
  }

  // 管理员权限检查 - 更严格地处理管理员路由
  if (to.meta.requiresAdmin && !userStore.isAdmin) {
    // 在开发环境下，自动设置当前用户为管理员
    // if (import.meta.env.DEV) {
      // userStore.ensureAdminAccess();
      next();
      // return;
    // }

    // ElMessage({
    //   type: 'warning',
    //   message: '您不是管理员，将被重定向到首页',
    //   duration: 2000
    // })
    // next({ name: 'home' })
    // return
  }

  next()
})

export default router
