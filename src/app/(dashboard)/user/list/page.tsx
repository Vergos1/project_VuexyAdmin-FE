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

const getUserData = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/users`)

    if (!res.ok) {
      throw new Error('Failed to fetch userData')
    }

    return await res.json()
  } catch (error) {
    console.error('Error fetching userData:', error)

    return []
  }
}

const UserListApp = async () => {
  // Vars
  const data = await getUserData()

  return <UserList userData={data} />
}

export default UserListApp
