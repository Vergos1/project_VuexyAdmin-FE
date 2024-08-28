/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: process.env.BASEPATH,
  env: {
    PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    BASE_API_URL: process.env.NEXT_BASE_API_URL
  },
  redirects: async () => {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: true,
        locale: false
      }
    ]
  }
}

export default nextConfig
