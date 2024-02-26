import makeLog from './login.vue'
import { createApp } from 'vue'
let app = createApp(makeLog);
import '@arco-design/web-vue/es/notification/style/css.js';
app.mount(`#login`);
