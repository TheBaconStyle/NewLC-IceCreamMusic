import { isoLangs } from '@/data/allLanguage';
import { TReleaseInsertForm } from '@/schema/release.schema';
import { Select, SelectItem } from '@heroui/select';
import { useFormContext } from 'react-hook-form';

export default function LanguageTrack({ trackIndex }: { trackIndex: number }) {
	const { register } = useFormContext<TReleaseInsertForm>();
	return (
		<div>
			<p className='font-bold'>Язык трека</p>
			<p className='max-w-xl mt-1 text-sm text-foreground-400'>
				Укажите язык, на котором исполняется трек, если трек без вокальной
				партии в списке выберите «Без слов»
			</p>
			<Select
				label='Язык метаданных'
				labelPlacement={'outside'}
				placeholder='Выберите язык'
				isRequired
				className='w-1/2 pt-3'
				{...register(`tracks.${trackIndex}.language`)}>
				<>
					<SelectItem key={'Без слов'} textValue='Без слов'>
						Без слов
					</SelectItem>
					{isoLangs.map((language) => (
						<SelectItem
							className='capitalize'
							key={language.name}
							textValue={language.name}>
							{language.nativeName}
						</SelectItem>
					))}
				</>
			</Select>
		</div>
	);
}
