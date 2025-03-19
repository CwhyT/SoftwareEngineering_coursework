/**
 * 模拟管理员API数据
 * 仅用于开发和测试
 */

// 仪表盘统计数据
export const mockDashboardStats = {
  totalUsers: 2589,
  totalRevenue: 12680.5,
  activeRentals: 156,
  pendingFeedbacks: 23,
  usersTrend: 5.2,
  revenueTrend: 8.5,
  rentalsTrend: -2.3,
  feedbacksTrend: 12.7
}

// 收入趋势数据
export const mockRevenueTrend = {
  week: {
    dates: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
    values: [820, 932, 901, 934, 1290, 1330, 1320]
  },
  month: {
    dates: Array.from({ length: 30 }, (_, i) => `${i + 1}日`),
    values: Array.from({ length: 30 }, () => Math.floor(Math.random() * 1000) + 500)
  },
  year: {
    dates: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    values: [2500, 2200, 2800, 3500, 3200, 3800, 4200, 4500, 4300, 4800, 5200, 5500]
  }
}

// 用户活跃度数据
export const mockUserActivity = {
  week: {
    dates: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
    newUsers: [120, 132, 101, 134, 90, 230, 210],
    activeUsers: [220, 182, 191, 234, 290, 330, 310]
  },
  month: {
    dates: Array.from({ length: 30 }, (_, i) => `${i + 1}日`),
    newUsers: Array.from({ length: 30 }, () => Math.floor(Math.random() * 100) + 50),
    activeUsers: Array.from({ length: 30 }, () => Math.floor(Math.random() * 200) + 100)
  }
}

// 设备使用率数据
export const mockDeviceUsage = {
  data: [
    { value: 1048, name: '使用中' },
    { value: 735, name: '空闲' },
    { value: 580, name: '维修中' },
    { value: 484, name: '离线' }
  ]
}

// 问题反馈统计数据
export const mockFeedbackStats = {
  categories: ['设备故障', '软件问题', '账户问题', '计费问题', '其他'],
  values: [56, 85, 42, 23, 19]
}

// 最近活动数据
export const mockRecentActivities = {
  items: [
    {
      id: 1,
      type: 'primary',
      time: '2023-06-10 10:23:45',
      content: '用户 Zhang San 租赁了一辆滑板车'
    },
    {
      id: 2,
      type: 'success',
      time: '2023-06-10 09:15:30',
      content: '用户 Li Si 完成了一次租赁，支付了¥25.5'
    },
    {
      id: 3,
      type: 'warning',
      time: '2023-06-10 08:45:12',
      content: '设备 SC-10235 发出了低电量警告'
    },
    {
      id: 4,
      type: 'danger',
      time: '2023-06-10 08:30:00',
      content: '用户 Wang Wu 提交了一个关于软件问题的反馈'
    },
    {
      id: 5,
      type: 'info',
      time: '2023-06-10 08:15:00',
      content: '管理员更新了收费标准'
    },
    {
      id: 6,
      type: 'primary',
      time: '2023-06-09 18:23:45',
      content: '新用户 Zhao Liu 完成了注册'
    },
    {
      id: 7,
      type: 'success',
      time: '2023-06-09 17:15:30',
      content: '技术人员完成了对设备 SC-10187 的维修'
    },
    {
      id: 8,
      type: 'warning',
      time: '2023-06-09 16:45:12',
      content: '设备 SC-10350 离线超过24小时'
    },
    {
      id: 9,
      type: 'info',
      time: '2023-06-09 15:30:00',
      content: '系统自动生成了月度财务报表'
    },
    {
      id: 10,
      type: 'primary',
      time: '2023-06-09 14:15:00',
      content: '用户 Sun Qi 充值了¥100到账户余额'
    }
  ],
  hasMore: true
}

// 第二页最近活动数据
export const mockRecentActivitiesPage2 = {
  items: [
    {
      id: 11,
      type: 'primary',
      time: '2023-06-09 13:23:45',
      content: '用户 Qian Ba 租赁了一辆滑板车'
    },
    {
      id: 12,
      type: 'success',
      time: '2023-06-09 12:15:30',
      content: '用户 Zhou Jiu 完成了一次租赁，支付了¥18.5'
    },
    {
      id: 13,
      type: 'warning',
      time: '2023-06-09 11:45:12',
      content: '设备 SC-10422 发出了低电量警告'
    },
    {
      id: 14,
      type: 'danger',
      time: '2023-06-09 10:30:00',
      content: '用户 Wu Shi 提交了一个关于设备故障的反馈'
    },
    {
      id: 15,
      type: 'info',
      time: '2023-06-09 09:15:00',
      content: '管理员添加了新的滑板车设备'
    }
  ],
  hasMore: false
} 