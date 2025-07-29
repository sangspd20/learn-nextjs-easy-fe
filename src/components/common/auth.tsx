import { useAuth } from '@/hooks'
import { useRouter } from 'next/router'
import * as React from 'react'
import { ReactNode, useEffect } from 'react'

export interface AuthProps {
  children: ReactNode
}

export function Auth({ children }: AuthProps) {
  const { profile, firstLoading } = useAuth()

  const router = useRouter()

  useEffect(() => {
    if (!firstLoading && !profile?.username) router.push('/login')
  }, [profile, router, firstLoading])

  if (!profile?.username) return <p>Loading</p>
  return <div>{children}</div>
}
