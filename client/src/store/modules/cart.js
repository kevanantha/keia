import api from '@/api/api'

const state = {
  carts: [],
  isLoading: true
}

const getters = {
  totalPrice() {
    const subTotal = state.carts.map(cart => {
      return Number(cart.totalPrice)
    })
    const total = subTotal.reduce((acc, current) => {
      return acc + current
    }, 0)
    return total
  },
  totalCarts() {
    return state.carts.length
  }
}

const actions = {
  create({ commit }, payload) {
    const { quantity, totalPrice, productId } = payload
    return new Promise(async (resolve, reject) => {
      try {
        const { data: cart } = await api({
          method: 'post',
          url: '/carts/create',
          data: {
            productId,
            quantity,
            totalPrice
          },
          headers: {
            access_token: localStorage.getItem('token')
          }
        })
        commit('setCarts', cart)
        resolve(cart)
      } catch (err) {
        reject(err)
      }
    })
  },
  async findAll({ commit }) {
    const { data: carts } = await api({
      method: 'get',
      url: '/carts',
      headers: {
        access_token: localStorage.getItem('token')
      }
    })
    commit('findAll', carts)
  },
  updateQty(_, payload) {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await api({
          method: 'patch',
          url: `/carts/${payload.id}/updateQty`,
          data: {
            quantity: payload.qty,
            totalPrice: payload.totalPrice
          },
          headers: {
            access_token: localStorage.getItem('token')
          }
        })
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
    const selectedCart = state.carts.find(cart => cart._id == payload.id)
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
