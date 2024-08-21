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

// Types Imports
// import type { UsersType } from '@/types/apps/userTypes'

type Props = {
  open: boolean
  handleClose: () => void
  userData?: any[]
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

const getAvatar = (params: Pick<any, 'avatar' | 'firstName' | 'lastName'>) => {
  const { avatar, firstName, lastName } = params

  if (avatar) {
    return <CustomAvatar src={avatar} size={60} />
  } else {
    return <CustomAvatar size={60}>{getInitials(`${firstName} ${lastName}`)}</CustomAvatar>

    // return <CustomAvatar size={34}>{getInitials(fullName as string)}</CustomAvatar>
  }
}

const UserInfoDrawer = (props: Props) => {
  // Props
  const { open, handleClose, userData, setData } = props

  // States
  const [formData, setFormData] = useState<FormNonValidateType>(initialData)

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

  //   const user: any = userData || {

  const user: any = {
    fullName: 'John Doe',
    id: '235689054',
    email: 'john.doe@example.com',
    dob: '08/04/1999',
    status: 'Active',
    plan: 'Moments Deluxe (Monthly)',
    voiceRecording: '8 / 300 minutes',
    inspirationQuestions: 'XX / 50',
    categories: ['Animals', 'Family', 'Health'],
    trustedAccount: { fullName: 'Nick Doe', email: 'nick.doe@example.com', relationship: 'Brother' },
    dependentAccount: { participants: 'Ann Doe' }
  }

  return (
    <Dialog
      fullWidth
      open={open}
      onClose={handleClose}
      maxWidth='md'
      scroll='body'
      sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }}
    >
      <div className='flex items-center justify-between plb-7 pli-6'>
        <DialogTitle variant='h4' className='min-w-[100%] text-center p-0'>
          User Information
        </DialogTitle>
        <DialogCloseButton onClick={() => handleClose()} disableRipple>
          <i className='tabler-x' />
        </DialogCloseButton>
      </div>
      <div className='flex items-center justify-center'>
        {getAvatar({
          avatar: user.avatar,
          firstName: user.firstName,
          lastName: user.lastName
        })}
      </div>
      <DialogContent className='flex items-center justify-center plb-6'>
        <Paper elevation={3} style={{ padding: '16px' }} className='br-[6px]'>
          <Grid container className='plb-6 gap-y-6' maxWidth='600px' spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant='subtitle1' className='mb-2'>
                <i className='tabler-user' /> About
              </Typography>
              <Typography className='flex items-center'>
                <i className='tabler-id mr-[8px]' /> <strong className='mr-[12px]'>Full Name:</strong> {user.fullName}
              </Typography>
              <Typography className='flex items-center'>
                <i className='tabler-hash mr-[8px]' /> <strong className='mr-[12px]'>User ID:</strong> {user.id}
              </Typography>
              <Typography className='flex items-center'>
                <i className='tabler-mail mr-[8px]' /> <strong className='mr-[12px]'>Email:</strong> {user.email}
              </Typography>
              <Typography className='flex items-center'>
                <i className='tabler-calendar mr-[8px]' /> <strong className='mr-[12px]'>Date of Birth:</strong>{' '}
                {user.dob}
              </Typography>
              <Typography className='flex items-center'>
                <i className='tabler-status mr-[8px]' /> <strong className='mr-[12px]'>Status:</strong> {user.status}
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant='subtitle1' className='mb-2'>
                <i className='tabler-plan mr-[8px]' /> Tariff Plan
              </Typography>
              <Typography className='flex items-center'>
                <i className='tabler-box mr-[8px]' /> <strong className='mr-[12px]'>Plan:</strong> {user.plan}
              </Typography>
              <Typography className='flex items-center'>
                <i className='tabler-microphone mr-[8px]' /> <strong className='mr-[12px]'>Voice Recording:</strong>{' '}
                {user.voiceRecording}
              </Typography>
              <Typography className='flex items-center'>
                <i className='tabler-question mr-[8px]' /> <strong className='mr-[12px]'>Inspiration Questions:</strong>{' '}
                {user.inspirationQuestions}
              </Typography>
              <Typography className='flex items-center'>
                <i className='tabler-list mr-[8px]' /> <strong className='mr-[12px]'>Categories:</strong> Animals,
                Family, Health
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant='subtitle1' className='mb-2'>
                <i className='tabler-heart mr-[8px]' /> Trusted Account
              </Typography>
              <Typography className='flex items-center'>
                <i className='tabler-user mr-[8px]' /> <strong className='mr-[12px]'>Full Name:</strong>{' '}
                {user.trustedAccount.fullName}
              </Typography>
              <Typography className='flex items-center'>
                <i className='tabler-mail mr-[8px]' /> <strong className='mr-[12px]'>Email:</strong>{' '}
                {user.trustedAccount.email}
              </Typography>
              <Typography className='flex items-center'>
                <i className='tabler-mail mr-[8px]' /> <strong className='mr-[12px]'>Relationship:</strong>{' '}
                {user.trustedAccount.relationship}
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant='subtitle1' className='mb-2'>
                <i className='tabler-users' /> Dependent (Child) Account
              </Typography>
              <Typography className='flex items-center'>
                <i className='tabler-mail mr-[8px]' /> <strong className='mr-[12px]'>Participants:</strong>{' '}
                {user.dependentAccount.participants}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </DialogContent>
    </Dialog>
  )
}

export default UserInfoDrawer
