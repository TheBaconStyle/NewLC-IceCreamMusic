import { Textarea } from '@heroui/input';

export default function CommentForModerator() {
	return (
		<div className='bg-zinc-900 rounded-xl p-5 w-full'>
			<p className='mb-1 font-extrabold text-lg'>Комментарий для модератора</p>
			<Textarea
				className='max-w-xl'
				cols={20}
				isClearable
				label='Комментарий'
				labelPlacement='outside'
				placeholder='Оставьте свой комментарий для модератора'
			/>
		</div>
	);
}
