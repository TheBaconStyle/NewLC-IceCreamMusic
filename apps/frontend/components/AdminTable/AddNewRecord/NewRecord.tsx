import { InformationCircleIcon } from '@heroicons/react/24/outline';
import { Button } from '@heroui/button';
import { Form } from '@heroui/form';
import { Input, Textarea } from '@heroui/input';
import { Tooltip } from '@heroui/tooltip';

export default function Record() {
	return (
		<Form>
			<Input
				label={
					<div className='flex items-center relative gap-1 right-0 z-50'>
						<p className='text-md'>Текст вопроса</p>
						<Tooltip
							size='md'
							content={
								<div className='max-w-xs p-3'>
									<p>Текст вопроса, который будет отображаться, на платформе</p>
								</div>
							}>
							<InformationCircleIcon
								width={18}
								className='hover:text-indigo-400'
							/>
						</Tooltip>
					</div>
				}
				labelPlacement='outside'
				placeholder='Введите вопрос'
				type='text'
			/>
			<Textarea
				isClearable
				minRows={10}
				className='w-full'
				label={
					<div className='flex items-center relative gap-1 right-0 z-50'>
						<p className='text-md'>Текст ответа</p>
						<Tooltip
							size='md'
							content={
								<div className='max-w-xs p-3'>
									<p>
										Ответ на вопрос, который будет отображаться, на платформе
									</p>
								</div>
							}>
							<InformationCircleIcon
								width={18}
								className='hover:text-indigo-400'
							/>
						</Tooltip>
					</div>
				}
				labelPlacement='outside'
				placeholder='Введите текст ответа'
			/>
			<Button className='bg-indigo-700'>Добавить</Button>
		</Form>
	);
}
