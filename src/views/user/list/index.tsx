// MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports
import UserListTable from './UserListTable'
import { ComponentPreloader } from '@/components/Preloader'

const UserList = ({ isLoading = false, userData }: { isLoading?: boolean; userData?: any[] }) => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12} className='relative min-w-[100%] min-h-[80vh]'>
        {isLoading ? <ComponentPreloader /> : <UserListTable tableData={userData} />}
      </Grid>
    </Grid>
  )
}

export default UserList
