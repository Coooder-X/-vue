import { createApp } from 'vue'
import App from './App.vue'
// import router from './router'
import router from './router';
import ElementPlus from 'element-plus';
import 'element-plus/theme-chalk/index.css'

const app = createApp(App).use(ElementPlus).use(router).mount('#app')
