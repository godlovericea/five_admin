import axios from 'axios'
import { Message } from 'element-ui'
// import store from '@/store'
// import { getToken } from '@/utils/auth'
import router from '../router/index'

// create an axios instance
const service = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // baseURL: 'https://120.55.161.93:6012/', // url = base url + request url
  baseURL: 'http://5gecomap.com:6012/', // url = base url + request url
  // baseURL: 'http://192.168.1.113:6012/', // url = base url + request url
  // baseURL: 'http://192.168.20.108:8181/smartsite_cms/', // url = base url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    if (sessionStorage.getItem('user')) {
      const token = JSON.parse(sessionStorage.getItem('user')).token
      config.headers['Authorization'] = token
    }
    return config
  },
  error => {
    // do something with request error
    // console.log(error) // for debug
    return Promise.reject(error)
  }
)

// // response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data
    // console.log(response)
    if(res.code === 202) {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })
      router.push({
        path: '/'
      })
      sessionStorage.clear()
      return false
    }
    if (res.code !== 200) {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    return Promise.reject(error)
  }
)

export default service
