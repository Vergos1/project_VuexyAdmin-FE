import { createSlice } from '@reduxjs/toolkit'

import { promptApi } from './promtApi'
import type { AiPrompt } from '@/types/promtTypes'

export type PromtStateTypes = {
  promts: AiPrompt[] | []
  promt: AiPrompt | null
}

const initialState: PromtStateTypes = {
  promts: [],
  promt: null
}

const promtSlice = createSlice({
  name: 'promt',
  initialState,
  reducers: {},
  extraReducers: builder => {
    // FULFILLED MATCHERS
    builder.addMatcher(
      promptApi.endpoints.getAiPromts.matchFulfilled,
      (state: PromtStateTypes, { payload }: { payload: AiPrompt[] }) => {
        state.promts = payload
      }
    )
    builder.addMatcher(
      promptApi.endpoints.getAiPromtsByType.matchFulfilled,
      (state: PromtStateTypes, { payload }: { payload: AiPrompt }) => {
        state.promt = payload
      }
    )
    builder.addMatcher(
      promptApi.endpoints.getAiPromtsByType.matchFulfilled,
      (state: PromtStateTypes, { payload }: { payload: AiPrompt | undefined }) => {
        state.promt = payload as AiPrompt
      }
    )
    builder.addMatcher(
      promptApi.endpoints.updateAiPromts.matchFulfilled,
      (state: PromtStateTypes, { payload }: { payload: AiPrompt }) => {
        const index = state.promts.findIndex(promt => promt.id === payload.id)

        if (index !== -1) {
          state.promts[index] = payload
        }
      }
    )
    builder.addMatcher(
      promptApi.endpoints.deleteAiPromts.matchFulfilled,
      (state: PromtStateTypes, { payload }: { payload: any }) => {
        const index = state.promts.findIndex(promt => promt.id === payload)

        if (index !== -1) {
          state.promts.splice(index, 1)
        }
      }
    )
  }
})

export default promtSlice.reducer
