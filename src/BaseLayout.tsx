import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Loading } from './loading';

function Layout() {

  return (
    <div style={{ display: 'flex', gap: 20 }}>
      <Suspense fallback={<Loading />}>
        <Outlet />
      </Suspense>
    </div>
  )
}

export default Layout;