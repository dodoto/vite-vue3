import NProgress, { done } from 'nprogress'
import './nprogress.css'
import Router from '@/router/index.js'
import { onMounted } from 'vue'

NProgress.configure({ easing: 'ease', speed: 500 })

//路由跳转才生效,直接地址栏输入不会生效
Router.beforeEach(_ => {
  NProgress.start()
})

export const useNProgress = _ => {
  onMounted(_ => {
    NProgress.done()
  })
}

export const NPdone = _ => NProgress.done()