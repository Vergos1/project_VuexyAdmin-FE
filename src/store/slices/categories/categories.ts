import { createSlice } from '@reduxjs/toolkit'

import { categoriesApi } from './categoriesApi'

export type UserStateTypes = {
  categories: any
  category: any
}

const initialState: UserStateTypes = {
  categories: [],
  category: {}
}

const categoriesSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setSelectedCategory: (state, action) => {
      state.category = action.payload
    },

    setSelectedSubcategory: (state, action) => {
      state.category = { ...state.category, selectedSubcategory: action.payload }
    }
  },
  extraReducers: builder => {
    //FULFILLED MATCHERS
    builder.addMatcher(categoriesApi.endpoints.getCategories.matchFulfilled, (state, { payload }) => {
      state.categories = payload || []
    })

    // builder.addMatcher(moderationApi.endpoints.getPostInfoById.matchFulfilled, (state, { payload }) => {
    //   console.log('payload', payload)
    //   state.post = payload
    // })
    // builder.addMatcher(moderationApi.endpoints.changePostStatusById.matchFulfilled, (state, { payload }) => {
    //   console.log('payload', payload)
    // })

    //REJECTED MATCHERS
    // builder.addMatcher(moderationApi.endpoints.getPosts.matchRejected, (state, { error }) => {
    //   console.error('Error loading users:', error)
    //   state.posts = []
    // })
  }
})

// Actions
export const { setSelectedCategory, setSelectedSubcategory } = categoriesSlice.actions

// Selectors
export const selectCategoryById = (state: { categories: UserStateTypes }, id: string) =>
  state.categories.categories.find(category => category.id === id)

export default categoriesSlice.reducer
