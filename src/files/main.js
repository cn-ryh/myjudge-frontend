import Files from './Files.vue'
import { createApp } from 'vue'
import '@arco-design/web-vue/dist/arco.css';

import '@arco-design/web-vue/es/upload/style/css.js'
import '@arco-design/web-vue/es/button/style/css.js'

let FilesApp = createApp(Files)
FilesApp.mount(`#files`)