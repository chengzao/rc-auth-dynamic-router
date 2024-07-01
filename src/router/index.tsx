import { RouteObject, createBrowserRouter, redirect } from 'react-router-dom'

import MainLayout from '@/layout/MainLayout'
import LoginLayout from '@/layout/LoginLayout'

import NotFound from '@/components/NotFound'
import Login from '@/pages/login/index';

// import Page1 from '@/pages/page1';
// import Page2 from '@/pages/page2';
// import Page3 from '@/pages/page3';
import { lazy } from 'react';
// import { lazy } from 'react';

type CustomObject = {
  roleItemKey?: string
}

type CustomRouteObject = CustomObject & RouteObject

type CustomRouter = ReturnType<typeof createBrowserRouter>


const routes: CustomRouteObject[] = [
  {
    path: '/',
    Component: LoginLayout,
    children: [
      {
        path: '',
       loader: async () => {
        return redirect('/login')
       }
      },
      {
        path: '/login',
        Component: Login,
      }
    ],
  },
  {
    path: '/dashboard',
    Component: MainLayout,
    children: [
      {
        path: '',
        element: <h1>dashboard</h1>,
      }
    ],
  }, 
  {
    path: '*',
    Component: NotFound,
  }
]  


export const router: CustomRouter = createBrowserRouter(routes);


const authRouterMaps: CustomRouteObject[] = [
  {
    path: '/dashboard/page1',
    roleItemKey: 'dashboard:page1',
    Component: lazy(() => import('@/pages/page1'))
  },
  {
    path: '/dashboard/page2',
    roleItemKey: 'dashboard:page2',
    Component: lazy(() => import('@/pages/page2'))
  },
  {
    path: '/dashboard/page3',
    roleItemKey: 'dashboard:page3',
    Component: lazy(() => import('@/pages/page3'))
  },
]


const filterRoutes = (routes: CustomRouteObject[], menus: CustomObject[]) => {
  return routes.filter(route => {
    const menu = menus.find(menu => menu.roleItemKey === route.roleItemKey)
    return menu
  })
}

export const addRoutes = (router: any, menus: CustomObject[]) => {
  // 获取菜单后动态添加路由
  const children = filterRoutes(authRouterMaps , menus)
  // console.log('children', children)
  router.routes[1].children = children
}