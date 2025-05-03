import DateFormatter from '@/utils/dateFormatter';
import { TNewsDetail } from './NewsDetail.props';

import { Chip } from '@heroui/chip';
export default function NewsDetail({
	title,
	image,
	description,
	date,
	tags,
}: TNewsDetail) {
	return (
		<div className='flex flex-col gap-5'>
			<div
				className='w-full h-96 relative bg-center rounded-xl'
				style={{
					backgroundImage: `url("${image}")`,
				}}></div>

			<div>
				<p>{DateFormatter(date)}</p>
				<p className='font-semibold text-3xl'>{title}</p>
				<p className='mt-3'>{description}</p>
				<div className='flex gap-3 mt-5'>
					{tags.map((t) => (
						<Chip key={t}>{t}</Chip>
					))}
				</div>
			</div>
		</div>
	);
}
