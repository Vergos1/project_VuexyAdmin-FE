import { MetaType, UsersListType } from './../../../types/userTypes'
import { createApi } from '@reduxjs/toolkit/query/react'

import { baseQuery } from '../baseQuery'

export interface UsersResponse {
  data: UsersListType[] | []
  meta: MetaType | {}
}

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
      providesTags: ['User'],
      transformResponse: (response: UsersResponse) => ({
        data: response ? response.data : [],
        meta: response ? response.meta : {}
      })
    }),
    getUserInfoById: builder.query({
      query: (id: string) => ({
        url: `users/${id}`,
        method: 'GET'
      })
    }),
    changeUserStatusById: builder.mutation({
      query: (id: string) => ({
        url: `users/status/${id}`,
        method: 'POST'
      }),
      invalidatesTags: ['User']
    })
  })
})

export const { useGetUsersQuery, useLazyGetUserInfoByIdQuery, useChangeUserStatusByIdMutation } = userManagementApi
