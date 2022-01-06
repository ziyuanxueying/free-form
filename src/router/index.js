import { createRouter, createWebHistory } from 'vue-router'
const Home = ()=> import('../pages/Home.vue')
export const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/configurationPage',
    name: 'configurationPage',
    component: () => import('../pages/configurationPage.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

 
export default router
