// Third-party Imports
import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

// Slice Imports
import authSlice from './slices/auth/auth'
import { authApi } from './slices/auth/authApi'

export const store = configureStore({
  reducer: {
    authSlice,
    [authApi.reducerPath]: authApi.reducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false }).concat(authApi.middleware),
  devTools: true
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
