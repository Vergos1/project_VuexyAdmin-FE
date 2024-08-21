'use client'

import { Breadcrumbs, Link, Tab, Tabs, Typography } from '@mui/material'

import SubcategoryListTable from '@/views/content/categories/subcategories/SubcategoryListTable'

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
      <Breadcrumbs aria-label='breadcrumb'>
        <Link className='hover:text-primary' href='/content/categories'>
          Categories
        </Link>
        <Typography className='text-textPrimary'>{mockData.name}</Typography>
      </Breadcrumbs>
      <SubcategoryListTable title={mockData.name} tableData={mockData.subcategories} />
    </div>
  )
}
