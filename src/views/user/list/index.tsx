// MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports
import UserListTable from './UserListTable'
import { ComponentPreloader } from '@/components/Preloader'
import type { MetaType, UsersListType } from '@/types/userTypes'

interface UserListProps {
  isLoading?: boolean
  userData: UsersListType[] | []
  meta: MetaType | {}
}

const UserList = ({ isLoading = false, userData, meta }: UserListProps) => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12} className='relative min-w-[100%] min-h-[80vh]'>
        {isLoading ? <ComponentPreloader /> : <UserListTable tableData={userData} meta={meta} />}
      </Grid>
    </Grid>
  )
}

export default UserList
