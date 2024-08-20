/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: process.env.BASEPATH,
  env: {
    API_URL: process.env.NEXT_PUBLIC_API_URL
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
