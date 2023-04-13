import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CreateView from '../views/CreateView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/browse',
      name: 'browse',
      component: () => import('../views/BrowseView.vue')
    },
    {
      path: '/create',
      name: 'create',
      component: CreateView
    }
    // {
    //   path: '/stardew',
    //   name: 'stardew',
    //   component: () => import('../views/StardewView.vue')
    // }
  ]
})

export default router
