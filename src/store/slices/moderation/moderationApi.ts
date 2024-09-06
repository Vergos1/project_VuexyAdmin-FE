import { createApi } from '@reduxjs/toolkit/query/react'

import { baseQuery } from '../baseQuery'

export const moderationApi = createApi({
  reducerPath: 'moderationApi',
  baseQuery,
  tagTypes: ['memories'],
  endpoints: builder => ({
    getPosts: builder.query({
      query: ({ listType, limit = 10, page = 1 }) => ({
        url: 'memories',
        method: 'GET',
        params: { listType, limit, page }
      })
    }),
    getPostInfoById: builder.query({
      query: (postId: string) => ({
        url: `memories/${postId}`,
        method: 'GET'
      })
    }),
    changePostStatusById: builder.mutation({
      query: (postId: string) => ({
        url: `memories/status/${postId}`,
        method: 'POST'
      }),
      invalidatesTags: ['memories']
    })
  })
})

export const {
  useGetPostsQuery,
  useGetPostInfoByIdQuery,
  useChangePostStatusByIdMutation,
  useLazyGetPostInfoByIdQuery
} = moderationApi
