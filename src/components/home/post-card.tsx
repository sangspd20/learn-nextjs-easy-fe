import { Card, CardContent, Typography, Divider, Stack } from '@mui/material'
import * as React from 'react'
import { Post } from '@/models/index'
import { format } from 'date-fns'
import { PostItem } from '../blog'
export interface PostCardProps {
  post: Post
}

export function PostCard({ post }: PostCardProps) {
  if (!post) return null
  return (
    <Card>
      <CardContent>
        <PostItem post={post} />
      </CardContent>
    </Card>
  )
}
