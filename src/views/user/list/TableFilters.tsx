// React Imports
import { useState, useEffect } from 'react'

// MUI Imports
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import MenuItem from '@mui/material/MenuItem'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'
import { useLazyGetUsersQuery } from '@/store/slices/userManagement/userManagementApi'
import { useGetCategoriesQuery } from '@/store/slices/categories/categoriesApi'

const TableFilters = ({ setData, setFilters }: { setData: (data: any[]) => void; setFilters: any }) => {
  // States
  const [category, setCategory] = useState<any['category']>([])
  const [subscriptionType, setSubscriptionType] = useState<any['currentPlan']>('')
  const [status, setStatus] = useState<any['status']>('')
  const [favoritesFilter, setFavoritesFilter] = useState<any>('')
  const [triggerGetUsers, { data, isFetching, error }] = useLazyGetUsersQuery()
  const { data: categories, isLoading } = useGetCategoriesQuery()

  console.log(categories)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        await triggerGetUsers({
          page: 1, //? можна використовувати зберігання стану для пагінації
          limit: 10, //? кількість записів на сторінці
          subscriptionType,
          favoritesFilter,
          categories: category,
          status
        }).unwrap()
      } catch (error) {
        console.error('Error fetching users:', error)
      }
    }

    fetchUsers()
  }, [subscriptionType, status, category, favoritesFilter, triggerGetUsers])

  //? Фільтрування даних на основі таблиці даних та обраних фільтрів
  useEffect(() => {
    const users = data && 'data' in data ? data.data : []

    const filteredData = users?.filter(() => {
      if (subscriptionType !== subscriptionType) return false
      if (status !== status) return false
      if (favoritesFilter !== favoritesFilter) return false

      return true
    })

    setFilters({
      subscriptionType,
      status,
      category,
      favoritesFilter
    })

    setData(filteredData || [])
  }, [data, subscriptionType, status, favoritesFilter, category, setData])

  return (
    <CardContent>
      <Grid container spacing={6}>
        <Grid item xs={12} sm={3}>
          <CustomTextField
            select
            fullWidth
            id='select-plan'
            value={subscriptionType}
            onChange={e => setSubscriptionType(e.target.value)}
            SelectProps={{ displayEmpty: true }}
          >
            <MenuItem value=''>All Plans</MenuItem>
            <MenuItem value='free'>Moments</MenuItem>
            <MenuItem value='monthly'>Moments Deluxe (Monthly)</MenuItem>
            <MenuItem value='annual'>Moments Deluxe (Annual)</MenuItem>
          </CustomTextField>
        </Grid>
        <Grid item xs={12} sm={3}>
          <CustomTextField
            select
            fullWidth
            id='select-status'
            value={status}
            onChange={e => setStatus(e.target.value)}
            SelectProps={{ displayEmpty: true }}
          >
            <MenuItem value=''>All Status</MenuItem>
            <MenuItem value='active'>Active</MenuItem>
            <MenuItem value='unverified'>Unverified</MenuItem>
            <MenuItem value='blocked'>Blocked</MenuItem>
          </CustomTextField>
        </Grid>
        <Grid item xs={12} sm={3}>
          <CustomTextField
            select
            fullWidth
            id='select-category'
            value={category.length > 0 ? category : ['']}
            placeholder='All Category'
            onChange={e => setCategory(e.target.value)}
            SelectProps={{
              multiple: true,
              MenuProps: {
                PaperProps: {
                  style: {
                    maxHeight: 200 //? Set the maximum height here
                  }
                }
              }
            }}
          >
            <MenuItem value=''>All Category</MenuItem>
            {categories &&
              categories.map((category: any) => (
                <MenuItem key={category.id} value={category.name}>
                  {category.name}
                </MenuItem>
              ))}
          </CustomTextField>
        </Grid>
        <Grid item xs={12} sm={3}>
          <CustomTextField
            select
            fullWidth
            id='select-memory'
            value={favoritesFilter}
            onChange={e => setFavoritesFilter(e.target.value)}
            SelectProps={{ displayEmpty: true }}
          >
            <MenuItem value=''>All Memory Status</MenuItem>
            <MenuItem value='include'>Memory added to Favorite</MenuItem>
            <MenuItem value='empty'>No memories added</MenuItem>
          </CustomTextField>
        </Grid>
      </Grid>
    </CardContent>
  )
}

export default TableFilters
