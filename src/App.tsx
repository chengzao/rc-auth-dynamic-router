import { createBrowserRouter, redirect, RouterProvider } from 'react-router-dom'
import NotFound from './NotFound'
import Layout from './Layout'
import BaseLayout from './BaseLayout'
import { lazy, useEffect, useState } from 'react'
import { getUserInfo } from './service';
import { AppProvider } from './app-context';

import Login from './pages/login/index';

const modules = import.meta.glob('./pages/*/index.tsx');
const components = Object.keys(modules).reduce<Record<string, any>>((prev, cur) => {
  prev[cur.replace('./pages', '')] = modules[cur];
  return prev;
}, {}) as any;


export const router = createBrowserRouter([
  {
    path: '/',
    Component: BaseLayout,
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
    Component: Layout,
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


function App() {
  const [menus, setMenus] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = () => {

    const token = localStorage.getItem('token');
    if(!token) {
      setLoading(false);
      return;
    }

    getUserInfo().then((res: any) => {
      const menus = res.data || []
  
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
  }, []);

  if (loading) {
    return (
      <div>loading...</div>
    )
  }

  return (
    <AppProvider value={{ menus }}>
      <RouterProvider router={router} />
    </AppProvider>
  )
}

export default App
