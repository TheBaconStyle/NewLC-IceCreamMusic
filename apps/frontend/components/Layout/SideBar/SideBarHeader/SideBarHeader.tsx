export default function SideBarHeader() {
	return (
		<div className='flex gap-3 h-16 shrink-0 items-center'>
			<img alt='ICECREAMMUSIC' src='/Logo.svg' className='w-auto' />
			<div>
				<p className='font-bold'>ICECREAMMUSIC</p>
				<p className='text-xs'>Лучший дистрибьютор музыки</p>
			</div>
		</div>
	);
}
