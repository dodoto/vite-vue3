import { createWebHashHistory, createRouter } from 'vue-router'

const components = [
  {
    path: '/editor',
    name: 'editor',
    component: _ => import('@/views/Editor/index.vue')
  },
  {
    path: '/map',
    name: 'map',
    component: _ => import('@/views/Map/index.vue')
  },
  {
    path: '/pdf',
    name: 'pdf',
    component: _ => import('@/views/Pdf/index.vue')
  },
  {
    path: 'code-block',
    name: 'codeblock',
    component: _ => import('@/views/CodeBlock/index.vue')
  }
]

const Router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: _ => import('@/layout/index.vue'),
      redirect: '/editor',
      children: components
    },
    // {
    //   path: '/',
    //   name: 'home',
    //   component: () => import('@/views/Home/index.vue'),
    //   redirect: '/filter',
    //   children: [
    //     {
    //       path: '/filter',
    //       name: 'filter',
    //       component: () => import('@/views/Home/component/Filter.vue')
    //     },
    //     {
    //       path: '/:w+',
    //       component: () => import('../components/NotFound.vue')
    //     }
    //   ]
    // },
    // {
    //   path: '/wallpaper', 
    //   name: 'wallpaper',
    //   component: () => import('@/views/Wallpaper/index.vue')
    // },
    // {
    //   path: '/polygon',
    //   name: 'polygon',
    //   component: _ => import('@/views/Polygon/index.vue')
    // },
    // {
    //   path: '/live',
    //   name: 'live',
    //   component: _ => import('@/views/Live/index.vue')
    // },
    {
      path: '/:w+',
      component: () => import('../components/NotFound.vue')
    }
  ]
})

export default Router