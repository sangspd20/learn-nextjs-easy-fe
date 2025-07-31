import { LayoutProps } from '@/models'
import { Box, Stack } from '@mui/material'
import { Footer, Header } from '../common'

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
