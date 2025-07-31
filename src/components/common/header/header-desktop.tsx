import { ROUTE_LIST } from '@/components/common/header/routes'
import { Box, Container, Stack, Link as MuiLink } from '@mui/material'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import * as React from 'react'
import NextLink from 'next/link'

export interface HeaderDesktopProps {}

export default function HeaderDesktop(props: HeaderDesktopProps) {
  const router = useRouter()
  return (
    <Box sx={{ display: { xs: 'none', md: 'block' } }} py={2}>
      <Container>
        <Stack direction="row" justifyContent="flex-end">
          {ROUTE_LIST.map((route) => (
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
        </Stack>
      </Container>
    </Box>
  )
}
