import InputFile from '@/components/Files/InputFile/InputFile';
import { TReleaseInsertForm } from '@/schema/release.schema';
import { useFormContext } from 'react-hook-form';

export default function Synchronized({ trackIndex }: { trackIndex: number }) {
	const { register } = useFormContext<TReleaseInsertForm>();
	return (
		<div>
			<p className='font-bold'>Синхронизированный текст трека</p>
			<p className='max-w-xl mt-1 text-sm flex text-foreground-400'>
				Получите дополнительный доход и ещё больше внимания на площадках.
			</p>
			<div className='mt-4'>
				<InputFile
					name={'synchronized'}
					id={'synchronized'}
					textContent='Загрузить файл в формате .ttml'
					formats={['ttml']}
				/>
			</div>
		</div>
	);
}
