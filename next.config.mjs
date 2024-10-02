/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "https",
        hostname: "media.licdn.com",
      },
      {
        protocol: "https",
        hostname: "www.its.ac.id",
        pathname: "/*",
      },
      {
        protocol: "https",
        hostname: "presento-app.s3.amazonaws.com",
        pathname: "/*",
      },
    ],
  },
  env: {
    KINDE_CLIENT_ID: process.env.KINDE_CLIENT_ID,
    KINDE_CLIENT_SECRET: process.env.KINDE_CLIENT_SECRET,
    KINDE_ISSUER_URL: process.env.KINDE_ISSUER_URL,
    KINDE_SITE_URL: process.env.KINDE_SITE_URL,
    KINDE_POST_LOGOUT_REDIRECT_URL: process.env.KINDE_POST_LOGOUT_REDIRECT_URL,
    KINDE_POST_LOGIN_REDIRECT_URL: process.env.KINDE_POST_LOGIN_REDIRECT_URL,
  },
};

export default nextConfig;

// {
//   protocol: "https",
//   hostname: "avatars.githubusercontent.com",
//   pathname: "/u/*",
// },
// {
//   protocol: "https",
//   hostname: "lh3.googleusercontent.com",
//   pathname: "/a/*",
// },
// {
//   protocol: "https",
//   hostname: "media.licdn.com",
// },
// {
//   protocol: "https",
//   hostname: "*",
//   pathname: "/*",
// },
// {
//   protocol: "https",
//   hostname: "www.its.ac.id",
//   pathname: "/*",
// },
