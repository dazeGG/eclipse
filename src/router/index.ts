import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Routes from '@/router/Routes'

const routes: Array<RouteRecordRaw> = [
  {
    path: Routes.currencies,
    name: 'currencies',
    component: () => import('@/pages/CurrenciesPage.vue')
  },
  {
    path: Routes.converter,
    name: 'converter',
    component: () => import('@/pages/ConverterPage.vue')
  },
  {
    path: Routes.other,
    redirect: 'currencies'
  }
]

const router = createRouter({
  history: createWebHistory(''),
  linkActiveClass: 'active',
  linkExactActiveClass: '',
  routes
})

export default router
