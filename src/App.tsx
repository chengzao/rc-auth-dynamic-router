import { lazy, useEffect, useState } from 'react'
import { RouterProvider, createBrowserRouter, redirect } from 'react-router-dom'
import { getUserInfo } from '@/services/user';
import { useAppContext } from '@/app-context';

import NotFound from '@/components/NotFound'
import MainLayout from '@/layout/MainLayout'
import LoginLayout from '@/layout/LoginLayout'
import Login from '@/pages/login/index';


const modules = import.meta.glob('./pages/*/index.tsx');
const components = Object.keys(modules).reduce<Record<string, any>>((prev, cur) => {
  prev[cur.replace('./pages', '')] = modules[cur];
  return prev;
}, {}) as any;

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

export function App() {
  const [loading, setLoading] = useState(true);
  const { setMenus } = useAppContext();
  const token = localStorage.getItem('token');
  console.log('token', token)

  const fetchData = () => {
    getUserInfo().then((res: any) => {
      const menus = res.data.data || []
  
      setMenus(menus);
      setLoading(false);

      // 获取菜单后动态添加路由
      router.routes[1].children = menus.map((menu: any) => ({
        path: menu.route,
        Component: lazy(components[menu.filePath])
      }));
    }).catch((err) => {
      console.log('fetch error', err)
      setLoading(false);
    })
  }

  useEffect(() => {
    fetchData();
  }, [token]);

  if (loading) {
    return (
      <div>loading...</div>
    )
  }

  return (
    <RouterProvider router={router} />
  )
}

export default App