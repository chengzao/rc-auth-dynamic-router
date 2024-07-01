import { useAppContext } from '@/app-context';
import { fetchLogin } from '@/services/user';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [name, setName] = useState('')
  const { setUser } = useAppContext()

  const navigate = useNavigate()
  
  const handleSubmit = async () => {
    fetchLogin(name).then((res: any) => {
      localStorage.setItem('token', res.data.token)
      // location.href = '/dashboard'
    })
    .then(() => {
      setUser((pre: any) => ({...pre, user:{name}}))
      navigate('/dashboard/page1', { replace: true })
    })
    .catch((err) => {
      console.log('fetch error', err)
    })
  }

  return (
    <div>
      <h1>login</h1>
      <input type="text" value={name} onChange={e => setName(e.target.value)} />
      <input type="password" />
      <button onClick={handleSubmit}>登录</button>
    </div>
  )
}

export default Login