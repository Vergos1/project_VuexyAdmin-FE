'use client'

// Next Imports
import { redirect, usePathname } from 'next/navigation'

// Third-party Imports
import Cookies from 'js-cookie'

import themeConfig from '@configs/themeConfig'

export const userAuth = Cookies.get('jwt')

const AuthRedirect = () => {
  const pathname = usePathname()

  Cookies.set('jwt', 'true')

  // ℹ️ Bring me `lang`
  const redirectUrl = `/login?redirectTo=${pathname}`
  const login = `/login`
  const homePage = themeConfig.homePageUrl

  return redirect(pathname === login ? login : pathname === homePage ? login : redirectUrl)
}

export default AuthRedirect
