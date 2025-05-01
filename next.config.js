/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Disabling ESLint during production builds
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Disabling TypeScript checking during builds
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig; 