import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './components/router/index.ts'
import { createPinia } from 'pinia'

let app = createApp(App)
let pinia = createPinia()
app.use(pinia)
app.use(router)
app.mount('#app')
