import api from '@/api/api'
import { supabase } from '@/supabase'

const state = {
  carts: [],
  isLoading: true
}

const getters = {
  totalPrice() {
    const subTotal = state.carts.map((cart) => {
      return Number(cart.total_price)
    })

    return subTotal.reduce((acc, current) => {
      return acc + current
    }, 0)
  },
  totalCarts() {
    return state.carts.length
  }
}

const actions = {
  create({ commit, rootState }, payload) {
    const { quantity, totalPrice, productId } = payload
    console.log('roo state', rootState)
    return new Promise(async (resolve, reject) => {
      try {
        const { data, error } = await supabase.from('carts').insert({
          quantity,
          total_price: totalPrice,
          product_id: productId,
          profile_id: rootState.users.isLogin.user.id,
          updated_at: new Date(Date.now()).toISOString()
        })
        if (error) console.error('error cart store', error)
        console.log('data', data)
        commit('setCarts', data)
        resolve(data)
      } catch (err) {
        reject(err)
      }
    })
  },
  async findAll({ commit, rootState }) {
    const { data: carts, error } = await supabase
      .from('carts')
      .select(`*, product: products(*), profile: profiles(*)`)
      .eq('profile_id', rootState.users.isLogin.user.id)
    if (error) console.error('error find all carts', error)
    commit('findAll', carts)
  },
  updateQty(_, payload) {
    const { id, qty, totalPrice } = payload
    return new Promise(async (resolve, reject) => {
      try {
        const {} = await supabase
          .from('carts')
          .update({
            quantity: qty,
            total_price: totalPrice,
            updated_at: new Date(Date.now()).toISOString()
          })
          .eq('id', id)
        resolve()
      } catch (err) {
        reject(err)
      }
    })
  },
  destroy({ commit }, cartId) {
    return new Promise(async (resolve, reject) => {
      try {
        await api({
          method: 'delete',
          url: `/carts/${cartId}/delete`,
          headers: {
            access_token: localStorage.getItem('token')
          }
        })
        resolve()
      } catch (err) {
        reject(err)
      }
    })
  }
}

const mutations = {
  setCarts(state, payload) {
    state.carts.push(payload)
    state.isLoading = false
  },
  findAll(state, payload) {
    state.carts = payload
    state.isLoading = false
  },
  updateQty(state, payload) {
    const selectedCart = state.carts.find((cart) => cart.id == payload.id)
    selectedCart.quantity = payload.qty
    selectedCart.totalPrice = payload.totalPrice
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
