import { TextareaAutosize } from '@mui/material'

import CustomTextField from '@/@core/components/mui/TextField'
import ContentTabs from '@/views/content/Tabs'

const Page = () => {
  return (
    <div className='flex flex-col gap-6'>
      <ContentTabs />
      <div className='flex flex-col gap-6'>
        <CustomTextField
          label='Prompt for AI Tags Generation'
          placeholder='Type your prompt here'
          multiline
          rows={4}
          sx={{ width: '100%' }}
        />
        <CustomTextField
          label='Prompt for AI generating a text transcription'
          placeholder='Type your prompt here'
          multiline
          rows={4}
          sx={{ width: '100%' }}
        />
      </div>
    </div>
  )
}

export default Page
