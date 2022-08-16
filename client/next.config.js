/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  optimizeFonts: false,
  async rewrites() {
    return [
      {
        destination: 'https://dapi.kakao.com/:path*',
        source: '/:path*',
      },
    ];
  },
}

module.exports = nextConfig


