import { Box } from '@mui/material'
import * as React from 'react'

export interface HeaderMobileProps {}

export default function HeaderMobile(props: HeaderMobileProps) {
  return <Box sx={{ display: { xs: 'block', md: 'none' } }}>HeaderMobile</Box>
}
