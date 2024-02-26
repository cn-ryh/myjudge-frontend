import { createApp } from 'vue'
import App from './loader.vue'
import { router } from './loader.js'
let app = createApp(App)
import '@arco-design/web-vue/es/notification/style/css.js'
import '@arco-design/web-vue/es/button/style/css.js'
import '@arco-design/web-vue/es/upload/style/css.js'
import '@arco-design/web-vue/es/card/style/css.js'
import '@arco-design/web-vue/es/tabs/style/css.js'
import '@arco-design/web-vue/es/table/style/css.js'
import '@arco-design/web-vue/es/select/style/css.js'
import '@arco-design/web-vue/es/tag/style/css.js'
import '@arco-design/web-vue/es/link/style/css.js'
import '@arco-design/web-vue/es/steps/style/css.js'

import 'tdesign-vue-next/es/style/css';
app.use(router)
app.mount(`#admin`)