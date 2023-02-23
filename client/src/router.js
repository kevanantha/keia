import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Admin from './views/Admin.vue'
import AdminAddProduct from './components/AdminAddProduct.vue'
import DetailProduct from './views/DetailProduct.vue'
import Cart from './views/Cart.vue'
import NotFoundPage from './views/NotFoundPage.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/cart',
      name: 'cart',
      component: Cart,
      beforeEnter: (to, from, next) => {
        if (!localStorage.getItem('token')) next('/404')
        else next()
      }
    },
    {
      path: '/products/:productId',
      name: 'product detail',
      component: DetailProduct
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin,
      children: [
        {
          path: 'add-product',
          name: 'add product',
          component: AdminAddProduct
        }
      ]
      // beforeEnter: (to, from, next) => {
      //   if (!localStorage.getItem('token')) next('/404')
      //   else next()
      // }
    },
    {
      path: '*',
      name: '404',
      component: NotFoundPage
    }
  ]
})
