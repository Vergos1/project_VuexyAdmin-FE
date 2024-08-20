'use client'

// React Imports
import type { ReactNode } from 'react'

// Third-party Imports
import { Provider } from 'react-redux'

import { store } from './index'

const ReduxProvider = ({ children }: { children: ReactNode }) => {
  return <Provider store={store}>{children}</Provider>
}

export default ReduxProvider
