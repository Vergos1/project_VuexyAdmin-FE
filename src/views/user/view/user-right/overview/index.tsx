// MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports
import ProjectListTable from './ProjectListTable'
import UserActivityTimeLine from './UserActivityTimeline'
import InvoiceListTable from './InvoiceListTable'

/**
 * ! If you need data using an API call, uncomment the below API code, update the `process.env.API_URL` variable in the
 * ! `.env` file found at root of your project and also update the API endpoints like `/apps/invoice` in below example.
 * ! Also, remove the above server action import and the action itself from the `src/app/server/actions.ts` file to clean up unused code
 * ! because we've used the server action for getting our static data.
 */

/* const getInvoiceData = async () => {
  const res = await fetch(`${process.env.API_URL}/apps/invoice`)

  if (!res.ok) {
    throw new Error('Failed to fetch invoice data')
  }

  return res.json()
} */

const OverViewTab = async () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <ProjectListTable />
      </Grid>
      <Grid item xs={12}>
        <UserActivityTimeLine />
      </Grid>
      <Grid item xs={12}>
        <InvoiceListTable invoiceData={[]} />
      </Grid>
    </Grid>
  )
}

export default OverViewTab
