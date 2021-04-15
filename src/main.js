import { createApp } from 'vue'
import App from './App.vue'
import Router from '@/router/index.js'
import './index.css'
import { ripple } from '@/directives/v-ripple/index.js'

createApp(App)
.directive(...ripple)
.use(Router)
.mount('#app')


