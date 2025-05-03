import { Input } from '@heroui/input';
import { TPriorityRelease } from '../TPriorityRelease';
import { useFormContext } from 'react-hook-form';

export default function MainInfoPeopleRelease() {
	const { register, formState } = useFormContext<TPriorityRelease>();

	return (
		<div className='bg-zinc-900 rounded-xl p-5 flex flex-col gap-4 w-full'>
			<p className='mb-1 font-extrabold text-lg'>Общая информация</p>
			<Input
				labelPlacement='outside'
				label={
					<div>
						Электронная почта <span className='text-red-600'>*</span>
					</div>
				}
				placeholder='Введите почту'
				type='text'
				radius='sm'
				{...register('email', {
					required: 'Поле обязательное для ввода',
					pattern: {
						value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
						message: 'Некорректный ввод почты',
					},
				})}
				isInvalid={!!formState.errors.email}
				errorMessage={formState.errors.email?.message?.toString()}
			/>

			<Input
				labelPlacement='outside'
				label={
					<div>
						Название партнера <span className='text-red-600'>*</span>
					</div>
				}
				placeholder='Введите название партнера'
				type='text'
				radius='sm'
				description={
					<div className='max-w-lg flex flex-col gap-2 mt-2'>
						<p>
							Точное название юридического лица (ИП/ФЛ, включая знаки препинания
							и пробелы), у которого заключен лицензионный договор с
							ICECREAMMUSIC.
						</p>
						<p>
							Обращаем ваше внимание, что название должно быть указано точно
							таким, как в договоре. В случае если данная информация будет
							предоставлена некорректно, то ваш релиз не попадёт в список на
							рассмотрение.
						</p>
					</div>
				}
				{...register('partner', {
					required: 'Поле обязательное для ввода',
				})}
				isInvalid={!!formState.errors.partner}
				errorMessage={formState.errors.partner?.message?.toString()}
			/>
		</div>
	);
}
