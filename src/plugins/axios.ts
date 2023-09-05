// Add a request interceptor
import axios from 'axios'
import { useStore } from '@/stores'
import { Message } from '@arco-design/web-vue'
import router from '@/router'

axios.interceptors.request.use(
  function (config) {
    const { user } = useStore()
    config.headers.token = user.token
    // Do something before request is sent
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    if (response.data.code === 40100) {
      // 401 说明 token 验证失败
      Message.error('登录信息已过期，请重新登录')
      // 可以直接跳转到登录页面，重新登录获取 token
      router.push('/user/login')
      return
    }
    if (response.data.code !== 0) {
      Message.error(response.data.message)
    } else {
      return response
    }
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error)
  }
)
