/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "drive.google.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cs-website-sdsu.s3.us-west-1.amazonaws.com",
        port: "",
        pathname: "/**",
      },
      // Add more remote patterns as needed
    ],
  },
};

export default nextConfig;
