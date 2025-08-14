import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

import '@/styles/main.scss'

// tdesign
import 'tdesign-vue-next/es/style/index.css'

import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
