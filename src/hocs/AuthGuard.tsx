'use client'
import { useEffect, useState } from 'react'

import { usePathname, useRouter } from 'next/navigation'

import { useDispatch } from 'react-redux'

import { getValidAuthTokens } from '@/utils/cookies'
import { logout } from '@/store/slices/auth/auth'
import { useGetAuthStatusQuery } from '@/store/slices/auth/authApi'
import { Preloader } from '@/components/Preloader'

type Props = {
  children?: React.ReactNode
}

export const AuthGuard = ({ children }: Props) => {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Hooks
  const dispatch = useDispatch()
  const { push } = useRouter()
  const pathname = usePathname()

  const { token } = getValidAuthTokens()

  //? this query will only execute if the token is valid and the user email is not already in the redux store
  const { error, isLoading } = useGetAuthStatusQuery(
    { token: token || '' },
    {
      //? The useGetAuthDataQuery hook will not execute the query at all if these values are falsy
      skip: !token
    }
  )

  //? if the user does not have a valid token, redirect to login page
  useEffect(() => {
    if (!token || error) {
      dispatch(logout())
      push(`/login?redirectFrom=${pathname}`)
    }
  }, [token, push, dispatch, error, pathname])

  if (!isClient) {
    return null
  }

  //? optional: show a loading indicator while the query and the token is loading
  if (isLoading) {
    return <Preloader />
  }

  return children
}
