'use client'
import React from 'react'

import CustomAvatar from '@/@core/components/mui/Avatar'
import { getInitials } from './getInitials'

type AvatarParams = {
  avatar: string
  firstName: string
  lastName: string
  size?: number
}

export const getAvatar = (params: AvatarParams) => {
  const { avatar, firstName, lastName, size = 34 } = params

  if (avatar) {
    return <CustomAvatar src={avatar} size={size} />
  } else {
    return (
      <CustomAvatar size={size}>
        <p className='uppercase text-inherit'>{getInitials(`${firstName} ${lastName}`)}</p>
      </CustomAvatar>
    )
  }
}
