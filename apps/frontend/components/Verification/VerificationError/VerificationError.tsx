import Link from 'next/link';

export default function VerificationError() {
	return (
		<div className='flex flex-col gap-5 text-center justify-center items-center h-full'>
			<svg
				xmlns='http://www.w3.org/2000/svg'
				fill='none'
				viewBox='0 0 24 24'
				strokeWidth='1.5'
				stroke='currentColor'
				className='size-12 md:size-24 text-red-600 successIcon'>
				<path
					strokeLinecap='round'
					strokeLinejoin='round'
					d='m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
				/>
			</svg>

			<p className='font-semibold text-2xl'>
				Увы, но вы не прошли верификацию :(
			</p>
			<p className='max-w-3xl'>
				Не расстраивайтесь, это не значит, что вы не можете пользоваться нашим
				сервисом. Вам просто следует пройти этап верификации заново.
			</p>
			<Link href={'#'} className='btn'>
				Пройти верификацю
			</Link>
		</div>
	);
}
