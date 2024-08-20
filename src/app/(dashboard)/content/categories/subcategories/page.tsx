'use client'

import type { SyntheticEvent } from 'react'
import { useState } from 'react'

import { TabContext, TabList } from '@mui/lab'
import { Breadcrumbs, Link, Tab, Tabs, Typography } from '@mui/material'

import CustomTabList from '@/@core/components/mui/TabList'
import ContentTabs from '@/views/content/categories/Tabs'
import CategoryListTable from '@/views/content/categories/CategoryListTable'

const mockData = {
  id: '8258e360-7377-489e-a563-d59ddcc0d8f6',
  name: 'Friends',
  createdAt: '2024-08-02T12:50:17.838Z',
  updatedAt: '2024-08-02T12:50:17.838Z',
  subcategories: [
    {
      id: '1ea0414d-18e9-4550-851c-2830360fdaca',
      name: 'Self',
      createdAt: '2024-08-02T12:50:17.838Z',
      updatedAt: '2024-08-02T12:50:17.838Z'
    },
    {
      id: '5bf9bc3a-4a83-48fe-88b3-c05ac733eb26',
      name: 'Friend',
      createdAt: '2024-08-02T12:50:17.838Z',
      updatedAt: '2024-08-02T12:50:17.838Z'
    }
  ]
}

export default function Page() {
  return (
    <div className='flex flex-col gap-6'>
      <ContentTabs />
      <Breadcrumbs aria-label='breadcrumb'>
        <Link className='hover:text-primary' href='/content/categories'>
          Categories
        </Link>
        <Typography className='text-textPrimary'>{mockData.name}</Typography>
      </Breadcrumbs>
      <CategoryListTable tableData={mockData.subcategories} />
    </div>
  )
}
