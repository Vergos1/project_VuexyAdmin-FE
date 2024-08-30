'use client'

import { useEffect } from 'react'

import { useParams } from 'next/navigation'

import { Breadcrumbs, Link, Typography } from '@mui/material'

import { useDispatch, useSelector } from 'react-redux'

import SubcategoryListTable from '@/views/content/categories/subcategories/SubcategoryListTable'
import ContentTabs from '@/views/content/Tabs'
import { selectCategoryById, setSelectedCategory } from '@/store/slices/categories/categories'
import { categoriesApi } from '@/store/slices/categories/categoriesApi'
import { ComponentPreloader } from '@/components/Preloader'
import type { RootState } from '@/store'

export default function Page() {
  const { categoryId } = useParams()
  const dispatch = useDispatch()

  const category = useSelector((state: RootState) =>
    selectCategoryById(state, Array.isArray(categoryId) ? categoryId[0] : categoryId)
  )

  const [trigger, { data, isLoading }] = categoriesApi.endpoints.getCategories.useLazyQuery()

  useEffect(() => {
    if (!category) {
      console.log('No categoryId')
      trigger()
    }
  }, [])

  useEffect(() => {
    dispatch(setSelectedCategory(category))
  }, [data])

  console.log('category', category)

  return (
    <div className='flex flex-col gap-6'>
      {/* <ContentTabs /> */}

      <div className='relative w-full h-[80vh]'>
        {isLoading || !category ? (
          <ComponentPreloader />
        ) : (
          <div className='flex flex-col gap-6'>
            <Breadcrumbs aria-label='breadcrumb'>
              <Link className='hover:text-primary' href='/content/categories'>
                Categories
              </Link>
              <Typography className='text-textPrimary'>{category.name}</Typography>
            </Breadcrumbs>
            <SubcategoryListTable title={category.name} tableData={category.subcategories} />
          </div>
        )}
      </div>
    </div>
  )
}
