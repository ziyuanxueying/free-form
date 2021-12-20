import { createRouter, createWebHistory } from 'vue-router'
const Home = ()=> import('../pages/Home.vue')
const About = () => import(/* webpackChunkName: "about" */ '../pages/About.vue')
const example = () => import('../pages/example/index.vue')
export const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: About
  },
  {
    path: '/example',
    name: 'example',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: example
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

 
export default router
