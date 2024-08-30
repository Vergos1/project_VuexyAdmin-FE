import React from 'react'
import type { ReactNode } from 'react'

import ContentTabs from '@/views/content/Tabs'

interface Props {
  children: ReactNode
}

const LayoutCategories = ({ children }: Props) => {
  return (
    <div className='flex flex-col gap-6'>
      <ContentTabs />
      {children}
    </div>
  )
}

export default LayoutCategories
