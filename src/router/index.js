import { createRouter, createWebHistory } from 'vue-router'
const Home = ()=> import('../pages/Home.vue')
export const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
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
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

 
export default router
