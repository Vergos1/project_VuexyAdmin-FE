'use client'
import { useEffect, useState } from 'react'

import { usePathname, useRouter } from 'next/navigation'

import { useDispatch, useSelector } from 'react-redux'

import { getValidAuthTokens } from '@/utils/cookies'
import type { RootState } from '@/store'
import { logout } from '@/store/slices/auth/auth'
import { useGetAuthStatusQuery } from '@/store/slices/auth/authApi'
import AuthRedirect from '@/components/AuthRedirect'
import { Preloader } from '@/components/Preloader'

type Props = {
  children?: React.ReactNode
}

export const AuthGuard = ({ children }: Props) => {
  // Hooks
  const dispatch = useDispatch()
  const { push } = useRouter()
  const pathname = usePathname()

  const { user } = useSelector((state: RootState) => state.auth)
  const [isTokenChecked, setIsTokenChecked] = useState(false)

  const { token } = getValidAuthTokens()

  //? this query will only execute if the token is valid and the user email is not already in the redux store
  const { error, isLoading } = useGetAuthStatusQuery(
    { token: token || '', user: user || '' },
    {
      //? The useGetAuthDataQuery hook will not execute the query at all if these values are falsy
      skip: !!user || !token
    }
  )

  //? if the user does not have a valid token, redirect to login page
  useEffect(() => {
    if (!token) {
      push(`/login?redirectFrom=${pathname}`)
      dispatch(logout())
    } else {
      setIsTokenChecked(true)
    }
  }, [token, push, dispatch])

  //? optional: show a loading indicator while the query and the token is loading
  if (!isTokenChecked || isLoading) {
    return <Preloader />
  }

  if (error) {
    return <AuthRedirect />
  }

  return children
}
