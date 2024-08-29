'use client'

import type { SyntheticEvent } from 'react'
import { useState } from 'react'

import { useParams } from 'next/navigation'

import { TabContext, TabList } from '@mui/lab'
import { Breadcrumbs, Link, Tab, Tabs, Typography } from '@mui/material'

import { useSelector } from 'react-redux'

import QuestionListTable from '@/views/content/categories/subcategories/questions/QuestionListTable'
import ContentTabs from '@/views/content/Tabs'
import { useGetCategoryByIdQuery } from '@/store/slices/categories/categoriesApi'
import { ComponentPreloader } from '@/components/Preloader'

export default function Page() {
  const { subCategoryId } = useParams()
  const { category } = useSelector(state => state.categories)
  const { data, isLoading } = useGetCategoryByIdQuery({ id: subCategoryId as string })

  return (
    <div className='flex flex-col gap-6'>
      {/* <ContentTabs /> */}

      <div className='relative w-full h-[80vh]'>
        {isLoading ? (
          <ComponentPreloader />
        ) : (
          <div className='flex flex-col gap-6'>
            <Breadcrumbs aria-label='breadcrumb'>
              <Link className='hover:text-primary' href='/content/categories'>
                Categories
              </Link>
              <Link className='hover:text-primary' href={`/content/categories/${category.id}/subcategories`}>
                {category.name}
              </Link>
              <Typography className='text-textPrimary'>{data.name}</Typography>
            </Breadcrumbs>
            <QuestionListTable title={data.name} tableData={data.questions} />
          </div>
        )}
      </div>
    </div>
  )
}
