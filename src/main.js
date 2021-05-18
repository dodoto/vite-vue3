import { createApp } from 'vue'
import App from './App.vue'
import Router from '@/router/index.js'
import './index.css'
import Ripple from '@/directives/v-ripple/index.js'

createApp(App)
.use(Ripple)
.use(Router)
.mount('#app')


