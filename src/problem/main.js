import App from './loader.vue'
import { router } from './loader.js'
import { createApp } from 'vue'

let app = createApp(App)
app.use(router);
import '@arco-design/web-vue/dist/arco.css';
app.mount('#problemlist')
