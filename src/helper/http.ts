import { gotoLogin } from '@/router'
import axios from 'axios'

const axiosInstance = axios.create()

axiosInstance.interceptors.request.use((config) => {
  // console.log('request', config)

  const token = localStorage.getItem('token')
  if(!token) {
    gotoLogin()
    return config
  }

  config.headers['Authorization'] = token
  return config
})

axiosInstance.interceptors.response.use((res) => {
  // console.log('response', res)
  return res
}, (err) => {

  // if 401 redirect
  if(err.response.status === 401) {
    gotoLogin()
  }

  return Promise.reject(err)
})

export default axiosInstance