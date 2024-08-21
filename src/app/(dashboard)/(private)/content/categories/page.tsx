'use client'

import CustomTabList from '@/@core/components/mui/TabList'
import ContentTabs from '@/views/content/Tabs'
import CategoryListTable from '@/views/content/categories/CategoryListTable'
import CategoryList from '@/views/content/categories'

const mockData = [
  {
    id: 'de125500-ff99-40d6-bbd7-92a743b6c154',
    name: 'Self',
    createdAt: '2024-08-02T12:50:17.838Z',
    updatedAt: '2024-08-02T12:50:17.838Z'
  },
  {
    id: '15853510-d138-433a-90eb-410b9b9019bc',
    name: 'Partner',
    createdAt: '2024-08-02T12:50:17.838Z',
    updatedAt: '2024-08-02T12:50:17.838Z'
  },
  {
    id: 'f05af854-cf5d-4d53-a5cb-159274088867',
    name: 'Parent',
    createdAt: '2024-08-02T12:50:17.838Z',
    updatedAt: '2024-08-02T12:50:17.838Z'
  },
  {
    id: 'de125500-ff99-40d6-bbd7-92a743b6c154',
    name: 'Self',
    createdAt: '2024-08-02T12:50:17.838Z',
    updatedAt: '2024-08-02T12:50:17.838Z'
  },
  {
    id: '15853510-d138-433a-90eb-410b9b9019bc',
    name: 'Partner',
    createdAt: '2024-08-02T12:50:17.838Z',
    updatedAt: '2024-08-02T12:50:17.838Z'
  },
  {
    id: 'f05af854-cf5d-4d53-a5cb-159274088867',
    name: 'Parent',
    createdAt: '2024-08-02T12:50:17.838Z',
    updatedAt: '2024-08-02T12:50:17.838Z'
  },
  {
    id: 'de125500-ff99-40d6-bbd7-92a743b6c154',
    name: 'Self',
    createdAt: '2024-08-02T12:50:17.838Z',
    updatedAt: '2024-08-02T12:50:17.838Z'
  },
  {
    id: '15853510-d138-433a-90eb-410b9b9019bc',
    name: 'Partner',
    createdAt: '2024-08-02T12:50:17.838Z',
    updatedAt: '2024-08-02T12:50:17.838Z'
  }
]

export default function Page() {
  return (
    <div className='flex flex-col gap-6'>
      <ContentTabs />
      <CategoryListTable tableData={mockData} />
    </div>
  )
}
