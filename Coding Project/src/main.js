import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import Header from './Header.vue'

const app = createApp(App)
const header = createApp(Header)

app.use(createPinia())
header.use(createPinia())
// app.use(router)

app.mount('#app')
header.mount('#header')
