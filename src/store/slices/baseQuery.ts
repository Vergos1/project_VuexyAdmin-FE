import { fetchBaseQuery } from '@reduxjs/toolkit/query'

import { getValidAuthTokens } from '@/utils/cookies'

export const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_APP_URL,
  prepareHeaders: headers => {
    const { token } = getValidAuthTokens()

    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }

    return headers
  }
})
