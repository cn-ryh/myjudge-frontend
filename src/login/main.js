import makeLog from './login.vue'
import { createApp } from 'vue'
let app = createApp(makeLog);
import '@arco-design/web-vue/dist/arco.css';
app.mount(`#login`);
