import { GetStaticProps, GetStaticPropsContext } from 'next'
import * as React from 'react'
import { getPostList } from '@/utils'
import { Box, Container, Divider } from '@mui/material'
import Link from 'next/link'
import { PostItem } from '@/components/blog'
import { Post } from '@/models'
import { MainLayout } from '@/components/layout'

export interface BlogListPageProps {
  posts: Array<Post>
}

export default function BlogListPage({ posts }: BlogListPageProps) {
  console.log('posts', posts)

  return (
    <Box>
      <Container>
        <h1>Blog</h1>

        <Box component="ul" sx={{ listStyleType: 'none', p: 0 }}>
          {posts.map((post) => (
            <li key={post.id}>
              <Link href={`/blog/${post.slug}`}>
                <PostItem post={post} />
              </Link>

              <Divider sx={{ my: 3 }} />
            </li>
          ))}
        </Box>
      </Container>
    </Box>
  )
}
BlogListPage.Layout = MainLayout

export const getStaticProps: GetStaticProps<BlogListPageProps> = async () => {
  // server-side
  // build-time
  // console.log('static props')
  // const response = await fetch('https://js-post-api.herokuapp.com/api/posts?_page=1')
  // const data = await response.json()
  // console.log(data)

  // convert markdown files into list of javascript objects
  const postList = await getPostList()

  return {
    props: {
      posts: postList,
      //   posts: data.map((x: any) => ({ id: x.id, title: x.title })),
    },
  }
}
