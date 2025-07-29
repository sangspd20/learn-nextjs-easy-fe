import { authApi } from '@/api-clients'
import * as React from 'react'

export default function LoginPage() {
  async function handleLogin() {
    try {
      await authApi.login({ username: 'easy', password: '123qwe' })
    } catch (error) {
      console.log('fail to login', error)
    }
  }
  async function handleLogout() {
    try {
      await authApi.logout()
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
  return (
    <div>
      <h1>LoginPage</h1>
      <button onClick={handleLogin}>login</button>
      <button onClick={handleGetProfile}>get profile</button>
      <button onClick={handleLogout}>logout</button>
    </div>
  )
}
