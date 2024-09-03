import { createApi } from '@reduxjs/toolkit/query/react'

import type { MetaType, UsersListType } from './../../../types/userTypes'

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
      query: ({ page, limit, search, subscriptionType, categories, status }) => ({
        url: 'users',
        method: 'GET',
        params: {
          page,
          limit,
          search,
          subscriptionType,
          categories,
          status
        }
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
