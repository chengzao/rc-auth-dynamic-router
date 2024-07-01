import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Loading } from '@/components/Loading';

function Layout() {

  return (
    <div className='login-layout'>
      <Suspense fallback={<Loading />}>
        <Outlet />
      </Suspense>
    </div>
  )
}

export default Layout;