import { Post } from '@/models'
import { getPostList } from '@/utils/posts'
import { Container } from '@mui/material'
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next'
import rehypeDocument from 'rehype-document'
import rehypeFormat from 'rehype-format'
import rehypeStringify from 'rehype-stringify'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeSlug from 'rehype-slug'
import remarkToc from 'remark-toc'

import { unified } from 'unified'
export interface BlogPageProps {
  post: Post
}

export default function PostDetailPage({ post }: BlogPageProps) {
  if (!post) return null

  return (
    <div>
      <Container>
        <h1>Post Detail Page</h1>

        <p>{post.title}</p>
        <p>{post.author?.name}</p>
        <p>{post.description}</p>
        <div dangerouslySetInnerHTML={{ __html: post.htmlContent || '' }}></div>
      </Container>
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const postList = await getPostList()

  return {
    paths: postList.map((post: Post) => ({ params: { slug: post.slug } })),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<BlogPageProps> = async (
  context: GetStaticPropsContext,
) => {
  const postList = await getPostList()
  const slug = context.params?.slug
  if (!slug) return { notFound: true }

  const post = postList.find((x) => x.slug === slug)
  if (!post) return { notFound: true }

  // parse md to html
  const file = await unified()
    .use(remarkParse)
    .use(remarkToc, { heading: 'agenda.*' })
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, { behavior: 'wrap' })
    .use(rehypeDocument, { title: 'Blog details page' })
    .use(rehypeFormat)
    .use(rehypeStringify)
    .process(post.mdContent || '')
  post.htmlContent = file.toString()

  return {
    props: {
      post,
    },
  }
}
