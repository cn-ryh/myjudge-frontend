import App from './loader.vue'
import { createApp } from 'vue'
import { router } from './loader.js'

let app = createApp(App);

import '@arco-design/web-vue/dist/arco.css';
import 'tdesign-vue-next/es/style/index.css';
app.use(router);
app.use(ArcoVue);
app.mount('#training')
