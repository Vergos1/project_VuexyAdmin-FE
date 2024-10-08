import dynamic from 'next/dynamic'

const Logo = dynamic(() => import('@/@core/svg/Logo'), {
  ssr: false
})

export const Preloader = () => {
  return (
    <div className='fixed top-0 left-0 w-full h-full flex justify-center items-center bg-opacity-50 z-9999'>
      <Logo className='animate-ping' color='#F1BB30' />
    </div>
  )
}

export const ComponentPreloader = () => {
  return (
    <div className='absolute top-0 left-0 w-full h-full flex justify-center items-center z-9999'>
      <Logo className='animate-bounce' color='#F1BB30' />
    </div>
  )
}
