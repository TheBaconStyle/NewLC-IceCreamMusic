import InputFile from '@/components/Files/InputFile/InputFile';
import { TReleaseInsertForm } from '@/schema/release.schema';
import { useFormContext } from 'react-hook-form';

export default function VideoTrack({ trackIndex }: { trackIndex: number }) {
	const { register } = useFormContext<TReleaseInsertForm>();
	return (
		<div>
			<p className='font-bold'>Загрузка видео</p>
			<p className='max-w-xl mt-1 text-sm flex text-foreground-400'>
				Формат: .mov, .mp4, .avi
				<br /> Максимальный размер: не более 6 ГБ
			</p>
			<div className='mt-4'>
				<InputFile
					id={'videoTrack'}
					textContent='Загрузить файл в формате .mov, .mp4, .avi'
					formats={['mov', 'mp4', 'avi']}
					{...register(`tracks.${trackIndex}.video`)}
				/>
			</div>
		</div>
	);
}
