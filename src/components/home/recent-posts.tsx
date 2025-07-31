import { Box, Container, Link as MuiLink, Stack, Typography } from '@mui/material'
import NextLink from 'next/link'
import * as React from 'react'
import { PostCard } from './post-card'

export function RecentPosts() {
  return (
    <Box component="section" bgcolor="secondary.light" pt={2} pb={4}>
      <Container>
        <Stack
          direction="row"
          mb={2}
          justifyContent={{ xs: 'center', md: 'space-between' }}
          alignItems="center"
        >
          <Typography variant="h5">Recent Posts</Typography>

          <MuiLink
            href="/blog"
            component={NextLink}
            sx={{
              display: { xs: 'none', md: 'inline' },
            }}
          >
            View all
          </MuiLink>
        </Stack>

        <Stack
          direction={{
            xs: 'column',
            md: 'row',
          }}
          spacing={3}
          sx={{
            '& > div': {
              width: {
                xs: '100%',
                md: '50%',
              },
            },
          }}
        >
          <Box>
            <PostCard />
          </Box>

          <Box>
            <PostCard />
          </Box>
        </Stack>
      </Container>
    </Box>
  )
}
