import { createApi } from '@reduxjs/toolkit/query/react'

import { baseQuery } from '../baseQuery'

export const userManagementApi = createApi({
  reducerPath: 'userApi',
  baseQuery,
  tagTypes: ['User'],
  endpoints: builder => ({
    getUsers: builder.query({
      query: () => ({
        url: 'users',
        method: 'GET'
      }),
      providesTags: ['User']
    }),
    getUserInfoById: builder.query({
      query: (id: string) => ({
        url: `users/${id}`,
        method: 'GET'
      })
    }),
    blockUserById: builder.mutation({
      query: (id: string) => ({
        url: `users/status/${id}`,
        method: 'POST'
      }),
      invalidatesTags: ['User']
    })
  })
})

export const { useGetUsersQuery, useLazyGetUserInfoByIdQuery, useBlockUserByIdMutation } = userManagementApi
