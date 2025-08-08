import { MainLayout } from '@/components/layout'
import { WorkFilters, WorkList } from '@/components/work'
import { useWorkListInfinity } from '@/hooks'
import { ListParams, ListResponse, Work, WorkFiltersPayload } from '@/models'
import { Box, Button, Container, Skeleton, Typography } from '@mui/material'
import { useRouter } from 'next/router'

export default function InfinityScrollPage() {
  const router = useRouter()
  const filters: Partial<ListParams> = {
    ...router.query,
  }
  const initFiltersPayload: WorkFiltersPayload = {
    search: filters.title_like || '',
    selectedTagList: filters.tagList_like?.split('|') || [],
  }

  const { data, isLoading, isValidating, size, setSize } = useWorkListInfinity({
    params: filters,
    enabled: router.isReady,
  })
  console.log({ data, isLoading, isValidating, size })

  const workList: Array<Work> =
    data?.reduce((result: Array<Work>, currentPage: ListResponse<Work>) => {
      result.push(...currentPage.data)

      return result
    }, []) || []
  // const { _limit, _totalRows, _page } = data?.pagination || {}
  // const totalPages = Boolean(_totalRows) ? Math.ceil(_totalRows / _limit) : 0

  function handleFiltersChange(newFilters: WorkFiltersPayload) {
    router.push(
      {
        pathname: router.pathname,
        query: {
          ...filters,
          _page: 1,
          title_like: newFilters.search,
          tagList_like: newFilters.tagList_like,
        },
      },
      undefined,
      { shallow: true },
    )
  }

  return (
    <Box>
      <Container>
        <Box mb={4} mt={8}>
          <Typography component="h1" variant="h3" fontWeight="bold">
            Work
          </Typography>
        </Box>

        {router.isReady ? (
          <WorkFilters initialValues={initFiltersPayload} onSubmit={handleFiltersChange} />
        ) : (
          <Skeleton
            variant="rectangular"
            height={40}
            sx={{
              display: 'inline-block',
              width: '100%',
              mt: 2,
              mb: 1,
              verticalAlign: 'middle',
            }}
          />
        )}

        <WorkList workList={workList} loading={!router.isReady || isLoading} />

        <Button variant="contained" onClick={() => setSize((x) => x + 1)}>
          Load More
        </Button>
      </Container>
    </Box>
  )
}

InfinityScrollPage.Layout = MainLayout

export async function getStaticProps() {
  console.log('get static props')
  // const workList = await workA

  return {
    props: {},
  }
}
