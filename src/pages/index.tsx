import { HeroSection } from '@/components/home'
import { MainLayout } from '@/components/layout'
import { Box } from '@mui/material'

export default function Home() {
  return (
    <Box>
      <HeroSection />
    </Box>
  )
}

Home.Layout = MainLayout
