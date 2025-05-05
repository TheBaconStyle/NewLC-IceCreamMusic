import { heroui } from '@heroui/theme';
import type { Config } from 'tailwindcss';
import { addDynamicIconSelectors } from '@iconify/tailwind';

export default {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
		'../../node_modules/@heroui/theme/dist/components/(badge|button|checkbox|chip|date-input|date-picker|form|input|link|modal|radio|select|slider|popover|ripple|spinner|calendar|listbox|divider|scroll-shadow).js',
	],
	theme: {
		screens: {
			sm: { min: '640px' },
			md: { min: '768px' },
			lg: { min: '1024px' },
			'1.5lg': { min: '1150px' },
			xl: { min: '1280px' },
			'1.5xl': { min: '1360px' },
			'2xl': { min: '1536px' },
			big: { max: '1160px' },
			medium: { max: '900px' },
			mobile: { max: '640px' },
			small: { max: '440px' },
		},
		extend: {
			colors: {
				background: 'var(--background)',
				foreground: 'var(--foreground)',
			},
		},
	},
	darkMode: 'class',
	plugins: [heroui(), addDynamicIconSelectors()],
} satisfies Config;
