// Third-party Imports
import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

// API Imports
import { authApi } from './slices/auth/authApi'
import { userManagementApi } from './slices/userManagement/userManagementApi'

// Slice Imports
import authSlice from './slices/auth/auth'
import userManagementSlice from './slices/userManagement/userManagement'

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [userManagementApi.reducerPath]: userManagementApi.reducer,
    auth: authSlice,
    user: userManagementSlice
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ serializableCheck: false }).concat(authApi.middleware, userManagementApi.middleware),
  devTools: true
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
