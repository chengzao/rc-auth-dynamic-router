import { defineMock } from 'vite-plugin-mock-dev-server'


export default defineMock({
  url: '/api/list',
  method: ['GET'],
  body() {
    return {
      data: 'this is a list data'
    }
  },
})