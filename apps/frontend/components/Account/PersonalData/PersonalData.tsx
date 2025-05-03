import { Input } from '@heroui/input';
import { Button } from '@heroui/button';
import { CameraIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
export default function PersonalData() {
	return (
		<div className='grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8'>
			<div>
				<h2 className='text-base/7 font-semibold text-white flex gap-3 items-center'>
					<UserGroupIcon className='w-9' />
					Персональные данные
				</h2>
				<p className='mt-1 text-sm/6 text-gray-400'>
					Используйте постоянный адрес, по которому вы можете получать
					электронные письма и письма об уведомлениях.
				</p>
			</div>

			<form className='md:col-span-2'>
				<div className='grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6'>
					<div className='col-span-full flex items-center gap-x-8'>
						<Image
							width={96}
							height={96}
							alt=''
							src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
							className='size-24 flex-none rounded-lg bg-gray-800 object-cover'
						/>
						<div>
							<Button color='default' radius='sm' size='md'>
								<CameraIcon className='w-4' />
								Сменить аватар
							</Button>
							<p className='mt-2 text-xs/5 text-gray-400'>
								JPG или PNG. 1MB Макс.
							</p>
						</div>
					</div>
					<Input
						className='sm:col-span-3'
						label='Имя'
						labelPlacement={'outside'}
						placeholder='Введите имя'
						type='text'
						radius='sm'
					/>
					<Input
						className='sm:col-span-3'
						label='Фамилия'
						labelPlacement={'outside'}
						placeholder='Введите имя'
						type='text'
						radius='sm'
					/>
					<Input
						className='col-span-full'
						label='E-mail'
						labelPlacement={'outside'}
						placeholder='Введите email / Логин'
						type='email'
						radius='sm'
					/>
					<Input
						className='col-span-full'
						label='Nickname'
						labelPlacement={'outside'}
						placeholder='Введите Nickname'
						type='text'
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
