import { createApi } from '@reduxjs/toolkit/query/react'

import { baseQuery } from '../baseQuery'

export const userManagementApi = createApi({
  reducerPath: 'userApi',
  baseQuery,
  endpoints: builder => ({
    getUsers: builder.query({
      query: () => ({
        url: 'users',
        method: 'GET'
      }),
      transformResponse: response => response ?? []
    })
  })
})

export const { useGetUsersQuery } = userManagementApi
