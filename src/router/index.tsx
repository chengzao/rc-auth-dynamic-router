import { createBrowserRouter, redirect } from 'react-router-dom'

import NotFound from '@/components/NotFound'
import MainLayout from '@/layout/MainLayout'
import LoginLayout from '@/layout/LoginLayout'
import Login from '@/pages/login/index';
import { lazy } from 'react';

export const router: ReturnType<typeof createBrowserRouter> = createBrowserRouter([
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
]);

const modules = import.meta.glob('../pages/*/index.tsx');
const components = Object.keys(modules).reduce<Record<string, any>>((prev, cur) => {
  prev[cur.replace('./pages', '')] = modules[cur];
  return prev;
}, {}) as any;

export const addRoutes = (router: any, menus: any[]) => {
  // 获取菜单后动态添加路由
  router.routes[1].children = menus.map((menu: any) => ({
    path: menu.route,
    Component: lazy(components[menu.filePath])
  }));
}