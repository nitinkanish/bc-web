/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['your-wordpress-domain.com'], // Replace with your WordPress domain
    formats: ['image/avif', 'image/webp'],
  },
  i18n: {
    locales: ['en', 'hi'],
    defaultLocale: 'en',
  },
};

export default nextConfig;

