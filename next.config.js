/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ldb-phinf.pstatic.net',
      },
    ],
  },
};

module.exports = nextConfig; 