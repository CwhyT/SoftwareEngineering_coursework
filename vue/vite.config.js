import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// 打印启动信息
console.log('Vite配置初始化中...');
console.log('当前环境:', process.env.NODE_ENV);
console.log('API地址:', process.env.VITE_API_BASE_URL || 'http://localhost:8082/api');

export default defineConfig({
  plugins: [vue()],
  css: {
    postcss: true, // 启用PostCSS
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    // 避免shallowRef错误
    __VUE_OPTIONS_API__: true,
    __VUE_PROD_DEVTOOLS__: false,
    // 定义API地址供前端使用
    'process.env.API_URL': JSON.stringify('http://192.168.31.45:8082/api')
  },
  // 减少优化范围
  optimizeDeps: {
    include: ['vue', 'vue-router', 'pinia', 'element-plus']
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      // 为Node.js核心模块提供别名
      util: 'util/',
    },
  },
  server: {
    port: 5174,
    host: '0.0.0.0',
    strictPort: false,
    cors: true,
    proxy: {
      '/api': {
        target: 'http://192.168.31.45:8082',
        changeOrigin: true,
        secure: false,
        configure: (proxy, options) => {
          // 日志详细程度
          proxy.options.logLevel = 'debug';
          // 记录代理请求的详细信息
          proxy.on('proxyReq', (proxyReq, req, res) => {
            console.log('代理请求:', req.method, req.url, '->',
                      options.target + proxyReq.path);
          });
          // 记录代理响应的详细信息
          proxy.on('proxyRes', (proxyRes, req, res) => {
            console.log('代理响应:', proxyRes.statusCode, req.url);
          });
          // 记录代理错误信息
          proxy.on('error', (err, req, res) => {
            console.error('代理错误:', err, req.url);
          });
        }
      }
    }
  },
  build: {
    sourcemap: true,
    target: 'es2015',
    minify: false
  }
});
