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
      path: '/polygon',
      name: 'polygon',
      component: _ => import('@/views/Polygon/index.vue')
    },
    {
      path: '/live',
      name: 'live',
      component: _ => import('@/views/Live/index.vue')
    },
    {
      path: '/:w+',
      component: () => import('../components/NotFound.vue')
    }
  ]
})

export default Router