'use client'

// React Imports
import { useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'

// Component Imports
import api from '@/api/api'
import UserList from '@/views/user/list'

import { useGetUsersQuery } from '@/store/slices/userManagement/userManagementApi'

/**
 * ! If you need data using an API call, uncomment the below API code, update the `process.env.API_URL` variable in the
 * ! `.env` file found at root of your project and also update the API endpoints like `/apps/user-list` in below example.
 * ! Also, remove the above server action import and the action itself from the `src/app/server/actions.ts` file to clean up unused code
 * ! because we've used the server action for getting our static data.
 */

const UserListApp = () => {
  const { data: users = [] as any, error, isLoading } = useGetUsersQuery([])

  useEffect(() => {
    if (error) {
      console.error('Error loading users:', error)
    }
  }, [error])

  console.log('Users:', users)

  return <UserList isLoading={isLoading} userData={users} />
}

export default UserListApp
