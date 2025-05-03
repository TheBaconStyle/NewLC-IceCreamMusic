import { GlobeAltIcon } from '@heroicons/react/24/outline';
import { Button } from '@heroui/button';
import { Input } from '@heroui/input';
import { FaTelegram, FaViber, FaVk, FaWhatsapp } from 'react-icons/fa6';

export default function SocialData() {
	return (
		<div className='grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8'>
			<div>
				<h2 className='text-base/7 font-semibold text-white flex items-center gap-3'>
					<GlobeAltIcon className='w-9' />
					Cоциальные сети
				</h2>
				<p className='mt-1 text-sm/6 text-gray-400 '>
					Обновите свой список социальных сетей, чтобы мы могли связаться с Вами
				</p>
			</div>

			<form className='md:col-span-2'>
				<div className='grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6'>
					<Input
						className='col-span-full'
						label='ВКонтакте'
						startContent={<FaVk />}
						labelPlacement={'outside'}
						placeholder='Ссылка на VK страничку'
						type='text'
						radius='sm'
					/>
					<Input
						className='col-span-full'
						label='Telegramm'
						startContent={<FaTelegram />}
						labelPlacement={'outside'}
						placeholder='Ссылка на Telegramm или Nickname (@Example)'
						type='text'
						radius='sm'
					/>
					<Input
						className='col-span-full'
						label='Whatsapp'
						labelPlacement={'outside'}
						placeholder='Введите номер телефона'
						startContent={<FaWhatsapp />}
						type='text'
						radius='sm'
					/>
					<Input
						className='col-span-full'
						label='Viber'
						labelPlacement={'outside'}
						placeholder='Введите номер телефона'
						startContent={<FaViber />}
						type='text'
						radius='sm'
					/>
				</div>

				<Button className='mt-8 flex bg-indigo-700 text-white shadow-lg hover:bg-indigo-800'>
					Сохранить
				</Button>
			</form>
		</div>
	);
}
