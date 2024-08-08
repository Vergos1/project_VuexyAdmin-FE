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
  const [plan, setPlan] = useState<any['currentPlan']>('')
  const [status, setStatus] = useState<any['status']>('')

  useEffect(() => {
    const filteredData = tableData?.filter(user => {
      if (role && user.role !== role) return false
      if (plan && user.currentPlan !== plan) return false
      if (status && user.status !== status) return false

      return true
    })

    setData(filteredData || [])
  }, [role, plan, status, tableData, setData])

  return (
    <CardContent>
      <Grid container spacing={6}>
        <Grid item xs={12} sm={4}>
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
        </Grid>
        <Grid item xs={12} sm={4}>
          <CustomTextField
            select
            fullWidth
            id='select-plan'
            value={plan}
            onChange={e => setPlan(e.target.value)}
            SelectProps={{ displayEmpty: true }}
          >
            <MenuItem value=''>All Plans</MenuItem>
            <MenuItem value='Moments'>Moments</MenuItem>
            <MenuItem value='Moments Deluxe (Monthly)'>Moments Deluxe (Monthly)</MenuItem>
            <MenuItem value='Moments Deluxe (Annual)'>Moments Deluxe (Annual)</MenuItem>
          </CustomTextField>
        </Grid>
        <Grid item xs={12} sm={4}>
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
      </Grid>
    </CardContent>
  )
}

export default TableFilters
