import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Print startup information
console.log('Initializing Vite configuration...');
console.log('Current environment:', process.env.NODE_ENV);
console.log('API URL:', process.env.VITE_API_BASE_URL || 'http://localhost:8082/api');

export default defineConfig({
  plugins: [vue()],
  css: {
    postcss: true, // Enable PostCSS
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    // Avoid shallowRef error
    __VUE_OPTIONS_API__: true,
    __VUE_PROD_DEVTOOLS__: false,
    // Define API URL for frontend use
    'process.env.API_URL': JSON.stringify('http://192.168.1.4:8082/api')
  },
  // Reduce optimization scope
  optimizeDeps: {
    include: ['vue', 'vue-router', 'pinia', 'element-plus']
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      // Provide aliases for Node.js core modules
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
        target: 'http://192.168.1.4:8082',
        changeOrigin: true,
        secure: false,
        configure: (proxy, options) => {
          // Log detail level
          proxy.options.logLevel = 'debug';
          // Log proxy request details
          proxy.on('proxyReq', (proxyReq, req, res) => {
            console.log('Proxy request:', req.method, req.url, '->',
              options.target + proxyReq.path);
          });
          // Log proxy response details
          proxy.on('proxyRes', (proxyRes, req, res) => {
            console.log('Proxy response:', proxyRes.statusCode, req.url);
          });
          // Log proxy error information
          proxy.on('error', (err, req, res) => {
            console.error('Proxy error:', err, req.url);
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
