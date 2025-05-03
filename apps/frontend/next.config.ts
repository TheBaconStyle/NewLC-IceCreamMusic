import { NextConfig } from 'next';

const nextConfig: NextConfig = {
	output: 'standalone',
	reactStrictMode: true,
	cleanDistDir: true,
	experimental: {
		serverActions: {
			allowedOrigins: ['localhost'],
		},
	},
	images: {
		unoptimized: true,
	},
};

export default nextConfig;
