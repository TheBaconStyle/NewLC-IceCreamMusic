import InputFile from '@/components/Files/InputFile/InputFile';

export default function Ringhtone({ trackIndex }: { trackIndex: number }) {
	return (
		<div>
			<p className='font-bold'>Добавление рингтона</p>
			<p className='max-w-xl mt-1 text-sm flex text-foreground-400'>
				Формат: .wav, .flac
				<br />
				Длина: от 5 до 29.99 сек.
			</p>
			<div className='mt-4'>
				<InputFile
					name={'Ringhtone'}
					id={'Ringhtone'}
					textContent='Загрузить файл в формате .wav .flac'
					formats={['wav', 'flac']}
				/>
			</div>
		</div>
	);
}
