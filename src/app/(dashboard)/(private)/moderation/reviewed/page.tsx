'use client'

import React from 'react'

import { useSearchParams } from 'next/navigation'

import PostListTable from '@/views/moderation/PostListTable'
import ModerationTabs from '@/views/moderation/Tabs'
import UserPost from '@/views/moderation/Post'
import { useGetPostsQuery } from '@/store/slices/moderation/moderationApi'

export default function Page() {
  const searchParams = useSearchParams()
  const postId = searchParams.get('postId')

  const { data } = useGetPostsQuery({
    listType: 'reviewed'
  })

  console.log('data', data)

  if (postId) {
    return <UserPost postId={postId} />
  }

  return (
    <div className='flex flex-col gap-6'>
      <ModerationTabs />
      <PostListTable tableData={data?.data || []} tableType='new' />
    </div>
  )
}
