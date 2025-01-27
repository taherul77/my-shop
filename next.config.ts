/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  reactStrictMode: true,
  images: {
    domains: ["res.cloudinary.com" , "api.dicebear.com"],  // Add the domain here
  },
};

module.exports = nextConfig;
