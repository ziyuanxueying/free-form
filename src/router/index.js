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
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

 
export default router
