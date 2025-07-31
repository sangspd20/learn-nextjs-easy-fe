import { FeatureWorks, HeroSection, RecentPosts } from '@/components/home'
import { MainLayout } from '@/components/layout'
import { Box } from '@mui/material'

export default function Home() {
  return (
    <Box>
      <HeroSection />
      <RecentPosts />
      <FeatureWorks />
    </Box>
  )
}

Home.Layout = MainLayout
