'use client'

//!FIXME Рефакторити сторінку
import { useEffect, useState } from 'react'

import { Button } from '@mui/material'
import { useForm, FormProvider, Controller } from 'react-hook-form'

import CustomTextField from '@/@core/components/mui/TextField'
import ContentTabs from '@/views/content/Tabs'
import {
  useCreateAiPromtsMutation,
  useDeleteAiPromtsMutation,
  useGetAiPromtsByTypeQuery,
  useGetAiPromtsQuery,
  useUpdateAiPromtsMutation
} from '@/store/slices/promt/promtApi'
import { AiPromtsType } from '@/types/promtTypes'

const Page = () => {
  const methods = useForm()

  const {
    handleSubmit,
    control,
    reset,
    formState: { isDirty, isSubmitting, isSubmitSuccessful }
  } = methods

  const { data: aiPromtsAllList, isLoading: aiPromtsAllListLoading } = useGetAiPromtsQuery()
  const { data: aiPromtsTags, isLoading: aiPromtsTagsListLoading } = useGetAiPromtsByTypeQuery(AiPromtsType.TAG)
  const { data: aiPromtsText, isLoading: aiPromtsTextListLoading } = useGetAiPromtsByTypeQuery(AiPromtsType.TEXT)
  const [createAiPrompts] = useCreateAiPromtsMutation()
  const [updateAiPrompts] = useUpdateAiPromtsMutation()
  const [deleteAiPrompts] = useDeleteAiPromtsMutation()

  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => {
    if (aiPromtsTags || aiPromtsText) {
      reset({
        aiPromtsTags: aiPromtsTags?.prompt || '',
        aiPromtsText: aiPromtsText?.prompt || ''
      })
    }
  }, [aiPromtsTags, aiPromtsText, reset])

  useEffect(() => {
    if (isSubmitSuccessful) {
      setIsSubmitted(true)
    }
  }, [isSubmitSuccessful])

  useEffect(() => {
    if (isDirty && isSubmitted) {
      setIsSubmitted(false)
    }
  }, [isDirty])

  const onSubmit = async (data: any) => {
    try {
      if (aiPromtsTags?.prompt) {
        // If the prompt exists
        if (data.aiPromtsTags) {
          //@ts-ignore
          await updateAiPrompts({ type: 'tag', prompt: data.aiPromtsTags })
        } else {
          await deleteAiPrompts('tag')
        }
      } else {
        // If the prompt doesn't exist, create a new one
        if (data.aiPromtsTags) {
          //@ts-ignore
          await createAiPrompts({ type: 'tag', prompt: data.aiPromtsTags })
        }
      }

      if (aiPromtsText?.prompt) {
        // If the prompt exists
        if (data.aiPromtsText) {
          //@ts-ignore
          await updateAiPrompts({ type: 'text', prompt: data.aiPromtsText })
        } else {
          await deleteAiPrompts('text')
        }
      } else {
        // If the prompt doesn't exist, create a new one
        if (data.aiPromtsText) {
          //@ts-ignore
          await createAiPrompts({ type: 'text', prompt: data.aiPromtsText })
        }
      }

      console.log('Update successful')
    } catch (error) {
      console.error('Update failed', error)
    }
  }

  return (
    <FormProvider {...methods}>
      <div className='flex flex-col gap-6'>
        <ContentTabs />
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6'>
          <Controller
            name='aiPromtsTags'
            control={control}
            render={({ field }) => (
              <CustomTextField
                {...field}
                label='Prompt for AI Tags Generation'
                placeholder='Type your prompt here'
                multiline
                rows={4}
                sx={{ width: '100%' }}
              />
            )}
          />
          <Controller
            name='aiPromtsText'
            control={control}
            render={({ field }) => (
              <CustomTextField
                {...field}
                label='Prompt for AI generating a text transcription'
                placeholder='Type your prompt here'
                multiline
                rows={4}
                sx={{ width: '100%' }}
              />
            )}
          />
          {isDirty && !isSubmitted && (
            <Button type='submit' variant='contained' disabled={isSubmitting}>
              Submit
            </Button>
          )}
        </form>
      </div>
    </FormProvider>
  )
}

export default Page
