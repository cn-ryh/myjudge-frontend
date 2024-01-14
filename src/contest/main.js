import App from './loader.vue'
import { createApp } from 'vue'
import { router } from './loader.js'

let app = createApp(App);

import '@arco-design/web-vue/dist/arco.css';
app.use(router);
app.mount('#training')
