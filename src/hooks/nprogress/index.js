import NProgress from 'nprogress'
import './nprogress.css'
import { onMounted } from 'vue'
import Store from '@/store/index.js'

NProgress.configure({ easing: 'ease', speed: 500 })

export const NPstart = () => {
  Store.dispatch('_beginLoading')
  NProgress.start()
}

export const NPdone = () => {
  Store.dispatch('_endLoading')
  NProgress.done()
}

export const useNProgress = _ => {
  onMounted(() => NPdone())
}
