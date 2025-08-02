import { GetStaticProps, GetStaticPropsContext } from 'next'
import * as React from 'react'
import Link from 'next/link'
import { getPostList } from '@/utils'
import { Post } from '@/models'

export interface BlogListPageProps {
  posts: Post[]
}

export default function BlogListPage({ posts }: BlogListPageProps) {
  console.log('posts', posts)

  return (
    <div>
      <h1>Blog List Page</h1>

      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={`/posts/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

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
