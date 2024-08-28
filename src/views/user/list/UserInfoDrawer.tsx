// React Imports
import { useState } from 'react'

// MUI Imports
import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'

// Third-party Imports
import { useForm, Controller } from 'react-hook-form'

// Component Imports
import { Dialog, DialogContent, DialogTitle, Grid, Paper } from '@mui/material'

import DialogCloseButton from '@/components/dialogs/DialogCloseButton'
import { getInitials } from '@/utils/getInitials'
import CustomAvatar from '@/@core/components/mui/Avatar'
import { ComponentPreloader } from '@/components/Preloader'
import { getFullName } from '@/utils/getFullName'
import { getFormattedDate } from '@/utils/getFormattedDate'
import { getAvatar } from '@/utils/getAvatar'

// Types Imports
// import type { UsersType } from '@/types/apps/userTypes'

type Props = {
  open: boolean
  handleClose: () => void
  userData?: {
    birthDate: string
    categories: []
    trustedAccount: {
      firstName: string
      lastName: string
      email: string
      relationship: string
    }
    dependentAccount: string[]
    email: string
    firstName: string
    id: string
    lastName: string
    plan: 'Moments' | 'Moments Deluxe (Monthly)' | 'Moments Deluxe (Annual)'
    questionsAmount: number
    status: 'active' | 'blocked' | 'unverified'
    voiceRecordsLength: number
  }
  setData: (data: any[]) => void

  //   setData: (data: UsersType[]) => void

  //   userData?: UsersType[]
}

type FormValidateType = {
  fullName: string
  username: string
  email: string
  role: string
  plan: string
  status: string
}

type FormNonValidateType = {
  company: string
  country: string
  contact: string
}

// Vars
const initialData = {
  company: '',
  country: '',
  contact: ''
}

const UserInfoDrawer = ({ isLoading, open, handleClose, userData, setData }: Props & { isLoading: boolean }) => {
  // States
  const [formData, setFormData] = useState<FormNonValidateType>(initialData)

  console.log('userData', userData)

  // Hooks
  const {
    control,
    reset: resetForm,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValidateType>({
    defaultValues: {
      fullName: '',
      username: '',
      email: '',
      role: '',
      plan: '',
      status: ''
    }
  })

  return (
    <Dialog
      fullWidth
      open={open}
      onClose={handleClose}
      maxWidth='md'
      scroll='body'
      sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }}
    >
      <div className='flex items-center justify-between plb-7 pli-6 relative'>
        {!isLoading && (
          <DialogTitle variant='h4' className='min-w-[100%] text-center p-0'>
            User Information
          </DialogTitle>
        )}
        <DialogCloseButton onClick={() => handleClose()} disableRipple>
          <i className='tabler-x' />
        </DialogCloseButton>
      </div>
      <div className='flex items-center justify-center relative'>
        {!isLoading &&
          getAvatar({
            avatar: '',
            firstName: userData?.firstName || '',
            lastName: userData?.lastName || '',
            size: 60
          })}
      </div>
      <DialogContent className='flex items-center min-h-[70vh] justify-center plb-6 relative'>
        {isLoading ? (
          <ComponentPreloader />
        ) : (
          <Paper elevation={3} style={{ padding: '16px' }} className='br-[6px]'>
            <Grid container className='plb-6 gap-y-6' maxWidth='700px' spacing={2}>
              <Grid item xs={12} md={6}>
                <Typography variant='subtitle1' className='mb-3'>
                  About
                </Typography>
                <Typography className='flex items-center mb-3'>
                  <i className='tabler-user mr-[8px]' /> <strong className='mr-[12px]'>Full Name:</strong>{' '}
                  {(userData && getFullName(userData.firstName, userData.lastName)) ?? 'N/A'}
                </Typography>
                <Typography className='flex items-center mb-3'>
                  <i className='tabler-user-exclamation mr-[8px]' /> <strong className='mr-[12px]'>User ID:</strong>{' '}
                  {userData?.id ?? 'N/A'}
                </Typography>
                <Typography className='flex items-center mb-3'>
                  <i className='tabler-mail mr-[8px]' /> <strong className='mr-[12px]'>Email:</strong>{' '}
                  {userData?.email ?? 'N/A'}
                </Typography>
                <Typography className='flex items-center mb-3'>
                  <i className='tabler-calendar mr-[8px]' /> <strong className='mr-[12px]'>Date of Birth:</strong>{' '}
                  {(userData?.birthDate && getFormattedDate(userData?.birthDate)) ?? 'N/A'}
                </Typography>
                <Typography className='flex items-center capitalize'>
                  <i className='tabler-check mr-[8px]' /> <strong className='mr-[12px]'>Status:</strong>{' '}
                  {userData?.status ?? 'N/A'}
                </Typography>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant='subtitle1' className='mb-3'>
                  Tariff Plan
                </Typography>
                <Typography className='flex items-center mb-3'>
                  <i className='tabler-businessplan mr-[8px]' /> <strong className='mr-[12px]'>Plan:</strong>{' '}
                  {userData?.plan ?? 'N/A'}
                </Typography>
                <Typography className='flex items-center mb-3'>
                  <i className='tabler-microphone mr-[8px]' /> <strong className='mr-[12px]'>Voice Recording:</strong>{' '}
                  {userData?.voiceRecordsLength ?? 'N/A'} / 300 minutes
                </Typography>
                <Typography className='flex items-center mb-3'>
                  <i className='tabler-question-mark mr-[8px]' />{' '}
                  <strong className='mr-[12px]'>Inspiration Questions:</strong>
                  {userData?.questionsAmount ?? 'N/A'}/50
                </Typography>
                <Typography className='flex items-center'>
                  <i className='tabler-question-mark mr-[8px]' /> <strong className='mr-[12px]'>Categories:</strong>{' '}
                  {userData && userData.categories.length > 0
                    ? userData.categories.map((category, index) => <span key={index}>{category},</span>)
                    : 'N/A'}
                </Typography>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant='subtitle1' className='mb-3'>
                  Trusted Account
                </Typography>
                <Typography className='flex items-center mb-3'>
                  <i className='tabler-user mr-[8px]' /> <strong className='mr-[12px]'>Full Name:</strong>{' '}
                  {(userData?.trustedAccount &&
                    getFullName(userData.trustedAccount?.firstName, userData.trustedAccount?.lastName)) ??
                    'N/A'}
                </Typography>
                <Typography className='flex items-center mb-3'>
                  <i className='tabler-mail mr-[8px]' /> <strong className='mr-[12px]'>Email:</strong>{' '}
                  {userData?.trustedAccount?.email ?? 'N/A'}
                </Typography>
                <Typography className='flex items-center'>
                  <i className='tabler-repeat mr-[8px]' /> <strong className='mr-[12px]'>Relationship:</strong>{' '}
                  {userData?.trustedAccount?.relationship ?? 'N/A'}
                </Typography>
              </Grid>

              <Grid item xs={12} gap={2} md={6}>
                <Typography variant='subtitle1' className='mb-3'>
                  Dependent (Child) Account
                </Typography>
                <Typography className='flex items-center'>
                  <i className='tabler-mood-boy mr-[8px]' /> <strong className='mr-[12px]'>Participants:</strong>{' '}
                  {userData?.dependentAccount ?? 'N/A'}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default UserInfoDrawer
