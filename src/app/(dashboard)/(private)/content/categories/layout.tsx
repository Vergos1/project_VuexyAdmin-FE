import React from 'react'

import ContentTabs from '@/views/content/Tabs'

const LayoutCategories = ({ children }) => {
  return (
    <div className='flex flex-col gap-6'>
      <ContentTabs />
      {children}
    </div>
  )
}

export default LayoutCategories
