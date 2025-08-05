import { authApi } from '@/api-clients'
import { LoginForm } from '@/components/auth'
import { useAuth } from '@/hooks'
import { LoginPayload } from '@/models'
import { Box, Paper, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import * as React from 'react'

export default function LoginPage() {
  const router = useRouter()
  const { profile, login, logout } = useAuth({
    revalidateOnMount: false,
  })
  async function handleLogin() {
    try {
      await login({
        username: 'test1',
        password: '123123',
      })
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

  async function handleLoginSubmit(payload: LoginPayload) {
    try {
      await login(payload)
      // console.log('redirect to dashboard')
      router.push('/')
    } catch (error) {
      console.log('failed to login', error)
    }
  }

  return (
    <Box>
      <Paper
        elevation={4}
        sx={{
          mx: 'auto',
          my: 8,
          p: 4,
          maxWidth: '480px',
          textAlign: 'center',
        }}
      >
        <Typography component="h1" variant="h5" mb={3}>
          Easy Frontend - Login
        </Typography>

        <LoginForm onSubmit={handleLoginSubmit} />
      </Paper>
    </Box>
  )
}
