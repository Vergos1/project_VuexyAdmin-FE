'use client'

import type { SyntheticEvent } from 'react'
import { useState } from 'react'

import { TabContext, TabList } from '@mui/lab'
import { Breadcrumbs, Link, Tab, Tabs, Typography } from '@mui/material'

import CustomTabList from '@/@core/components/mui/TabList'
import ContentTabs from '@/views/content/categories/Tabs'
import CategoryListTable from '@/views/content/categories/CategoryListTable'

const mockData = {
  id: '123e4567-e89b-12d3-a456-426614174000',
  name: 'Self',
  parentCategory: '456e7890-e89b-12d3-a456-426614174111',
  createdAt: '2024-08-13T08:00:00Z',
  updatedAt: '2024-08-14T08:00:00Z',
  subcategories: ['string'],
  questions: [
    {
      id: '123e4567-e89b-12d3-a456-426614174000',
      text: 'What motivates you every day?',
      category: '123e4567-e89b-12d3-a456-426614174000',
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-02T00:00:00Z'
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
        <Typography className='text-textPrimary'>Friends</Typography>
        <Typography className='text-textPrimary'>{mockData.name}</Typography>
      </Breadcrumbs>
      <CategoryListTable tableData={mockData.subcategories} />
    </div>
  )
}
