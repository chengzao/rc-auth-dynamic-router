import { useAppContext } from '@/app-context';
import { fetchLogin } from '@/service';
import React, { useState } from 'react'
// import { useNavigate } from 'react-router-dom';

const Login = () => {

  const [name, setName] = useState('')

  const { setState } = useAppContext()

  // const navigate = useNavigate()
  
  const handleSubmit = async () => {
    console.log(name);

    setState((pre: any) => ({ ...pre, user: { name } }))

    fetchLogin(name).then((data: any) => {
      console.log(data);
      localStorage.setItem('token', data.token)
      // navigate('/dashboard/page1', { replace: true })
      location.href = '/dashboard'
    }).catch((err) => {
      console.log('fetch error', err)
    })
  }

  return (
    <div>
      <h1>login</h1>
      <input type="text" value={name} onChange={e => setName(e.target.value)} />
      <button onClick={handleSubmit}>登录</button>
    </div>
  )
}

export default Login