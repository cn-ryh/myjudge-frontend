import App from './loader.vue'
import { createApp } from 'vue'
import { router } from './loader.js'

let app = createApp(App)

app.use(router);
import '@arco-design/web-vue/dist/arco.css';
app.mount('#training')
