// No longer importing patch file as it's not applicable in browser environment
// import './utils/deprecation-fix';

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { ElMessage } from 'element-plus'
import { checkApiConnection, waitForApiConnection } from './utils/networkCheck'

// Style import order is important, ensure Element Plus styles are imported before custom styles
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'

// Import Tailwind CSS
import './assets/tailwind.css'

// Import custom styles, ensure loading after Element Plus styles to allow overrides
import './assets/main.css'
import './styles/index.css'
import './styles/common.css'
// Import icon fix CSS
import './styles/icon-fix.css'

// Import all Element Plus icons
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import VChart from 'vue-echarts'

import App from './App.vue'
import router from './router'

// Import complete ECharts library
import * as echarts from 'echarts'

const app = createApp(App)

// Force pre-register all Element Plus icons
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

// Globally register VChart component
app.component('VChart', VChart)

// Mount echarts to global
app.config.globalProperties.$echarts = echarts

app.use(createPinia())
app.use(router)
app.use(ElementPlus, {
  size: 'default',
  // Disable icon lazy loading, preload all icons
  icons: ElementPlusIconsVue
})

// Global error handling
app.config.errorHandler = (err, vm, info) => {
  console.error('Vue global error:', err, info)
}

// Check API connection
const checkConnection = async () => {
  const isConnected = await waitForApiConnection(3, 2000);

  if (!isConnected) {
    // No longer showing global error message
    console.warn('API connection check failed, but allowing application to continue running');

    // Add network status listener
    window.addEventListener('online', () => {
      checkApiConnection().then(connected => {
        if (connected) {
          ElMessage({
            message: 'Network restored, you can continue using the application',
            type: 'success',
            duration: 3000
          });
        }
      });
    });
  } else {
    console.log('API connection successful, application started normally');
  }
};

// Start application
app.mount('#app');

// Check connection after application mount
checkConnection();
