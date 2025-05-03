'use client';

import { cn } from '@/utils/cn';

interface MarqueeProps {
	className?: string;
	reverse?: boolean;
	children?: React.ReactNode;
	vertical?: boolean;
	repeat?: number;
	[key: string]: any;
}

export default function Marquee({
	className,
	reverse,
	children,
	vertical = false,
	repeat = 4,
	...props
}: MarqueeProps) {
	return (
		<div
			{...props}
			className={cn(
				'group flex overflow-hidden my-8 [--duration:40s] [--gap:1rem] [gap:var(--gap)] ',
				{
					'flex-row': !vertical,
					'flex-col': vertical,
				},
				className,
			)}>
			{Array(repeat)
				.fill(0)
				.map((_, i) => (
					<div
						key={i}
						className={cn('flex shrink-0 gap-16 pl-14', {
							'animate-marquee flex-row': !vertical,
							'animate-marquee-vertical flex-col': vertical,
							'[animation-direction:reverse]': reverse,
						})}>
						{children}
					</div>
				))}
		</div>
	);
}
