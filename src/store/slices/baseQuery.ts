import { fetchBaseQuery } from '@reduxjs/toolkit/query'

import { BASE_API_URL } from '@/utils/constants'
import { getValidAuthTokens } from '@/utils/cookies'

export const baseQuery = fetchBaseQuery({
  baseUrl: BASE_API_URL,
  prepareHeaders: headers => {
    const { token } = getValidAuthTokens()

    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }

    return headers
  }
})
