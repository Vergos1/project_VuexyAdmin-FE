// MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports
import UserListTable from './CategoryListTable'

const ContentList = ({ userData }: { userData?: any[] }) => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <UserListTable tableData={userData} />
      </Grid>
    </Grid>
  )
}

export default ContentList
