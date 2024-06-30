import { defineMock } from 'vite-plugin-mock-dev-server'


export default defineMock({
  url: '/api/login',
  method: ['POST'],
  body(request) {
    // console.log('request', request.body)
    const { name } = request.body

    if(name==='admin') {
      return {
        token: 'admin'
      }
    }

    return {
      token: 'user'
    }
  },
})