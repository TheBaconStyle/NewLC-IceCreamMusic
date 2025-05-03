'use client';
import { TReleaseInsertForm } from '@/schema/release.schema';
import { cn } from '@/utils/cn';
import { useFormContext } from 'react-hook-form';

export default function CheckRelizeForm() {
	const { formState } = useFormContext<TReleaseInsertForm>();

	return (
		<div>
			<div
				className={cn(
					'w-full  bg-zinc-500 p-5 bg-red-500 rounded-xl',
					formState.isValid && 'bg-green-600',
				)}>
				{formState.isValid ? (
					<p className='text-lg'>
						Форма заполненна корректна и готова к отправке
					</p>
				) : (
					<>
						<p className='text-lg'>
							В форме присутствуют обязательные поля, которые вы пропустили:{' '}
						</p>
					</>
				)}
			</div>
		</div>
	);
}
