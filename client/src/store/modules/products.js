import api from '@/api/api'
import { supabase } from '@/supabase'

const state = {
  products: [],
  product: {},
  isLoading: true
}

const getters = {}

const actions = {
  async findAll ({ commit }) {
    const { data, error } = await supabase.from('products').select('*')
    commit('setProducts', data)
  },
  // async findAll({ commit }) {
  //   const { data: products } = await api({
  //     method: 'get',
  //     url: `/products`
  //   })
  //   commit('setProducts', products)
  // },
  create ({ commit }, payload) {
    return new Promise(async (resolve, reject) => {
      try {
        console.log('payload', payload)
        console.log('payload object from entries', Object.fromEntries(payload))
        const { data, error } = await supabase.from('products').insert(Object.fromEntries(payload))
        if (error) console.log('err', error)
        resolve(data)
      } catch (err) {
        reject(err)
      }
    })
  },
  // create({ commit }, payload) {
  //   return new Promise(async (resolve, reject) => {
  //     try {
  //       const { data: product } = await api({
  //         method: 'post',
  //         url: '/products/create',
  //         headers: {
  //           access_token: localStorage.getItem('token')
  //         },
  //         data: payload
  //       })
  //       resolve(product)
  //     } catch (err) {
  //       reject(err)
  //     }
  //   })
  // },
  update ({ commit }, payload) {
    let id

    for (let i of payload) {
      if (i[0] == 'id') id = i[1]
    }

    return new Promise(async (resolve, reject) => {
      try {
        await api({
          method: 'put',
          url: `/products/${id}/update`,
          headers: {
            access_token: localStorage.getItem('token')
          },
          data: payload
        })
        resolve()
      } catch (err) {
        reject(err)
      }
    })
  },
  destroy ({ commit }, id) {
    return new Promise(async (resolve, reject) => {
      try {
        const { data: res } = await api({
          method: 'delete',
          url: `/products/${id}/delete`,
          headers: {
            access_token: localStorage.getItem('token')
          }
        })
        resolve(res)
      } catch (err) {
        reject(err)
      }
    })
  },
  findOne ({ commit }, productId) {
    return new Promise(async (resolve, reject) => {
      try {
        const { data, error } = await supabase.from('products').select('*').eq('id', productId).single()
        if (error) console.error('error', error)
        commit('setDetailProduct', data)
        resolve(data)
      } catch (err) {
        reject(err)
      }
    })
  }
  // findOne ({ commit }, productId) {
  //   return new Promise(async (resolve, reject) => {
  //     try {
  //       const { data: product } = await api({
  //         method: 'get',
  //         url: `/products/${productId}`
  //       })
  //       commit('setDetailProduct', product)
  //       resolve(product)
  //     } catch (err) {
  //       reject(err)
  //     }
  //   })
  // }
}

const mutations = {
  setProducts (state, products) {
    state.products = products
    state.isLoading = false
  },
  setDetailProduct (state, product) {
    state.product = product
    state.isLoading = false
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
