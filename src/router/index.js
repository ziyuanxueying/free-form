import { createRouter, createWebHistory } from 'vue-router'
export const routes = [
  {
    path: '/configPage',
    name: 'configPage',
    component: () => import('../pages/configPage.vue')
  },
  {
    path: '/formList',
    name: 'formList',
    component: () => import('../pages/formList.vue')
  },
  {
    path: '/formShow',
    name: 'formShow',
    component: () => import('../obj2Form/index.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

 
export default router
