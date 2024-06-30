import { Suspense } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useAppContext } from './app-context';
import { Loading } from './loading';

function Layout() {
  const { menus, user } = useAppContext();

  console.log('menus', {menus, user})


  return (
    <div style={{ display: 'flex', gap: 20 }}>
      <ul>
        {menus.map(menu => (
          <li key={menu.route}><Link to={menu.route}>{menu.name}</Link></li>
        ))}
      </ul>
      <Suspense fallback={<Loading />}>
        <Outlet />
      </Suspense>
    </div>
  )
}

export default Layout;