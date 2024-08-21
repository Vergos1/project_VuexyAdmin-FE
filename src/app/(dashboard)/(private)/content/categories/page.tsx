'use client'

// Component Imports
import CustomTabList from '@/@core/components/mui/TabList'
import CategoryListTable from '@/views/content/categories/CategoryListTable'
import CategoryList from '@/views/content/categories'

import api from '@/api/api'
import { useEffect, useState } from 'react'
import BlankLayout from '@/@layouts/BlankLayout'
import LayoutContent from '../layout'





const CategoriesList = () => {
  const [data, setData] = useState([])

  const fetchCategories = async () => {
    try {
      const {data} = await api.contentManagement.getCategoriesList()
      setData(data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  console.log(data, 'data')


  return (
    <div className='flex flex-col gap-6'>
      <CategoryListTable tableData={data} />
    </div>
  )
}

export default CategoriesList
