import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	output: 'standalone',
	reactStrictMode: true,
	cleanDistDir: true,
	experimental: {
		serverActions: {
			allowedOrigins: ['localhost'],
		},
	},
};

export default nextConfig;
