import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import '@/assets/bootstrap/css/bootstrap.min.css';
import '@/assets/bootstrap/js/bootstrap.bundle.min.js';

createApp(App).use(router).mount('#app');
