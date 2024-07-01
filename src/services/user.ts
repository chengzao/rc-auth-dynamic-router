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

export const fetchLogin = (name: string) => {
  return httpServer.post('/api/login', {name})
}

export const fetchList = () => {
  return httpServer.get('/api/list')
}