import Cookies from 'js-cookie'

import type { ChildrenType } from '@core/types'

// Component Imports
import AuthRedirect from '../components/AuthRedirect'

export default async function AuthGuard({ children }: ChildrenType) {
  const jwt = Cookies.get('jwt')

  //   const isAuthenticated = await yourCustomAuthFunction()
  const isAuthenticated = true

  return <>{isAuthenticated ? children : <AuthRedirect />}</>
}
