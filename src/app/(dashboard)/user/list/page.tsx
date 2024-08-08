// Component Imports
import UserList from '@/views/user/list'

// Data Imports
// import { getUserData } from '@/app/server/actions'

/**
 * ! If you need data using an API call, uncomment the below API code, update the `process.env.API_URL` variable in the
 * ! `.env` file found at root of your project and also update the API endpoints like `/apps/user-list` in below example.
 * ! Also, remove the above server action import and the action itself from the `src/app/server/actions.ts` file to clean up unused code
 * ! because we've used the server action for getting our static data.
 */

/* const getUserData = async () => {
  // Vars
  const res = await fetch(`${process.env.API_URL}/apps/user-list`)

  if (!res.ok) {
    throw new Error('Failed to fetch userData')
  }

  return res.json()
} */

const UserListApp = async () => {
  // Vars
  //   const data = await getUserData()

  return (
    <UserList
      userData={[
        {
          id: 1,
          fullName: 'John Doe',
          email: 'jyqJt@example.com',
          role: 'admin',
          currentPlan: 'Moments',
          status: 'active'
        },
        {
          id: 2,
          fullName: 'Digi Doe',
          email: 'fjyqJfft@example.com',
          role: 'user',
          currentPlan: 'Moments Deluxe (Monthly)',
          status: 'active'
        },
        {
          id: 3,
          fullName: 'Dorge Djoe',
          email: 'fqjyqJfft@example.com',
          role: 'user',
          currentPlan: 'Moments Deluxe (Monthly)',
          status: 'unverified'
        },
        {
          id: 4,
          fullName: 'Doge Djoe',
          email: 'jyqJfft@example.com',
          role: 'user',
          currentPlan: 'Moments Deluxe (Monthly)',
          status: 'blocked'
        }
      ]}
    />
  )
}

export default UserListApp
