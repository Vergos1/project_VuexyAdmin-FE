import React from 'react'

import PostListTable from '@/views/moderation/PostListTable'
import ModerationTabs from '@/views/moderation/Tabs'

const mockData = [
  {
    id: '4be9a780-f8fa-4b4a-8b0d-10580bb48b26',
    firstName: 'iwis',
    lastName: 'iwis',
    email: 'ivashchyshyn.m@iwis.io',
    avatar: null,
    role: 'user',
    status: 'active'
  },
  {
    id: 'f4aa2071-052f-4fb7-b15c-1b813fe310c9',
    firstName: 'Alex',
    lastName: 'Kov',
    email: 'zyfkyxyhfz@privaterelay.appleid.com',
    avatar: null,
    role: 'user',
    status: 'active'
  },
  {
    id: '916beba4-cb17-4070-a862-49c997efc616',
    firstName: 'lali',
    lastName: 'lulu',
    email: 'ivashchyshyn.m@iwis.io',
    avatar:
      'https://firebasestorage.googleapis.com/v0/b/encore-dd4d9.appspot.com/o/avatars%2F1723789385701_DSC03727.JPG?alt=media&token=19018720-9f7c-484c-bd8d-6c936accde37',
    role: 'user',
    status: 'active'
  },
  {
    id: 'eaa10ee6-b2be-489d-b6c5-115f9b03d4d3',
    firstName: 'john',
    lastName: 'doe',
    email: 'ivashchyshyn.m@iwis.io',
    avatar:
      'https://firebasestorage.googleapis.com/v0/b/encore-dd4d9.appspot.com/o/avatars%2F1723760278366_image?alt=media&token=cf408cc0-44a3-4881-b8c8-5c76fa20615b',
    role: 'user',
    status: 'active'
  },
  {
    id: '54a69140-6138-47df-9c26-f18f6cdc99a5',
    firstName: 'john',
    lastName: 'doe',
    email: 'ivashchyshyn.m@iwis.io',
    avatar: null,
    role: 'user',
    status: 'active'
  },
  {
    id: '20f8b68c-52cd-4dc5-aa14-61e0589c0d89',
    firstName: 'test cild',
    lastName: 'u',
    email: 'ivashchyshyn.m@iwis.io',
    avatar: null,
    role: 'user',
    status: 'active'
  }
]

export default function Page() {
  return (
    <div className='flex flex-col gap-6'>
      <ModerationTabs />
      <PostListTable tableData={mockData} tableType='new' />
    </div>
  )
}
