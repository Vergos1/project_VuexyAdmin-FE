import { createSlice } from '@reduxjs/toolkit'

import { moderationApi } from './moderationApi'

export type UserStateTypes = {
  posts: any
  post: any
}

const initialState: UserStateTypes = {
  posts: [],
  post: {}
}

const moderationSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    //FULFILLED MATCHERS
    builder.addMatcher(moderationApi.endpoints.getPosts.matchFulfilled, (state, { payload }) => {
      state.posts = payload || []
    })
    builder.addMatcher(moderationApi.endpoints.getPostInfoById.matchFulfilled, (state, { payload }) => {
      console.log('payload', payload)
      state.post = payload
    })
    builder.addMatcher(moderationApi.endpoints.changePostStatusById.matchFulfilled, (state, { payload }) => {
      console.log('payload', payload)
    })

    //REJECTED MATCHERS
    builder.addMatcher(moderationApi.endpoints.getPosts.matchRejected, (state, { error }) => {
      console.error('Error loading users:', error)
      state.posts = []
    })
  }
})

export default moderationSlice.reducer
