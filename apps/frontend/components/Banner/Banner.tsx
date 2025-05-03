import { TBannerProps } from './Banner.props';
import clsx from 'clsx';

export default function Banner({ title, description }: TBannerProps) {
	return (
		<div className='w-full'>
			<div
				className={clsx(
					'relative isolate overflow-hidden bg-gray-900 px-6 py-24 text-center shadow-2xl sm:rounded-3xl sm:px-16',
				)}>
				<h2 className='text-4xl font-semibold tracking-tight text-balance text-white sm:text-5xl'>
					{title}
				</h2>
				<p className='mx-auto mt-6 max-w-xl text-lg/8 text-pretty text-gray-300'>
					{description}
				</p>
				<svg
					viewBox='0 0 1024 1024'
					aria-hidden='true'
					className='absolute top-1/2 left-1/2 -z-10 size-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]'>
					<circle
						r={512}
						cx={512}
						cy={512}
						fill='url(#827591b1-ce8c-4110-b064-7cb85a0b1217)'
						fillOpacity='0.7'
					/>
					<defs>
						<radialGradient id='827591b1-ce8c-4110-b064-7cb85a0b1217'>
							<stop stopColor='#7775D6' />
							<stop offset={1} stopColor='#E935C1' />
						</radialGradient>
					</defs>
				</svg>
			</div>
		</div>
	);
}
