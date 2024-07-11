import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import './assets/styles.css'; // Import global styles

const app = createApp(App);
app.use(router);
app.use(ElementPlus);
app.mount('#app');
