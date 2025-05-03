import InputFile from '@/components/Files/InputFile/InputFile';

export default function VideoTrack({ trackIndex }: { trackIndex: number }) {
	return (
		<div>
			<p className='font-bold'>Загрузка видео</p>
			<p className='max-w-xl mt-1 text-sm flex text-foreground-400'>
				Формат: .mov, .mp4, .avi
				<br /> Максимальный размер: не более 6 ГБ
			</p>
			<div className='mt-4'>
				<InputFile
					name={'videoTrack'}
					id={'videoTrack'}
					textContent='Загрузить файл в формате .mov, .mp4, .avi'
					formats={['mov', 'mp4', 'avi']}
				/>
			</div>
		</div>
	);
}
