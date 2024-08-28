'use client'

// React Imports
import { useEffect, useState } from 'react'

// Next Imports
import { usePathname, useRouter } from 'next/navigation'
import Image from 'next/image'

import { useDispatch } from 'react-redux'

// MUI Imports
import useMediaQuery from '@mui/material/useMediaQuery'
import { styled, useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import Checkbox from '@mui/material/Checkbox'
import Button from '@mui/material/Button'
import FormControlLabel from '@mui/material/FormControlLabel'

// Third-party Imports
import classnames from 'classnames'

import { useForm } from 'react-hook-form'

import type { FieldValues, SubmitHandler } from 'react-hook-form'

// Type Imports
import type { SystemMode } from '@core/types'

// Component Imports
import Link from '@components/Link'
import Logo from '@components/layout/shared/Logo'
import CustomTextField from '@core/components/mui/TextField'

// Config Imports
import themeConfig from '@configs/themeConfig'

import type { AppDispatch } from '@/store/index'

// Hook Imports
import { useImageVariant } from '@core/hooks/useImageVariant'
import { useSettings } from '@core/hooks/useSettings'
import TopShapeImg from '../../public/images/illustrations/auth/top-shape-auth.svg'
import BottomShapeImg from '../../public/images/illustrations/auth/bottom-shape-auth.svg'
import { useLoginMutation } from '@/store/slices/auth/authApi'
import { getValidAuthTokens } from '@/utils/cookies'
import { Preloader } from '@/components/Preloader'

const MaskImg = styled('img')({
  blockSize: 'auto',
  maxBlockSize: 355,
  inlineSize: '100%',
  position: 'absolute',
  insetBlockEnd: 0,
  zIndex: -1
})

const LoginV2 = ({ mode }: { mode: SystemMode }) => {
  // States
  const [isPasswordShown, setIsPasswordShown] = useState(false)
  const { token } = getValidAuthTokens()

  // Vars
  const darkImg = '/images/pages/auth-mask-dark.png'
  const lightImg = '/images/pages/auth-mask-light.png'

  // Hooks
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const [login, result] = useLoginMutation()
  const dispatch = useDispatch<AppDispatch>()
  const { push } = useRouter()
  const router = useRouter()
  const pathname = usePathname()
  const { settings } = useSettings()
  const theme = useTheme()
  const hidden = useMediaQuery(theme.breakpoints.down('md'))
  const authBackground = useImageVariant(mode, lightImg, darkImg)

  const handleClickShowPassword = () => setIsPasswordShown(show => !show)

  const [isTokenChecked, setIsTokenChecked] = useState(false)

  //   useEffect(() => {
  //     if (token) {
  //       push('/home')
  //     }
  //   }, [token, push])

  useEffect(() => {
    if (token) {
      push(`/home?redirectFrom=${pathname}`)
    } else {
      setIsTokenChecked(true)
    }
  }, [token, push, dispatch])

  const handleLogin: SubmitHandler<FieldValues> = async data => {
    const { email, password } = data as { email: string; password: string }

    if (!email || !password) return

    await login({ email, password })
  }

  if (!isTokenChecked) {
    return <Preloader />
  }

  return (
    <div className='flex bs-full justify-center'>
      <div className='flex justify-center items-center bs-full !min-is-full p-6 md:!min-is-[unset] md:p-12 md:is-[520px] overflow-hidden sm:overflow-visible'>
        <div className='relative p-10 bg-backgroundPaper flex flex-col gap-6 is-full sm:is-auto md:is-full sm:max-is-[400px] md:max-is-[unset] mbs-11 sm:mbs-14 md:mbs-0'>
          <Image className='absolute top-[-12%] left-[-17%] z-[-1]' src={TopShapeImg} alt='shape-top' />
          <Image className='absolute top-[5%] left-[5%] z-[-1]' src={TopShapeImg} alt='shape-top' />
          <Image className='absolute bottom-[-15%] right-[-20%] z-[-1]' src={BottomShapeImg} alt='shape-bottom' />
          <Link className='flex justify-center items-center block-start-5 sm:block-start-[33px] inline-start-6 sm:inline-start-[38px]'>
            <Logo color='#F1BB30' />
          </Link>
          <div className='flex flex-col gap-1'>
            <Typography variant='h4'>{`Welcome to ${themeConfig.templateName}! 👋🏻`}</Typography>
            <Typography>Please sign-in to your account and start the adventure</Typography>
          </div>
          <form noValidate autoComplete='off' onSubmit={handleSubmit(handleLogin)} className='flex flex-col gap-5'>
            <CustomTextField
              autoFocus
              fullWidth
              label='Email'
              placeholder='Enter your email'
              {...register('email', { required: true })}
            />
            <CustomTextField
              fullWidth
              label='Password'
              placeholder='············'
              id='outlined-adornment-password'
              type={isPasswordShown ? 'text' : 'password'}
              {...register('password', { required: true })}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton edge='end' onClick={handleClickShowPassword} onMouseDown={e => e.preventDefault()}>
                      <i className={isPasswordShown ? 'tabler-eye-off' : 'tabler-eye'} />
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            <div className='flex justify-between items-center gap-x-3 gap-y-1 flex-wrap'>
              <FormControlLabel control={<Checkbox />} label='Remember me' />
              <Typography className='text-end' color='primary' component={Link}>
                Forgot password?
              </Typography>
            </div>
            <Button fullWidth variant='contained' type='submit'>
              Login
            </Button>
            <div className='flex justify-center items-center flex-wrap gap-2'>
              <Typography>New on our platform?</Typography>
              <Typography component={Link} color='primary'>
                Create an account
              </Typography>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginV2
