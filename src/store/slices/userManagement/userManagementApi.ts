import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import type { UserResponse } from '@/types/userTypes'
import { BASE_API_URL } from '@/utils/constants'

export const userManagementApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_API_URL
  }),
  endpoints: builder => ({
    getUsers: builder.query<UserResponse[], void>({
      query: () => ({
        url: 'users',
        method: 'GET'
      })
    })
  })
})

export const { useGetUsersQuery } = userManagementApi
