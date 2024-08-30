'use client'

// Component Imports
import UserList from '@/views/user/list'

import { useGetUsersQuery } from '@/store/slices/userManagement/userManagementApi'

/**
 * ! If you need data using an API call, uncomment the below API code, update the `process.env.API_URL` variable in the
 * ! `.env` file found at root of your project and also update the API endpoints like `/apps/user-list` in below example.
 * ! Also, remove the above server action import and the action itself from the `src/app/server/actions.ts` file to clean up unused code
 * ! because we've used the server action for getting our static data.
 */

const UserListApp = () => {
  const { data, isLoading } = useGetUsersQuery([])

  console.log('data', data)

  return <UserList isLoading={isLoading} userData={data?.data || []} meta={data?.meta || {}} />
}

export default UserListApp
