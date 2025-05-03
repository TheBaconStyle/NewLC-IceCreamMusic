'use client';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import { TPromotionCard } from './PromotionCard.props';
import { Button } from '@heroui/button';
import MoneyFormatter from '@/utils/moneyFormatter';
import Image from 'next/image';
import { useDisclosure } from '@heroui/modal';
import PromotionalModal from './PromotionModal/PromotionalModal';
export default function PromotionCard({
	title,
	imageCard,
	advantages,
	price,
}: TPromotionCard) {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	return (
		<div className=' bg-zinc-900 relative rounded-3xl'>
			<div
				className={`flex relative p-5 flex-col justify-between h-[250px]  bg-cover bg-center rounded-t-3xl`}>
				<Image
					src={imageCard}
					alt='i'
					width={500}
					height={500}
					className='absolute w-full h-full object-cover left-0 top-0 rounded-t-3xl'
				/>
			</div>
			<div className='px-5 pt-4 pb-20  flex flex-col justify-between'>
				<p className='text-2xl font-bold  z-20  text-white'>{title}</p>
				<ul>
					{advantages.map((advantage) => (
						<li className='flex gap-2 text-sm' key={advantage}>
							<CheckCircleIcon width={23} color='rgb(34 197 94)' />
							{advantage}
						</li>
					))}
				</ul>{' '}
				<Button
					className='w-[calc(100%-32px)] mt-5 absolute left-4 bottom-4'
					onPress={onOpen}>
					Оформить за {MoneyFormatter(price)}
				</Button>
				<PromotionalModal isOpenProp={isOpen} onOpenChangeProp={onOpenChange} />
			</div>
		</div>
	);
}
