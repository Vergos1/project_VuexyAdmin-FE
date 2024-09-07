'use client'

import type { ReactNode } from 'react'
import React, { useEffect, useState } from 'react'

import Image from 'next/image'

import { useRouter } from 'next/navigation'

import type { ButtonProps } from '@mui/material'
import { Avatar, Button, Card, CardActions, CardContent, CardHeader, Divider, Typography } from '@mui/material'

import type { ThemeColor } from '@/@core/types'
import OpenDialogOnElementClick from '@/components/dialogs/OpenDialogOnElementClick'
import ActionModal from '@/components/dialogs/action-modal'
import { useChangePostStatusByIdMutation, useGetPostInfoByIdQuery } from '@/store/slices/moderation/moderationApi'
import { getFullName } from '@/utils/getFullName'
import { getAvatar } from '@/utils/getAvatar'
import {
  useChangeUserStatusByIdMutation,
  useLazyGetUserInfoByIdQuery
} from '@/store/slices/userManagement/userManagementApi'

const buttonProps = (
  children: string | ReactNode,
  color?: ThemeColor,
  variant?: ButtonProps['variant']
): ButtonProps => ({
  children,
  color,
  variant
})

const images = [
  '/images/illustrations/moderation/block.png',
  '/images/illustrations/moderation/block-4.png',
  '/images/illustrations/moderation/block-2.png',
  '/images/illustrations/moderation/block-3.png'
]

const UserPost = ({ postId }: { postId: string }) => {
  const { data: postData, refetch: refetchPostData } = useGetPostInfoByIdQuery(postId)
  const [changeUserStatusById] = useChangeUserStatusByIdMutation()
  const [changePostStatusById] = useChangePostStatusByIdMutation()
  const [getUserInfoById, { data: userInfoData }] = useLazyGetUserInfoByIdQuery()

  const router = useRouter()
  const [postInfo, setPostInfo] = useState<any>({})
  const [userInfo, setUserInfo] = useState<any>({})

  useEffect(() => {
    if (postData) {
      setPostInfo(postData)
      getUserInfoById(postData.userId)
    }
  }, [postData, getUserInfoById])

  useEffect(() => {
    if (userInfoData) {
      setUserInfo(userInfoData)
    }
  }, [userInfoData])

  useEffect(() => {
    if (postInfo.userId && !userInfoData) {
      getUserInfoById(postInfo.userId)
    }
  }, [postInfo.userId, userInfoData, getUserInfoById])

  console.log('user info', userInfo)
  console.log('data', postInfo)

  const handleChangePostStatus = async () => {
    try {
      const newStatus = postData?.status === 'blocked' ? 'reviewed' : 'blocked'

      await changePostStatusById({ postId: postData.id, status: newStatus }).unwrap()

      getUserInfoById(postData.userId) // Refresh user info after status change

      refetchPostData()
    } catch (error) {
      console.error('Failed to change post status:', error)
    }
  }

  const handleChangeUserStatus = async () => {
    try {
      await changeUserStatusById(postInfo.userId).unwrap()
      getUserInfoById(postInfo.userId) // Refresh user info after status change
    } catch (error) {
      console.error('Failed to block user:', error)
    }
  }

  return (
    <div className='flex flex-col gap-6'>
      <div>
        <Button onClick={() => router.back()} startIcon={<i className='tabler-arrow-left' />} color='primary'>
          Back
        </Button>
      </div>
      <Card>
        <CardHeader title={<Typography variant='h5'>{postInfo?.name || 'No title'}</Typography>} />
        <CardContent>
          <div className='border rounded-md'>
            <div className='px-2 pt-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
              {postInfo?.imagesUrls?.map((image: string, index: number) => (
                <div key={index} className='relative w-full h-40 min-[420px]:h-52 sm:h-56 md:h-64'>
                  <Image
                    src={`http://localhost:3000/${image}.jpg`}
                    alt={`block-${index + 1}`}
                    layout='fill'
                    objectFit='cover'
                    className='rounded-md'
                    quality={100}
                  />
                </div>
              ))}
            </div>
            <CardContent>
              <div className='flex flex-col gap-6'>
                <div className='flex flex-col gap-4'>
                  <Typography variant='h5'>Transcription</Typography>
                  <Typography variant='body1'>{postInfo?.transcription || 'No transcription'}</Typography>
                </div>
                <Divider />
                <div className='flex flex-col gap-4'>
                  <Typography variant='h5'>Tags</Typography>
                  <Typography variant='body1'>
                    {postInfo?.tags?.map((tag: { id: string; name: string }) => `${tag.name}`) || 'No tags'}
                  </Typography>
                </div>
                <Divider />
                <div className='flex flex-col gap-4'>
                  <Typography variant='h5'>Author</Typography>
                  <div className='flex items-center gap-4'>
                    {getAvatar({
                      avatar: '',
                      firstName: postInfo?.firstName || 'User',
                      lastName: postInfo?.lastName || '',
                      size: 40
                    })}
                    <div className='flex flex-col'>
                      <Typography color='text.primary' className='font-medium'>
                        {getFullName(postInfo?.firstName, postInfo?.lastName) || 'No name'}
                      </Typography>
                      <Typography variant='body2'>{postInfo?.email || 'No email'}</Typography>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </div>
        </CardContent>
        <CardActions className='flex justify-end'>
          <OpenDialogOnElementClick
            element={Button}
            elementProps={
              postData?.status === 'blocked'
                ? buttonProps('Unblock Post', 'error', 'outlined')
                : buttonProps('Block Post', 'error', 'outlined')
            }
            dialog={ActionModal}
            dialogProps={{
              title: postData?.status === 'blocked' ? 'Confirm post unblocking' : 'Confirm post blocking',
              text:
                postData?.status === 'blocked'
                  ? 'Are you sure you want to unblock this post?'
                  : 'Are you sure you want to block this post?',
              onSubmit: () => handleChangePostStatus(),
              actionText: postData?.status === 'blocked' ? 'Unblock' : 'Block'
            }}
          />
          <OpenDialogOnElementClick
            element={Button}
            elementProps={
              userInfo?.status === 'blocked'
                ? buttonProps('Unblock User', 'error', 'contained')
                : buttonProps('Block User', 'error', 'contained')
            }
            dialog={ActionModal}
            dialogProps={{
              title: userInfo?.status === 'blocked' ? 'Confirm user unblocking' : 'Confirm user blocking',
              text:
                userInfo?.status === 'blocked'
                  ? 'Are you sure you want to unblock user?'
                  : 'Are you sure you want to block user?',
              onSubmit: handleChangeUserStatus,
              actionText: userInfo?.status === 'blocked' ? 'Unblock' : 'Block'
            }}
          />
        </CardActions>
      </Card>
    </div>
  )
}

export default UserPost
