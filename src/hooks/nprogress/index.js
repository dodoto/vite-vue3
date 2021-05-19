import NProgress, { done } from 'nprogress'
import './nprogress.css'
import Router from '@/router/index.js'
import { onMounted } from 'vue'

NProgress.configure({ easing: 'ease', speed: 500 })

//第一次不生效
Router.beforeEach(_ => {
  NProgress.start()
})

export const useNProgress = _ => {
  onMounted(_ => {
    NProgress.done()
  })
}

export const NPdone = _ => NProgress.done()