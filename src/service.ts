import { redirect } from "react-router-dom";

export const getUserInfo = () => {
  const token = localStorage.getItem('token')
  console.log('token', token)
  if(!token) {
    redirect('/login')

    return Promise.reject('no token')
  }

  return fetch('/api/user', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      "Authorization": token
    }
  }).then(res => res.json())
}


export const fetchLogin = (name: string) => {

  if(!name) return Promise.reject('no name')

  return fetch('/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name })
  }).then(res => res.json())
}

export const fetchList = () => {
  return fetch('/api/list', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
}