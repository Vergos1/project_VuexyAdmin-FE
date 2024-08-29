// React Imports
import type { ReactElement } from 'react'

// Next Imports
import dynamic from 'next/dynamic'

// MUI Imports
import Grid from '@mui/material/Grid'

// Type Imports
// import type { PricingPlanType } from '@/types/pages/pricingTypes'

// Component Imports
import UserLeftOverview from '@views/user/view/user-left-overview'
import UserRight from '@views/user/view/user-right'

// Data Imports
// import { getPricingData } from '@/app/server/actions'

const OverViewTab = dynamic(() => import('@views/user/view/user-right/overview'))
const SecurityTab = dynamic(() => import('@views/user/view/user-right/security'))
const NotificationsTab = dynamic(() => import('@views/user/view/user-right/notifications'))
const ConnectionsTab = dynamic(() => import('@views/user/view/user-right/connections'))

// Vars
const tabContentList = (data?: any[]): { [key: string]: ReactElement } => ({
  overview: <OverViewTab />,
  security: <SecurityTab />,

  //   'billing-plans': <BillingPlans data={data} />,
  notifications: <NotificationsTab />,
  connections: <ConnectionsTab />
})

/**
 * ! If you need data using an API call, uncomment the below API code, update the `process.env.API_URL` variable in the
 * ! `.env` file found at root of your project and also update the API endpoints like `/pages/pricing` in below example.
 * ! Also, remove the above server action import and the action itself from the `src/app/server/actions.ts` file to clean up unused code
 * ! because we've used the server action for getting our static data.
 */

/* const getPricingData = async () => {
  // Vars
  const res = await fetch(`${process.env.API_URL}/pages/pricing`)

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
} */

const UserViewTab = async () => {
  // Vars
  //   const data = await getPricingData()

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} lg={4} md={5}>
        <UserLeftOverview />
      </Grid>
      <Grid item xs={12} lg={8} md={7}>
        <UserRight tabContentList={tabContentList([])} />
      </Grid>
    </Grid>
  )
}

export default UserViewTab
