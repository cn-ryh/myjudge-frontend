import makeLog from './login.vue'
import { createApp } from 'vue'
let app = createApp(makeLog);
import '@arco-design/web-vue/dist/arco.css';
import 'tdesign-vue-next/es/style/index.css';
app.mount(`#login`);
