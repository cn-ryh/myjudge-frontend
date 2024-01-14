import editor from './main.vue'
import { createApp } from 'vue'
import '@arco-design/web-vue/dist/arco.css';
import 'tdesign-vue-next/es/style/index.css';
let app = createApp(editor)

app.mount('#main')
