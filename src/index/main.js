import { createApp } from "vue";
import HomeItem from './HomeItem.vue'

let app = createApp(HomeItem);

import '@arco-design/web-vue/dist/arco.css';
import 'tdesign-vue-next/es/style/index.css';
app.mount(`#home`)