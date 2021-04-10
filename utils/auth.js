import { useEffect } from 'react'
import Router from 'next/router'

export const login = ({ email }) => {
  Router.push('/profile')
}

export const logout = async () => {
  await fetch('/api/logout');

  window.localStorage.setItem('logout', Date.now());
  window.localStorage.removeItem('user');

  Router.push('/login');
}

export const withAuthSync = (Component) => {
  const Wrapper = (props) => {
    const syncLogout = (event) => {
      if (event.key === 'logout') {
        console.log('logged out from storage!')
        Router.push('/login')
      }
    }

    useEffect(() => {
      window.addEventListener('storage', syncLogout)

      return () => {
        window.removeEventListener('storage', syncLogout)
        window.localStorage.removeItem('logout')
      }
    }, [])

    return <Component {...props} />
  }

  return Wrapper
}

export const fetcher = (url) =>
fetch(url).then((res) => {
  if (res.status >= 300) {
    throw new Error('API Client error')
  }

  return res.json()
})

export const CLOUD_NAME = 'dag3oozxe';
export const UPLOAD_PRESET = 's6cssrjr';