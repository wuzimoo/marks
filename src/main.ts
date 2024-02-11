// main.ts
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';



// Импортируем Axios
import axios from 'axios';

// Используем Axios внутри Vue
const app = createApp(App);
app.config.globalProperties.$axios = axios;

app.use(router);
app.mount('#app');
