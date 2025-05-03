import { TInfoCard } from './InfoCard.props';

export default function InfoCard({
	text,
	color,
	value,
	valueType,
	approximately,
}: TInfoCard) {
	return (
		<div className='bg-zinc-900 w-72 rounded-xl text-left px-8 py-5'>
			<div className='flex items-center gap-3'>
				<div
					className='w-5 h-2 rounded-lg'
					style={{ backgroundColor: color }}></div>
				<p>{text}</p>
			</div>
			<p className='text-5xl font-bold'>
				{approximately && '~'} {value}
				{valueType}
			</p>
		</div>
	);
}
