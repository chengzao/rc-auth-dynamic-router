import { defineMock } from 'vite-plugin-mock-dev-server'


export default defineMock({
  url: '/api/user',
  method: ['GET'],
  body(request) {
    // const { name } = request.body
    const token = request.headers['authorization']

    if(!token) {
      return {
        code: 401,
        data: []
      }
    }

    if(token === 'admin') {
      return {
        data: [
          {
            name: 'page1',
            route: '/dashboard/page1',
            filePath: '/page1/index.tsx',
          },
          {
            name: 'page2',
            route: '/dashboard/page2',
            filePath: '/page2/index.tsx',
          },
          {
            name: 'page3',
            route: '/dashboard/page3',
            filePath: '/page3/index.tsx',
          },
        ]
      }
    }

    return {
      data: [
        {
          name: 'page1',
          route: '/dashboard/page1',
          filePath: '/page1/index.tsx',
        },
      ]
    }
  },
})