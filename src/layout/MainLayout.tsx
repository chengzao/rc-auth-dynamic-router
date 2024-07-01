import { Suspense } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useAppContext } from '@/app-context';
import { Loading } from '@/components/Loading';

import styles from '@/layout.module.less'

function Layout() {
  const { menus } = useAppContext();

  const logout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  }

  return (
    <div className={styles.layout}>
      <nav className={styles.nav}>
        <h1 className={styles.header}>KMS DashBoard</h1>
        <ul className={styles.container}>
          {menus.map((menu, index) => (
            <li key={index}><NavLink to={menu.path} className={({ isActive }) => isActive ? styles.active : ''}>{menu.name}</NavLink></li>
          ))}
        </ul>
        <div className={styles.footer}>
          <button onClick={logout}>logout</button>
        </div>
      </nav>
      <main className={styles.main}>
        <Suspense fallback={<Loading />}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  )
}

export default Layout;