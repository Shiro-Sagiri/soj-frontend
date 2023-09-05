import { createApp } from 'vue'
import ArcoVue from '@arco-design/web-vue'
import ArcoVueIcon from '@arco-design/web-vue/es/icon';
import '@arco-design/web-vue/dist/arco.css'
import '@/plugins/axios'
import App from './App.vue'
import router from './router'
import pinia from '@/stores'
import '@/access'

const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(ArcoVue)
app.use(ArcoVueIcon)

app.mount('#app')
