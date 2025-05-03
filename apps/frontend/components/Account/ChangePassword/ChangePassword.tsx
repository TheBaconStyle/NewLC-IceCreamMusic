import { ShieldCheckIcon } from '@heroicons/react/24/outline';
import { Button } from '@heroui/button';
import { Input } from '@heroui/input';

export default function ChangePassword() {
	return (
		<div className='grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8'>
			<div>
				<h2 className='text-base/7 font-semibold text-white flex items-center gap-3'>
					<ShieldCheckIcon className='w-9' />
					Смена пароля
				</h2>
				<p className='mt-1 text-sm/6 text-gray-400 '>
					Обновите свой пароль, связанный с вашей учетной записью
				</p>
			</div>

			<form className='md:col-span-2'>
				<div className='grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6'>
					<Input
						className='col-span-full'
						label='Действующий пароль'
						labelPlacement={'outside'}
						placeholder='Введите действующий пароль'
						type='password'
						radius='sm'
					/>
					<Input
						className='col-span-full'
						label='Новый пароль'
						labelPlacement={'outside'}
						placeholder='Введите новый пароль'
						type='password'
						radius='sm'
					/>
					<Input
						className='col-span-full'
						label='Подтвердите новый пароль'
						labelPlacement={'outside'}
						placeholder='Введите новый пароль'
						type='password'
						radius='sm'
					/>
				</div>

				<Button
					className='mt-8 flex bg-indigo-700 text-white shadow-lg hover:bg-indigo-800'
					radius='sm'
					size='md'>
					Сохранить
				</Button>
			</form>
		</div>
	);
}
