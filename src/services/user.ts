import httpServer from '@/helper/http'

export const getUserInfo = () => {
  const token = localStorage.getItem('token')
  return httpServer('/api/user', {
    method: 'GET',
    headers: {
      "Authorization": token
    }
  })
}

export const fetchLogin = (payload: any) => {
  return httpServer.post('/api/login', payload)
}

export const fetchList = () => {
  return httpServer.get('/api/list')
}