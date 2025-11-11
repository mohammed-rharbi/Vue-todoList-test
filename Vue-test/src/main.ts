import { createApp } from 'vue'
import { createPinia } from 'pinia'
// @ts-ignore: TS cannot find declaration file for .vue SFCs
import App from './App.vue'
// @ts-ignore: TS cannot find declaration file for module './router'
import router from './router'
import './style.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.mount('#app')
