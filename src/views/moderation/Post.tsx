'use client'

import type { ReactNode } from 'react'
import React, { useState } from 'react'

import Image from 'next/image'

import { useRouter } from 'next/navigation'

import type { ButtonProps } from '@mui/material'
import { Avatar, Button, Card, CardActions, CardContent, CardHeader, Divider, Typography } from '@mui/material'

import type { ThemeColor } from '@/@core/types'
import OpenDialogOnElementClick from '@/components/dialogs/OpenDialogOnElementClick'
import ActionModal from '@/components/dialogs/action-modal'

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

const UserPost = () => {
  const router = useRouter()

  const [status, setStatus] = useState<'active' | 'blocked'>('blocked')
  const [userStatus, setUserStatus] = useState<'active' | 'blocked'>('blocked')

  const handleChangeUserStatus = () => {
    setUserStatus(userStatus === 'active' ? 'blocked' : 'active')
  }

  const handleChangeStatus = () => {
    setStatus(status === 'active' ? 'blocked' : 'active')
  }

  return (
    <div className='flex flex-col gap-6'>
      <div>
        <Button onClick={() => router.back()} startIcon={<i className='tabler-arrow-left' />} color='primary'>
          Back
        </Button>
      </div>
      <Card>
        <CardHeader title={<Typography variant='h5'>My work process</Typography>} />
        <CardContent>
          <div className='border rounded-md'>
            <div className='px-2 pt-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
              {images.map((image, index) => (
                <div key={index} className='relative w-full h-40 min-[420px]:h-52 sm:h-56 md:h-64'>
                  <Image
                    src={image}
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
                  <Typography variant='body1'>
                    It was such a great time to be able to visit my ftiends in Denver. I flew into the airport on
                    Tuesday and we immediately headed off to the Winter Park resort. The snow was amazing and we were
                    able to have a great dinner before we hit the slopes early on Friday - boy it was great to get
                    skiing again. It was so great to hang out with Emily again - on and off the slopers - she’s moving
                    and shaking. A hilarious part of the trip was us troubleshooting an extremely hot hotel room. Thank
                    heavens we finally got to opening thee windows. I never thought I would sleep with cool fresh air of
                    9 degrees. Yes, there was a beanie involved! We headed back to Denver and hung out with Jamie and
                    the pups - oh so much fun was had! Such an amazing time, I can’t wait to go back.
                  </Typography>
                </div>
                <Divider />
                <div className='flex flex-col gap-4'>
                  <Typography variant='h5'>Tags</Typography>
                  <Typography variant='body1'>#summer #bali #seafood #vacation #mymay</Typography>
                </div>
                <Divider />
                <div className='flex flex-col gap-4'>
                  <Typography variant='h5'>Author</Typography>
                  <div className='flex items-center gap-4'>
                    <Avatar src={`/images/avatars/1.png`} alt='avatar' />
                    <div className='flex flex-col'>
                      <Typography color='text.primary' className='font-medium'>
                        Joseph Oliver
                      </Typography>
                      <Typography variant='body2'>joseph.87@gmail.com</Typography>
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
              status === 'blocked'
                ? buttonProps('Unblock Post', 'error', 'outlined')
                : buttonProps('Block Post', 'error', 'outlined')
            }
            dialog={ActionModal}
            dialogProps={{
              title: status === 'blocked' ? 'Confirm post unblocking' : 'Confirm post blocking',
              text:
                status === 'blocked'
                  ? 'Are you sure you want to unblock this post?'
                  : 'Are you sure you want to block this post?',
              onSubmit: handleChangeStatus,
              actionText: status === 'blocked' ? 'Unblock' : 'Block'
            }}
          />
          <OpenDialogOnElementClick
            element={Button}
            elementProps={
              userStatus === 'blocked'
                ? buttonProps('Unblock User', 'error', 'contained')
                : buttonProps('Block User', 'error', 'contained')
            }
            dialog={ActionModal}
            dialogProps={{
              title: userStatus === 'blocked' ? 'Confirm user unblocking' : 'Confirm user blocking',
              text:
                status === 'blocked'
                  ? 'Are you sure you want to unblock user?'
                  : 'Are you sure you want to block user?',
              onSubmit: handleChangeUserStatus,
              actionText: userStatus === 'blocked' ? 'Unblock' : 'Block'
            }}
          />
        </CardActions>
      </Card>
    </div>
  )
}

export default UserPost
