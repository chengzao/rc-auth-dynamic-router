import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Loading } from '@/components/Loading';

function Layout() {

  console.log('BaseLayout')

  return (
    <div style={{ display: 'flex', gap: 20 }}>
      <Suspense fallback={<Loading />}>
        <Outlet />
      </Suspense>
    </div>
  )
}

export default Layout;