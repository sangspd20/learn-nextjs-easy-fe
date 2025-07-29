import { authApi } from '@/api-clients'
import { useAuth } from '@/hooks'
import { useRouter } from 'next/router'
import * as React from 'react'

export default function LoginPage() {
  const router = useRouter()
  const { profile, login, logout } = useAuth({
    revalidateOnMount: false,
  })
  async function handleLogin() {
    try {
      await login()
      router.push('/about')
    } catch (error) {
      console.log('fail to login', error)
    }
  }
  async function handleLogout() {
    try {
      logout()
    } catch (error) {
      console.log('fail to logout', error)
    }
  }

  async function handleGetProfile() {
    try {
      await authApi.getProfile()
    } catch (error) {
      console.log('fail to profile', error)
    }
  }

  const handleGotoAbout = () => router.push('/about')
  return (
    <div>
      <h1>LoginPage</h1>

      <p>Profile: {JSON.stringify(profile || {})}</p>
      <button onClick={handleLogin}>login</button>
      <button onClick={handleGetProfile}>get profile</button>
      <button onClick={handleLogout}>logout</button>
      <button onClick={handleGotoAbout}>go to about page</button>
    </div>
  )
}
