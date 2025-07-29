import { Auth } from '@/components/common'
import { useAuth } from '@/hooks'
import { LayoutProps } from '@/models'
import Link from 'next/link'
import { useRouter } from 'next/router'
import * as React from 'react'

export function AdminLayout({ children }: LayoutProps) {
  const { logout, profile } = useAuth()
  const router = useRouter()
  async function handleLogout() {
    try {
      logout()
      router.push('/login')
    } catch (error) {
      console.log('fail to logout', error)
    }
  }
  return (
    <Auth>
      <h1>AdminLayout</h1>
      <div>sidebar</div>
      <p>Profile {JSON.stringify(profile)}</p>
      <button onClick={handleLogout}>Logout</button>
      <Link href="/">Home</Link>

      <Link href="/about">About</Link>

      <div>{children}</div>
    </Auth>
  )
}
