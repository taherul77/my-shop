/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
   
    ignoreDuringBuilds: true,
  },
  reactStrictMode: true,
  images: {
    domains: ["res.cloudinary.com" , "api.dicebear.com","assets.aceternity.com"], 
  },
};

module.exports = nextConfig;
