import { createWebHashHistory, createRouter } from 'vue-router'


const Router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/', 
      name: 'home',
      component: () => import('@/views/Wallpaper/index.vue')
    },
    {
      path: '/:w+',
      component: () => import('../components/NotFound.vue')
    }
  ]
})

export default Router