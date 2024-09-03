import { createApi } from '@reduxjs/toolkit/query/react'

import { baseQuery } from '../baseQuery'

export const moderationApi = createApi({
  reducerPath: 'moderationApi',
  baseQuery,
  tagTypes: ['memories'],
  endpoints: builder => ({
    getPosts: builder.query({
      query: () => ({
        url: 'memories',
        method: 'GET'
      })
    }),
    getPostInfoById: builder.query({
      query: (id: string) => ({
        url: `memories/${id}`,
        method: 'GET'
      })
    }),
    changePostStatusById: builder.mutation({
      query: (id: string) => ({
        url: `memories/status/${id}`,
        method: 'POST'
      }),
      invalidatesTags: ['memories']
    })
  })
})

export const { useGetPostsQuery, useLazyGetPostInfoByIdQuery, useChangePostStatusByIdMutation } = moderationApi
