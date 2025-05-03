export default function VerificationSuccess() {
	return (
		<div className='flex flex-col gap-5 text-center justify-center items-center h-full'>
			<svg
				xmlns='http://www.w3.org/2000/svg'
				fill='none'
				viewBox='0 0 24 24'
				strokeWidth='1.5'
				stroke='currentColor'
				className=' size-12 md:size-24 text-green-700 successIcon'>
				<path
					strokeLinecap='round'
					strokeLinejoin='round'
					d='M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
				/>
			</svg>
			<p className='font-semibold text-2xl'>Вы успешно прошли верификацию!</p>
			<p>
				Теперь Вам доступен весь функционал площадки ICECREAMMUSIC. <br />
				Спасибо, что выбрали наш сервис!
			</p>
		</div>
	);
}
