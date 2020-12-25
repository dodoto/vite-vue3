import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router';

export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/', 
      name: 'home',
      component: () => import('../components/Home.vue')
    },
    {
      path: '/list', 
      // redirect: { to: '/list' ,path: '/list'},
      component: () => import('../components/Back.vue'),
      children: [
        {
          path:'/list',
          name: 'list',
          component: () => import('../components/List.vue')
        },
        {
          path:'/info',
          name: 'info',
          component: () => import('../components/Info.vue')
        }
      ]
    },
    {
      path: '/upload',
      name: 'upload',
      component: () => import('../components/upload.vue')
    },
    {
      path: '/:w+',
      component: () => import('../components/NotFound.vue')
    }
  ]
});