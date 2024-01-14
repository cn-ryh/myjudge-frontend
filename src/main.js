import { createApp } from 'vue'
import App from './App.vue'

import ArcoVue from '@arco-design/web-vue';
import TDesign from 'tdesign-vue-next';
import '@arco-design/web-vue/dist/arco.css';
import 'tdesign-vue-next/es/style/index.css';

createApp(App).use(ArcoVue).use(TDesign).mount('#app')
