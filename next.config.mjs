/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['backend.bolchaal.in'], // Replace with your WordPress domain
    formats: ['image/avif', 'image/webp'],
    unoptimized: true,
  },
  i18n: {
    locales: ['en', 'hi'],
    defaultLocale: 'en',
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
