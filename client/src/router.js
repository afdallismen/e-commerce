import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./views/Home.vue')
    },
    {
      path: '/shop',
      name: 'shop',
      component: () => import('./views/UserShop.vue')
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('./views/UserCart.vue')
    }
  ]
})
