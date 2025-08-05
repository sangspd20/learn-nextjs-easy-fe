import { ROUTE_LIST } from '@/components/common/header/routes'
import { Box, Container, Stack, Link as MuiLink, Link } from '@mui/material'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import * as React from 'react'
import NextLink from 'next/link'
import { useAuth } from '@/hooks'

export default function HeaderDesktop() {
  const router = useRouter()
  const { profile, logout } = useAuth()
  const isLoggedIn = Boolean(profile?.username)
  const routeList = ROUTE_LIST.filter((route) => !route.requireLogin || isLoggedIn)
  return (
    <Box sx={{ display: { xs: 'none', md: 'block' } }} py={2}>
      <Container>
        <Stack direction="row" justifyContent="flex-end">
          {routeList.map((route) => (
            <MuiLink
              key={route.path}
              component={NextLink}
              href={route.path}
              className={clsx({ active: router.pathname === route.path })}
              sx={{ ml: 2, fontWeight: 'medium' }}
            >
              {route.label}
            </MuiLink>
          ))}

          {!isLoggedIn && (
            <MuiLink component={NextLink} href="/login" sx={{ ml: 2, fontWeight: 'medium' }}>
              Login
            </MuiLink>
          )}

          {isLoggedIn && (
            <MuiLink sx={{ ml: 2, fontWeight: 'medium', cursor: 'pointer' }} onClick={logout}>
              Logout
            </MuiLink>
          )}
        </Stack>
      </Container>
    </Box>
  )
}
