// Component Imports
import api from '@/api/api'
import UserList from '@/views/user/list'

/**
 * ! If you need data using an API call, uncomment the below API code, update the `process.env.API_URL` variable in the
 * ! `.env` file found at root of your project and also update the API endpoints like `/apps/user-list` in below example.
 * ! Also, remove the above server action import and the action itself from the `src/app/server/actions.ts` file to clean up unused code
 * ! because we've used the server action for getting our static data.
 */

const getUsersList = async () => {
  try {
    const { data } = await api.usersManagement.getUsersList()

    return data
  } catch (error) {
    console.error(error)

    return []
  }
}

const UserListApp = async () => {
  const data = await getUsersList()

  return <UserList userData={data} />
}

export default UserListApp
