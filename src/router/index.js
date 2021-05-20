import { createWebHashHistory, createRouter } from 'vue-router'

import { NPstart, NPdone } from '@/hooks/nprogress/index.js'

const components = [
  {
    path: '/editor',
    name: 'editor',
    component: _ => import('@/views/Editor/index.vue')
  },
  {
    path: '/map/:test*',
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
    {
      path: '/wallpaper',
      name: 'wallpaper',
      component: () => import('@/views/Wallpaper/index.vue')
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

Router.beforeEach(() => {
  NPstart()
})

Router.afterEach(() => {
  setTimeout(() => {
    NPdone()
  },500)
})

//如果在 nprogress 页面进行 Router.beforeEach 那么刷新不会执行,第一次也不会执行

export default Router