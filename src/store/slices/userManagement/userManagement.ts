import { createSlice } from '@reduxjs/toolkit'

import { userManagementApi } from './userManagementApi'
import type { MetaType, UsersListType, UserType } from '@/types/userTypes'

export type UserManagementTypes = {
  meta: MetaType | {}
  users: UsersListType[] | []
  user: UserType | {}
}

const initialState: UserManagementTypes = {
  meta: {},
  users: [],
  user: {}
}

const userManagementSlice = createSlice({
  name: 'userManagement',
  initialState,
  reducers: {},
  extraReducers: builder => {
    //FULFILLED MATCHERS
    builder.addMatcher(userManagementApi.endpoints.getUsers.matchFulfilled, (state, { payload }) => {
      console.log('payload', payload.data)
      state.users = payload.data as UsersListType[]
      state.meta = payload.meta
    })
    builder.addMatcher(userManagementApi.endpoints.getUsersListCSV.matchFulfilled, (state, { payload }) => {
      console.log('payload', payload)
    })
    builder.addMatcher(userManagementApi.endpoints.getUserInfoById.matchFulfilled, (state, { payload }) => {
      console.log('payload', payload)
      state.user = payload
    })
    builder.addMatcher(userManagementApi.endpoints.changeUserStatusById.matchFulfilled, (state, { payload }) => {
      console.log('payload', payload)
    })

    //REJECTED MATCHERS
    builder.addMatcher(userManagementApi.endpoints.getUsers.matchRejected, (state, { error }) => {
      console.error('Error loading users:', error)
      state.users = []
    })
    builder.addMatcher(userManagementApi.endpoints.getUsersListCSV.matchRejected, (state, { error }) => {
      console.error('Error loading users CSV:', error)
    })
    builder.addMatcher(userManagementApi.endpoints.getUserInfoById.matchRejected, (state, { error }) => {
      console.error('Error loading users:', error)
      state.user = {}
    })
    builder.addMatcher(userManagementApi.endpoints.changeUserStatusById.matchRejected, (state, { error }) => {
      console.error('Error loading users:', error)
    })
  }
})

export default userManagementSlice.reducer
