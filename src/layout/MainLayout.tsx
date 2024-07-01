import { Suspense } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useAppContext } from '@/app-context';
import { Loading } from '@/components/Loading';

function Layout() {
  const { menus } = useAppContext();

  return (
    <div style={{ display: 'flex', gap: 20 }}>
      <ul>
        {menus.map((menu, index) => (
          <li key={index}><Link to={menu.path}>{menu.name}</Link></li>
        ))}
      </ul>
      <Suspense fallback={<Loading />}>
        <Outlet />
      </Suspense>
    </div>
  )
}

export default Layout;