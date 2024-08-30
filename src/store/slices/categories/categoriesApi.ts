import { createApi } from '@reduxjs/toolkit/query/react'

import { baseQuery } from '../baseQuery'

export const categoriesApi = createApi({
  reducerPath: 'categoriesApi',
  baseQuery,
  tagTypes: ['Edit'],
  endpoints: builder => ({
    getCategories: builder.query<any, void>({
      query: () => ({
        url: 'categories',
        method: 'GET'
      }),
      providesTags: ['Edit']
    }),
    createCategory: builder.mutation({
      query: ({ name, parentCategoryId }: { name: string; parentCategoryId?: string }) => ({
        url: 'categories',
        method: 'POST',
        body: {
          name,
          parentCategoryId
        }
      }),
      invalidatesTags: ['Edit']
    }),
    getCategoryById: builder.query({
      query: ({ id }: { id: string }) => ({
        url: `categories/${id}`,
        method: 'GET'
      })
    }),
    updateCategory: builder.mutation({
      query: ({ id, name, parentCategoryId }: { id: string; name: string; parentCategoryId?: string }) => ({
        url: `categories/${id}`,
        method: 'PUT',
        body: {
          name: name,
          parentCategoryId: parentCategoryId
        }
      }),
      invalidatesTags: ['Edit']
    }),
    deleteCategory: builder.mutation({
      query: ({ id }: { id: string }) => ({
        url: `categories/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Edit']
    })
  })
})

export const {
  useGetCategoriesQuery,
  useGetCategoryByIdQuery,
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation
} = categoriesApi
