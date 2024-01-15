import App from './loader.vue'
import { createApp } from 'vue'
import { router } from './loader.js'
let app = createApp(App);
app.use(router);
import '@arco-design/web-vue/es/notification/style/css.js'
import '@arco-design/web-vue/es/button/style/css.js'
import '@arco-design/web-vue/es/upload/style/css.js'
import '@arco-design/web-vue/es/card/style/css.js'
import '@arco-design/web-vue/es/tabs/style/css.js'
import '@arco-design/web-vue/es/table/style/css.js'
import '@arco-design/web-vue/es/select/style/css.js'
import '@arco-design/web-vue/es/tag/style/css.js'
app.mount('#training')
