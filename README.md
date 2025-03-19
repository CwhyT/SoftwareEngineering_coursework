# 电动滑板车租赁系统前端

基于 Vue 3 + Vite + Tailwind CSS + Element Plus 开发的现代化电动滑板车租赁Web应用。

## 功能特点

### 用户端
- 登录/注册系统
- 滑板车地图分布查看
- 在线租赁功能
- 支付功能（支持支付宝/微信）
- 个人中心
- 问题反馈

### 管理员端
- 数据统计仪表盘
- 用户管理系统
- 收入统计分析
- 反馈问题处理

## 技术栈
- Vue 3 - 渐进式 JavaScript 框架
- Vite - 下一代前端构建工具
- Tailwind CSS - 原子化 CSS 框架
- Element Plus - Vue 3 UI 组件库
- Vue Router - 路由管理
- Pinia - 状态管理
- ECharts - 数据可视化
- 高德地图 API - 地图服务

## 项目结构
```
escooter-rental/
├── src/
│   ├── assets/          # 静态资源
│   ├── components/      # 通用组件
│   ├── views/           # 页面组件
│   ├── router/          # 路由配置
│   ├── stores/          # Pinia 状态管理
│   ├── utils/           # 工具函数
│   ├── api/             # API 接口
│   ├── styles/          # 全局样式
│   ├── layouts/         # 布局组件
│   └── App.vue          # 根组件
├── public/              # 公共资源
├── index.html           # HTML 模板
├── vite.config.js       # Vite 配置
├── tailwind.config.js   # Tailwind 配置
└── package.json         # 项目依赖
```

## 安装和运行

1. 安装依赖
```bash
npm install
```

2. 启动开发服务器
```bash
npm run dev
```

3. 构建生产版本
```bash
npm run build
```

## 环境要求
- Node.js 16+
- npm 7+

## 浏览器支持
- Chrome
- Firefox
- Safari
- Edge

## 开发团队
- 前端开发团队

## 许可证
MIT 
