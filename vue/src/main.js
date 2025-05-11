// 不再导入补丁文件，因为在浏览器环境下不适用
// import './utils/deprecation-fix';

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { ElMessage } from 'element-plus'
import { checkApiConnection, waitForApiConnection } from './utils/networkCheck'

// 样式导入顺序很重要，确保Element Plus样式在自定义样式之前导入
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'

// 引入Tailwind CSS
import './assets/tailwind.css'

// 引入自定义样式，确保在Element Plus样式之后加载，以便可以覆盖
import './assets/main.css'
import './styles/index.css'
import './styles/common.css'
// 引入图标修复CSS
import './styles/icon-fix.css'

// 导入所有Element Plus图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import VChart from 'vue-echarts'

import App from './App.vue'
import router from './router'

// 导入完整的ECharts库
import * as echarts from 'echarts'

const app = createApp(App)

// 强制预先注册所有Element Plus图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

// 全局注册VChart组件
app.component('VChart', VChart)

// 将echarts挂载到全局
app.config.globalProperties.$echarts = echarts

app.use(createPinia())
app.use(router)
app.use(ElementPlus, { 
  size: 'default',
  // 禁用图标按需加载，预先加载所有图标
  icons: ElementPlusIconsVue 
})

// 全局错误处理
app.config.errorHandler = (err, vm, info) => {
  console.error('Vue全局错误:', err, info)
}

// 检查API连接
const checkConnection = async () => {
  const isConnected = await waitForApiConnection(3, 2000);
  
  if (!isConnected) {
    // 不再显示全局错误提示
    console.warn('API连接检查失败，但允许应用继续运行');
    
    // 添加网络状态监听
    window.addEventListener('online', () => {
      checkApiConnection().then(connected => {
        if (connected) {
          ElMessage({
            message: '网络已恢复，可以继续使用',
            type: 'success',
            duration: 3000
          });
        }
      });
    });
  } else {
    console.log('API连接成功，应用正常启动');
  }
};

// 启动应用
app.mount('#app');

// 应用挂载后检查连接
checkConnection();
