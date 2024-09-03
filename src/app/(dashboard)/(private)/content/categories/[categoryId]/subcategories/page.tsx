'use client'

import { useEffect, useState } from 'react'

import { useParams, useRouter } from 'next/navigation'

import { Breadcrumbs, Link, Typography } from '@mui/material'

import { useDispatch, useSelector } from 'react-redux'

import SubcategoryListTable from '@/views/content/categories/subcategories/SubcategoryListTable'
import { selectCategoryById, setSelectedCategory } from '@/store/slices/categories/categories'
import { categoriesApi } from '@/store/slices/categories/categoriesApi'
import { ComponentPreloader } from '@/components/Preloader'
import type { RootState } from '@/store'

export default function Page() {
  const { push } = useRouter()
  const { categoryId } = useParams()
  const dispatch = useDispatch()

  const category = useSelector((state: RootState) =>
    selectCategoryById(state, Array.isArray(categoryId) ? categoryId[0] : categoryId)
  )

  const [categoryData, setCategoryData] = useState<any>([])

  const [trigger, { data, isLoading }] = categoriesApi.endpoints.getCategories.useLazyQuery()

  useEffect(() => {
    //@ts-ignore
    if (!category) {
      console.log('No categoryId')

      //   push('/content/categories')
      trigger()
    }
  }, [category, trigger])

  useEffect(() => {
    if (data) {
      console.log('Fetched data from API:', data)
      setCategoryData(data)
      dispatch(setSelectedCategory(data))
      console.log('Data fetched and set:', data)
    } else if (category) {
      console.log('Using existing category data:', category)
      setCategoryData(category)
    }
  }, [data, category, dispatch])

  const refreshData = () => {
    trigger() // Re-fetch data
  }

  console.log('category data', categoryData)

  return (
    <div className='flex flex-col gap-6'>
      <div className='relative w-full h-[80vh]'>
        {isLoading ? (
          <ComponentPreloader />
        ) : (
          <div className='flex flex-col gap-6'>
            <Breadcrumbs aria-label='breadcrumb'>
              <Link className='hover:text-primary' href='/content/categories'>
                Categories
              </Link>
              <Typography className='text-textPrimary'>{categoryData.name}</Typography>
            </Breadcrumbs>

            <SubcategoryListTable
              title={categoryData.name}
              parentCategoryId={categoryData.id}
              tableData={categoryData.subcategories}
              onRefresh={refreshData}
            />
          </div>
        )}
      </div>
    </div>
  )
}
