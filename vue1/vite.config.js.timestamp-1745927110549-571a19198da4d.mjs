// vite.config.js
import { defineConfig } from "file:///Users/shenzeyu/Desktop/SoftwareEngineering_coursewrok/Project_2/node_modules/vite/dist/node/index.js";
import vue from "file:///Users/shenzeyu/Desktop/SoftwareEngineering_coursewrok/Project_2/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import path from "path";
import { fileURLToPath } from "url";
var __vite_injected_original_import_meta_url = "file:///Users/shenzeyu/Desktop/SoftwareEngineering_coursewrok/Project_2/vite.config.js";
var __dirname = path.dirname(fileURLToPath(__vite_injected_original_import_meta_url));
console.log("Vite\u914D\u7F6E\u521D\u59CB\u5316\u4E2D...");
console.log("\u5F53\u524D\u73AF\u5883:", process.env.NODE_ENV);
console.log("API\u5730\u5740:", process.env.VITE_API_BASE_URL || "http://localhost:8082/api");
var vite_config_default = defineConfig({
  plugins: [vue()],
  css: {
    postcss: false
    // 完全禁用PostCSS
  },
  define: {
    "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV || "development"),
    // 避免shallowRef错误
    __VUE_OPTIONS_API__: true,
    __VUE_PROD_DEVTOOLS__: false
  },
  // 减少优化范围
  optimizeDeps: {
    include: ["vue", "vue-router", "pinia"]
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  },
  server: {
    port: 5173,
    host: "0.0.0.0",
    strictPort: false,
    cors: true,
    proxy: {
      "/api": {
        target: "http://localhost:8082",
        changeOrigin: true,
        secure: false
      }
    }
  },
  build: {
    sourcemap: true,
    target: "es2015",
    minify: false
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvc2hlbnpleXUvRGVza3RvcC9Tb2Z0d2FyZUVuZ2luZWVyaW5nX2NvdXJzZXdyb2svUHJvamVjdF8yXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvc2hlbnpleXUvRGVza3RvcC9Tb2Z0d2FyZUVuZ2luZWVyaW5nX2NvdXJzZXdyb2svUHJvamVjdF8yL3ZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9zaGVuemV5dS9EZXNrdG9wL1NvZnR3YXJlRW5naW5lZXJpbmdfY291cnNld3Jvay9Qcm9qZWN0XzIvdml0ZS5jb25maWcuanNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IHsgZmlsZVVSTFRvUGF0aCB9IGZyb20gJ3VybCc7XG5cbmNvbnN0IF9fZGlybmFtZSA9IHBhdGguZGlybmFtZShmaWxlVVJMVG9QYXRoKGltcG9ydC5tZXRhLnVybCkpO1xuXG4vLyBcdTYyNTNcdTUzNzBcdTU0MkZcdTUyQThcdTRGRTFcdTYwNkZcbmNvbnNvbGUubG9nKCdWaXRlXHU5MTREXHU3RjZFXHU1MjFEXHU1OUNCXHU1MzE2XHU0RTJELi4uJyk7XG5jb25zb2xlLmxvZygnXHU1RjUzXHU1MjREXHU3M0FGXHU1ODgzOicsIHByb2Nlc3MuZW52Lk5PREVfRU5WKTtcbmNvbnNvbGUubG9nKCdBUElcdTU3MzBcdTU3NDA6JywgcHJvY2Vzcy5lbnYuVklURV9BUElfQkFTRV9VUkwgfHwgJ2h0dHA6Ly9sb2NhbGhvc3Q6ODA4Mi9hcGknKTtcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW3Z1ZSgpXSxcbiAgY3NzOiB7XG4gICAgcG9zdGNzczogZmFsc2UsIC8vIFx1NUI4Q1x1NTE2OFx1Nzk4MVx1NzUyOFBvc3RDU1NcbiAgfSxcbiAgZGVmaW5lOiB7XG4gICAgJ3Byb2Nlc3MuZW52Lk5PREVfRU5WJzogSlNPTi5zdHJpbmdpZnkocHJvY2Vzcy5lbnYuTk9ERV9FTlYgfHwgJ2RldmVsb3BtZW50JyksXG4gICAgLy8gXHU5MDdGXHU1MTREc2hhbGxvd1JlZlx1OTUxOVx1OEJFRlxuICAgIF9fVlVFX09QVElPTlNfQVBJX186IHRydWUsXG4gICAgX19WVUVfUFJPRF9ERVZUT09MU19fOiBmYWxzZVxuICB9LFxuICAvLyBcdTUxQ0ZcdTVDMTFcdTRGMThcdTUzMTZcdTgzMDNcdTU2RjRcbiAgb3B0aW1pemVEZXBzOiB7XG4gICAgaW5jbHVkZTogWyd2dWUnLCAndnVlLXJvdXRlcicsICdwaW5pYSddXG4gIH0sXG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczoge1xuICAgICAgJ0AnOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi9zcmMnKSxcbiAgICB9LFxuICB9LFxuICBzZXJ2ZXI6IHtcbiAgICBwb3J0OiA1MTczLFxuICAgIGhvc3Q6ICcwLjAuMC4wJyxcbiAgICBzdHJpY3RQb3J0OiBmYWxzZSxcbiAgICBjb3JzOiB0cnVlLFxuICAgIHByb3h5OiB7XG4gICAgICAnL2FwaSc6IHtcbiAgICAgICAgdGFyZ2V0OiAnaHR0cDovL2xvY2FsaG9zdDo4MDgyJyxcbiAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLFxuICAgICAgICBzZWN1cmU6IGZhbHNlXG4gICAgICB9XG4gICAgfVxuICB9LFxuICBidWlsZDoge1xuICAgIHNvdXJjZW1hcDogdHJ1ZSxcbiAgICB0YXJnZXQ6ICdlczIwMTUnLFxuICAgIG1pbmlmeTogZmFsc2VcbiAgfVxufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQWtYLFNBQVMsb0JBQW9CO0FBQy9ZLE9BQU8sU0FBUztBQUNoQixPQUFPLFVBQVU7QUFDakIsU0FBUyxxQkFBcUI7QUFIME0sSUFBTSwyQ0FBMkM7QUFLelIsSUFBTSxZQUFZLEtBQUssUUFBUSxjQUFjLHdDQUFlLENBQUM7QUFHN0QsUUFBUSxJQUFJLDZDQUFlO0FBQzNCLFFBQVEsSUFBSSw2QkFBUyxRQUFRLElBQUksUUFBUTtBQUN6QyxRQUFRLElBQUksb0JBQVUsUUFBUSxJQUFJLHFCQUFxQiwyQkFBMkI7QUFFbEYsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUyxDQUFDLElBQUksQ0FBQztBQUFBLEVBQ2YsS0FBSztBQUFBLElBQ0gsU0FBUztBQUFBO0FBQUEsRUFDWDtBQUFBLEVBQ0EsUUFBUTtBQUFBLElBQ04sd0JBQXdCLEtBQUssVUFBVSxRQUFRLElBQUksWUFBWSxhQUFhO0FBQUE7QUFBQSxJQUU1RSxxQkFBcUI7QUFBQSxJQUNyQix1QkFBdUI7QUFBQSxFQUN6QjtBQUFBO0FBQUEsRUFFQSxjQUFjO0FBQUEsSUFDWixTQUFTLENBQUMsT0FBTyxjQUFjLE9BQU87QUFBQSxFQUN4QztBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsS0FBSyxLQUFLLFFBQVEsV0FBVyxPQUFPO0FBQUEsSUFDdEM7QUFBQSxFQUNGO0FBQUEsRUFDQSxRQUFRO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixZQUFZO0FBQUEsSUFDWixNQUFNO0FBQUEsSUFDTixPQUFPO0FBQUEsTUFDTCxRQUFRO0FBQUEsUUFDTixRQUFRO0FBQUEsUUFDUixjQUFjO0FBQUEsUUFDZCxRQUFRO0FBQUEsTUFDVjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFDQSxPQUFPO0FBQUEsSUFDTCxXQUFXO0FBQUEsSUFDWCxRQUFRO0FBQUEsSUFDUixRQUFRO0FBQUEsRUFDVjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
