import { LayoutProps } from '@/models'
import { Box, Stack } from '@mui/material'
import Link from 'next/link'
import * as React from 'react'
import { Footer, Header } from '../common'

export function MainLayout({ children }: LayoutProps) {
  return (
    <Stack minHeight="100vh">
      <Header />

      <Link href="/">Home</Link>

      <Link href="/blog">Blog</Link>

      <Link href="/works">Works</Link>

      <Box flexGrow={1} component="main">
        {children}
      </Box>

      <Footer />
    </Stack>
  )
}
