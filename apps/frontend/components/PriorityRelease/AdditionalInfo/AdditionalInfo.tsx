import { useFieldArray, useFormContext } from 'react-hook-form';
import { TPriorityRelease } from '../TPriorityRelease';
import { Input, Textarea } from '@heroui/input';
import { Select, SelectItem } from '@heroui/select';
import { allSocial } from '@/data/allSocial';
import Image from 'next/image';
import { Button } from '@heroui/button';
import {
	ChevronDownIcon,
	ChevronUpIcon,
	TrashIcon,
} from '@heroicons/react/24/outline';
import { Tooltip } from '@heroui/tooltip';

export default function AdditionalInfo() {
	const { register, formState, control, watch } =
		useFormContext<TPriorityRelease>();
	const { fields, append, remove, move } = useFieldArray({
		name: 'socialLinks',
		control,
	});

	const WSocial = watch('socialLinks');

	return (
		<div className='bg-zinc-900 rounded-xl p-5 flex flex-col gap-4 w-full'>
			<p className='mb-1 font-extrabold text-lg'>Дополнительная информация</p>{' '}
			<Textarea
				className='w-full'
				label={
					<div>
						Продвижение <span className='text-red-600'>*</span>
					</div>
				}
				minRows={5}
				labelPlacement='outside'
				placeholder='Описание'
				description='Опишите как и в какие сроки будет осуществляться продвижение релиза с вашей стороны. Какие ресурсы будут задействованы? Каков бюджет промо-кампании?'
				{...register('promotion', {
					required: 'Поле обязательное для ввода',
				})}
				isInvalid={!!formState.errors.promotion}
				errorMessage={formState.errors.promotion?.message?.toString()}
			/>
			{WSocial.map((socialItem, i) => (
				<div key={socialItem.nameSocial} className='flex gap-5 items-start'>
					<div className='flex flex-row gap-2'>
						<Button
							isIconOnly
							disableAnimation={true}
							size='sm'
							className='w-fit'
							onPress={() => move(i, i !== 0 ? i - 1 : i)}>
							<ChevronUpIcon width={20} />
						</Button>
						<Button
							size='sm'
							disableAnimation={true}
							isIconOnly
							onPress={() => move(i, i + 1 !== WSocial.length ? i + 1 : i)}>
							<ChevronDownIcon width={20} />
						</Button>
					</div>
					<Input
						type='text'
						placeholder='https://'
						radius='sm'
						size='md'
						startContent={
							<Image
								src={
									allSocial.find(
										(si) => si.nameSocial === socialItem.nameSocial,
									)?.image ?? ''
								}
								width={20}
								height={20}
								alt={socialItem.nameSocial}
								className='mr-3'
							/>
						}
						{...register(`socialLinks.${i}.link`, {
							required: 'Поле обязательное для ввода',
						})}
						isInvalid={
							formState.errors.socialLinks &&
							!!formState.errors.socialLinks[i]?.link?.message
						}
						errorMessage={
							formState.errors.socialLinks &&
							formState.errors.socialLinks[i]?.link?.message
						}
					/>
					<Tooltip content={<div className='p-2'>Удалить ссылку</div>}>
						<Button
							isIconOnly
							className=' ml-2 mr-1'
							color='danger'
							onPress={() => {
								remove(i);
							}}>
							<TrashIcon width='20px' />
						</Button>
					</Tooltip>
				</div>
			))}
			<Select
				label='Добавить новую ccылку'
				labelPlacement='outside'
				placeholder='Выберите дополнительную ссылку'
				size='lg'
				className='mt-6'
				selectedKeys={[]}
				onChange={(e) => append({ nameSocial: e.target.value, link: '' })}>
				{allSocial
					.filter((f) => {
						return !fields.some((s) => {
							return f.nameSocial === s.nameSocial;
						});
					})
					.map((s) => (
						<SelectItem key={s.nameSocial} textValue={s.nameSocial}>
							<div className='flex gap-5 items-center'>
								<Image
									src={s.image}
									alt={s.nameSocial}
									width={20}
									height={20}
								/>
								{s.nameSocial}
							</div>
						</SelectItem>
					))}
			</Select>
		</div>
	);
}
