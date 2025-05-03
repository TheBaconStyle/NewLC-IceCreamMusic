export default function VerificationExpectation() {
	return (
		<div className='flex flex-col gap-5 text-center justify-center items-center h-full'>
			<svg
				xmlns='http://www.w3.org/2000/svg'
				fill='none'
				viewBox='0 0 24 24'
				strokeWidth='1.5'
				stroke='currentColor'
				className=' size-12 md:size-24 text-indigo-700 successIcon'>
				<path
					strokeLinecap='round'
					strokeLinejoin='round'
					d='M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75'
				/>
			</svg>

			<p className='font-semibold text-2xl'>Данные доставлены успешно!</p>
			<p>
				Наш модератор проверит корректность введенных Вами данных и вы получите
				уведомление на почту. <br /> Спасибо, что выбрали наш сервис!
			</p>
		</div>
	);
}
