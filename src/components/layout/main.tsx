import { LayoutProps } from '@/models'
import { Box, Stack } from '@mui/material'
import { Footer } from '../common'

import dynamic from 'next/dynamic'

const Header = dynamic(() => import('../common/header').then((mod) => mod.Header), { ssr: false })

export function MainLayout({ children }: LayoutProps) {
  return (
    <Stack minHeight="100vh">
      <Header />

      <Box flexGrow={1} component="main">
        {children}
      </Box>

      <Footer />
    </Stack>
  )
}
