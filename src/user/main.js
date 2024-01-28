import App from './loader.vue'
import { createApp } from 'vue'
import { router } from './loader.js'
import '@arco-design/web-vue/es/link/style/css.js'
import '@arco-design/web-vue/es/tag/style/css.js'
import '@arco-design/web-vue/es/card/style/css.js'

let app = createApp(App)

app.use(router);
app.mount('#training')
