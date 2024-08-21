// MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports
import SubcategoryListTable from './SubcategoryListTable'

const SubcategoryList = ({ tableTitle, subCategoryData }: { tableTitle: string; subCategoryData?: any[] }) => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <SubcategoryListTable title={tableTitle} tableData={subCategoryData} />
      </Grid>
    </Grid>
  )
}

export default SubcategoryList
