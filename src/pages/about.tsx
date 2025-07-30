import { AdminLayout } from '@/components/layout'
import { Box, Typography } from '@mui/material'
import * as React from 'react'

export default function About() {
  return (
    <Box>
      <Typography component="h1" variant="h3" color="primary.main">
        About page
      </Typography>
    </Box>
  )
}

About.Layout = AdminLayout
