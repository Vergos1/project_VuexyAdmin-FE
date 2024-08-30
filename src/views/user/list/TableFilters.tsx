// React Imports
import { useState, useEffect } from 'react'

// MUI Imports
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import MenuItem from '@mui/material/MenuItem'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'

const TableFilters = ({ setData, tableData }: { setData: (data: any[]) => void; tableData?: any[] }) => {
  // States
  const [role, setRole] = useState<any['role']>('')
  const [category, setCategory] = useState<any['category']>([])
  const [plan, setPlan] = useState<any['currentPlan']>('')
  const [status, setStatus] = useState<any['status']>('')
  const [memory, setMemory] = useState<any['memoryStatus']>('')

  useEffect(() => {
    const filteredData = tableData?.filter(user => {
      if (role && user.role !== role) return false
      if (plan && user.subscriptionType !== plan) return false
      if (status && user.status !== status) return false
      if (memory && user.memoryStatus !== memory) return false

      if (category.length && !category.includes('')) {
        if (!category.includes(user.category)) return false
      }

      return true
    })

    setData(filteredData || [])
  }, [role, plan, status, memory, tableData, setData])

  return (
    <CardContent>
      <Grid container spacing={6}>
        <Grid item xs={12} sm={3}>
          <CustomTextField
            select
            fullWidth
            id='select-plan'
            value={plan}
            onChange={e => setPlan(e.target.value)}
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
        {/*//? Roles filters
         <Grid item xs={12} sm={3}>
          <CustomTextField
            select
            fullWidth
            id='select-role'
            value={role}
            onChange={e => setRole(e.target.value)}
            SelectProps={{ displayEmpty: true }}
          >
            <MenuItem value=''>All Roles</MenuItem>
            <MenuItem value='admin'>Admin</MenuItem>
            <MenuItem value='user'>User</MenuItem>
          </CustomTextField>
        </Grid> */}
        <Grid item xs={12} sm={3}>
          <CustomTextField
            select
            fullWidth
            id='select-category'
            value={category.length ? category : ['']}
            placeholder='All Category'
            onChange={e => setCategory(e.target.value)}
            SelectProps={{ multiple: true }}
          >
            <MenuItem value=''>All Category</MenuItem>
            <MenuItem value='animals'>Animals</MenuItem>
            <MenuItem value='books'>Books</MenuItem>
            <MenuItem value='career'>Career & Service</MenuItem>
            <MenuItem value='family'>Family</MenuItem>
            <MenuItem value='food'>Food</MenuItem>
            <MenuItem value='friend'>Friend</MenuItem>
            <MenuItem value='fun'>Fun</MenuItem>
            <MenuItem value='health'>Health</MenuItem>
            <MenuItem value='hobbies'>Hobbies</MenuItem>
            <MenuItem value='personal'>Personal Growth</MenuItem>
            <MenuItem value='quotes'>Quotes</MenuItem>
          </CustomTextField>
        </Grid>
        <Grid item xs={12} sm={3}>
          <CustomTextField
            select
            fullWidth
            id='select-memory'
            value={memory}
            onChange={e => setMemory(e.target.value)}
            SelectProps={{ displayEmpty: true }}
          >
            <MenuItem value=''>All Memory Status</MenuItem>
            <MenuItem value='added'>Memory added to Favorite</MenuItem>
            <MenuItem value='no-added'>No memories added</MenuItem>
          </CustomTextField>
        </Grid>
      </Grid>
    </CardContent>
  )
}

export default TableFilters
