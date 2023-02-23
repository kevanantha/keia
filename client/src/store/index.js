import Vue from 'vue'
import Vuex from 'vuex'

import products from './modules/products'
import users from './modules/users'
import cart from './modules/cart'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    products,
    users,
    cart
  },
  strict: true
})
