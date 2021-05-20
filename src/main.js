import { createApp } from 'vue'
import App from './App.vue'
import Router from '@/router/index.js'
import './index.css'
import Ripple from '@/directives/v-ripple/index.js'
import GlobalLoading from '@/components/index.js'
import Store from '@/store/index.js'

createApp(App)
.use(Router)
.use(Store)
.use(Ripple)
.use(GlobalLoading)
.mount('#app')


