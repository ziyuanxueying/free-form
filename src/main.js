import { createApp } from 'vue'
import App from './App.vue'
import ArcoVue from '@arco-design/web-vue'
import '@arco-design/web-vue/dist/arco.css'
import router from './router'
import { createPinia } from 'pinia'
import iconImport from './tools/iconImport'


const app = createApp(App)
app.use(router)
app.use(ArcoVue)
app.use(iconImport)
app.use(createPinia())
app.mount('#app')
