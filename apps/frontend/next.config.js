const withSvgr = require("next-plugin-svgr");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  cleanDistDir: true,
  output: "standalone",
  experimental: {
    instrumentationHook: true,
    serverActions: {
      allowedOrigins: [
        "http://localhost:3000",
        "https://www.icecreammusic.net/",
      ],
    },
  },
  serverComponentsExternalPackages: ["pino", "pino-pretty"],
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "9000",
        pathname: "**/**",
      },
      {
        protocol: "https",
        hostname: "s3.icecreammusic.net",
        pathname: "**/**",
      },
    ],
  },
};

module.exports = withSvgr(nextConfig);
