import { MainLayout } from '@/components/layout'
import { WorkList } from '@/components/work'
import { useWorkList } from '@/hooks'
import { ListParams } from '@/models'
import { Box, Button, Container, LinearProgress, Typography } from '@mui/material'
import { useState } from 'react'

export default function WorksPage() {
  const [filters, setFilters] = useState<Partial<ListParams>>({ _page: 1, _limit: 10 })

  const { data, isLoading } = useWorkList({ params: filters })
  console.log({ data, isLoading })

  function handleNextClick() {
    setFilters((prevFilters) => ({
      ...prevFilters,
      _page: (prevFilters?._page || 0) + 1,
    }))
  }

  function handlePrevClick() {
    setFilters((prevFilters) => ({
      ...prevFilters,
      _page: (prevFilters?._page || 0) - 1,
    }))
  }

  return (
    <Box>
      <Container>
        <Box mb={4} mt={8}>
          <Typography component="h1" variant="h3" fontWeight="bold">
            Work
          </Typography>
        </Box>

        {isLoading ? <LinearProgress /> : <WorkList workList={data?.data || []} />}

        <Box>
          <Button variant="contained" onClick={handlePrevClick}>
            Prev Page
          </Button>

          <Button variant="contained" onClick={handleNextClick}>
            Next Page
          </Button>
        </Box>
      </Container>
    </Box>
  )
}

WorksPage.Layout = MainLayout

export async function getStaticProps() {
  console.log('get static props')
  // const workList = await workA

  return {
    props: {},
  }
}
