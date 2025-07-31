import { Seo } from '@/components/common'
import { FeatureWorks, HeroSection, RecentPosts } from '@/components/home'
import { MainLayout } from '@/components/layout'
import { Box } from '@mui/material'

export default function Home() {
  return (
    <Box>
      <Seo
        data={{
          title: 'NextJS Tutorials | Easy Frontend',
          description:
            'Step by step tutorials to build a full CRUD website using NextJS for beginners',
          url: 'https://learn-nextjs-fawn.vercel.app/',
          thumbnailUrl:
            'https://cdn.getshifter.co/caa65008efb706a8bfc6f7e4045d6a018420c3df/uploads/2020/11/nextjs.png',
        }}
      />

      <HeroSection />
      <RecentPosts />
      <FeatureWorks />
    </Box>
  )
}

Home.Layout = MainLayout
