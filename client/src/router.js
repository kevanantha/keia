import Vue from 'vue'
import Router from 'vue-router'
import store from './store'
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
      beforeEnter: async (to, from, next) => {
        await getUserState()
        if (!Object.keys(store.state.users.isLogin).length) {
          next('/404')
        } else {
          next()
        }
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
      ],
      beforeEnter: async (to, from, next) => {
        await getUserState()
        if (!Object.keys(store.state.users.isLogin).length) {
          next('/404')
        } else {
          next()
        }
      }
    },
    {
      path: '*',
      name: '404',
      component: NotFoundPage
    }
  ]
})

function getUserState() {
  return new Promise((resolve, reject) => {
    console.log('getuser state', store.state.users.isLogin)
    if (store.state.users.isLogin === undefined) {
      const unwatch = store.watch(
        () => store.state.users.isLogin,
        (value) => {
          console.log('val', value)
          unwatch()
          resolve(value)
        }
      )
    } else {
      resolve(store.state.users.isLogin)
    }
  })
}
