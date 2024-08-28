import Logo from '@/@core/svg/Logo'

export const Preloader = () => {
  return (
    <div className='fixed top-0 left-0 w-full h-full flex justify-center items-center bg-opacity-50 z-9999'>
      <Logo className='animate-ping' color='#F1BB30' />
    </div>
  )
}
