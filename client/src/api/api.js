import axios from 'axios'

const instance = axios.create({
  baseURL: process.env.VUE_APP_HOST,
  headers: {
    access_token: localStorage.getItem('token')
  }
})

export default instance
