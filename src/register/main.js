import makeLog from './register.vue'
import { createApp } from 'vue'
let app = createApp(makeLog);
import '@arco-design/web-vue/dist/arco.css';
app.mount(`#register`);
