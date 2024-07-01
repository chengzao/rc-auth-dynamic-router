import { router } from '@/App'
import axios from 'axios'

const axiosInstance = axios.create()

axiosInstance.interceptors.request.use((config) => {
  console.log('request', config)

  const token = localStorage.getItem('token')
  if(!token) {
    router.navigate('/login')
    return config
  }

  config.headers['Authorization'] = token
  return config
})

axiosInstance.interceptors.response.use((res) => {
  console.log('response', res)
  return res
}, (err) => {
  return Promise.reject(err)
})

export default axiosInstance