import axios from 'axios'
import router from '../router'
import store from '../store'
import { Message } from 'element-ui'

// create an axios instance
const service = axios.create({
  baseURL: process.env.BASE_API, // api 的 base_url
  timeout: 15000 // request timeout
})

// response interceptor
service.interceptors.response.use(
  response => {
    if (response.data.success) {
      return response.data
    }
    if (response.data.code === 403) {
      store.dispatch('logOut')
      router.push('/login')
    }
    if (response.data.code === 404) {
      router.push('/error')
    }
    Message({
      message: response.data.msg,
      type: 'error',
      duration: 5 * 1000,
    })
    return Promise.reject(response.data.msg)
  },
  error => {
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000,
    })
    return Promise.reject(error)
  }
)

export default service
