import { Checkbox } from '@heroui/checkbox';
export default function AdditionalParams() {
	return (
		<div className='bg-zinc-900 rounded-xl p-5 w-full'>
			<p className='mb-1 font-extrabold text-lg'>Дополнительные настройки</p>
			<Checkbox className='mt-1' color='default'>
				Ранний старт в России
			</Checkbox>
			<p className='mt-1 max-w-lg text-sm text-foreground-400'>
				Релиз откроется в России на день раньше всех остальных стран. Это
				позволит избежать раннего открытия релиза на других территориях из-за
				разницы в часовых поясах.
			</p>
			<Checkbox className='mt-1' color='default'>
				Доставка в реальном времени
			</Checkbox>
			<p className='mt-1 max-w-lg text-sm text-foreground-400'>
				Релиз будет доставлен на площадки сразу после прохождения модерации.
			</p>
		</div>
	);
}
