import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/currencies',
    name: 'currencies',
    component: () => import('@/pages/CurrenciesPage.vue')
  },
  {
    path: '/converter',
    name: 'converter',
    component: () => import('@/pages/ConverterPage.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: 'currencies'
  }
]

const router = createRouter({
  history: createWebHistory(''),
  routes
})

export default router
