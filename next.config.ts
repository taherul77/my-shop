/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["res.cloudinary.com" , "api.dicebear.com"],  // Add the domain here
  },
};

module.exports = nextConfig;
