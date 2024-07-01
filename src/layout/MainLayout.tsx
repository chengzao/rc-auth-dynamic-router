import { Suspense, useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useAppContext } from '@/app-context';
import { Loading } from '@/components/Loading';
import { Modal } from 'antd';

import styles from '@/layout.module.less'

function Layout() {
  const { menus } = useAppContext();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const logout = () => {
    setIsModalOpen(true);
  }

  const handleOk = () => {
    setIsModalOpen(false);
    localStorage.removeItem('token');
    window.location.reload();
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

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
          <div className={styles.logout} onClick={logout}>logout</div>
        </div>
      </nav>
      <main className={styles.main}>
        <Suspense fallback={<Loading />}>
          <Outlet />
        </Suspense>
      </main>
      <Modal title="退出" 
        open={isModalOpen} 
        onOk={handleOk} 
        onCancel={handleClose}
      >
        <p>请确认是否要退出登录?</p>
      </Modal>
    </div>
  )
}

export default Layout;