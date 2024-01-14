import Files from './Files.vue'
import { createApp } from 'vue'
import '@arco-design/web-vue/dist/arco.css';

let FilesApp = createApp(Files)
FilesApp.mount(`#files`)