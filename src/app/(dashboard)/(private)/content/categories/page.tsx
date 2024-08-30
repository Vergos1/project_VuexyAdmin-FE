'use client'

import ContentTabs from '@/views/content/Tabs'
import CategoryListTable from '@/views/content/categories/CategoryListTable'
import { useGetCategoriesQuery } from '@/store/slices/categories/categoriesApi'
import { ComponentPreloader } from '@/components/Preloader'

export default function Page() {
  const { data: categories, isLoading } = useGetCategoriesQuery()

  console.log('categories', categories)

  return (
    <div className='flex flex-col gap-6'>
      <div className='relative w-full h-[80vh]'>
        {isLoading ? <ComponentPreloader /> : <CategoryListTable tableData={categories || []} />}
      </div>
    </div>
  )
}
