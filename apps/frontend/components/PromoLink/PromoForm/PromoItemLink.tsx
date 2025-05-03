'use client';

import Image from 'next/image';
import { Input } from '@heroui/input';
import { TPromoLink } from '@/data/allListPlatformsForPromoLink';

import { useFormContext } from 'react-hook-form';
import { TPromoForm } from './PromoForm';
export default function PromoItemLink({
	promoItem,
	idx,
}: {
	promoItem: TPromoLink;
	idx: number;
}) {
	const { register, formState } = useFormContext<TPromoForm>();

	return (
		<div className='mt-0 flex items-center w-full'>
			<Input
				placeholder='Ссылка на релиз'
				startContent={
					<Image
						src={promoItem.icon}
						width={42}
						height={42}
						alt={promoItem.name}
						className='border-r-2 pr-5 mx-1 w-12 border-zinc-700'
					/>
				}
				size='lg'
				{...register(`links.${idx}.link`, {
					required:
						'Ссылка не може быть пустой, либо заполните, либо удалите поле',
				})}
				isInvalid={
					formState.errors.links && !!formState.errors.links[idx]?.link?.message
				}
				errorMessage={
					formState.errors.links && formState.errors.links[idx]?.link?.message
				}
			/>
		</div>
	);
}
