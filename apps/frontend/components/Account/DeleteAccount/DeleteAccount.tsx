import { TrashIcon } from '@heroicons/react/24/outline';
import { Button } from '@heroui/button';
export default function DeleteAccount() {
	return (
		<div className='grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8'>
			<div>
				<h2 className='text-base/7 font-semibold text-white flex items-center gap-3'>
					<TrashIcon className='w-9' />
					Удалить аккаунт
				</h2>
				<p className='mt-2 text-sm/6 text-gray-400'>
					Вы больше не хотите пользоваться нашим сервисом? Вы можете удалить
					свою учетную запись здесь. Это действие необратимо. Вся информация,
					относящаяся к этой учетной записи, будет удалена безвозвратно.
				</p>
			</div>

			<form className='flex items-start md:col-span-2'>
				<Button
					type='submit'
					className='rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-400'>
					Да, удалить мой аккаунт
				</Button>
			</form>
		</div>
	);
}
