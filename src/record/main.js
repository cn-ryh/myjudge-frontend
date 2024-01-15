import App from './loader.vue'
import { createApp } from 'vue'
import { router } from './loader.js'

let app = createApp(App)
import '@arco-design/web-vue/es/card/style/css';
import '@arco-design/web-vue/es/list/style/css'
import '@arco-design/web-vue/es/button/style/css'
import '@arco-design/web-vue/es/link/style/css'
app.use(router);

app.mount('#record')
