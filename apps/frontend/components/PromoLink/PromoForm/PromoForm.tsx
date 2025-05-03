'use client';
import Image from 'next/image';
import {
	PlusIcon,
	ChevronUpIcon,
	ChevronDownIcon,
} from '@heroicons/react/24/outline';

import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	useDisclosure,
	Select,
	SelectItem,
	Input,
} from '@heroui/react';

import { allListPlatformsForPromoLink } from '@/data/allListPlatformsForPromoLink';
import PromoItemLink from './PromoItemLink';
import {
	SubmitHandler,
	useForm,
	FormProvider,
	useFieldArray,
} from 'react-hook-form';

export type TPromoForm = {
	promolink: string;
	theme: string;
	links: {
		platform: string;
		link: string;
	}[];
};
import { TrashIcon } from '@heroicons/react/24/outline';
import { Button } from '@heroui/button';
import { Tooltip } from '@heroui/tooltip';

export default function PromoForm() {
	const methods = useForm<TPromoForm>({
		defaultValues: {
			links: [],
		},
		mode: 'onChange',
	});
	const { register, handleSubmit, control, watch, formState } = methods;

	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	const { fields, append, remove, move } = useFieldArray({
		control,
		name: 'links' as const, // unique name for your Field Array
	});

	const onSubmit: SubmitHandler<TPromoForm> = (data) => {
		console.log(data);
	};

	const WatchLinks = watch('links');

	return (
		<>
			<Button isIconOnly onPress={onOpen}>
				<PlusIcon width={20} />
			</Button>
			<Modal
				backdrop={'blur'}
				isOpen={isOpen}
				onOpenChange={onOpenChange}
				scrollBehavior={'outside'}
				placement={'bottom'}
				size='4xl'>
				<ModalContent>
					{(onClose) => (
						<div>
							<ModalHeader className='flex flex-col gap-1'>
								Cоздать промо-ссылку
							</ModalHeader>
							<FormProvider {...methods}>
								<form onSubmit={handleSubmit(onSubmit)}>
									<ModalBody>
										<Input
											label='Наименование короткой ссылки'
											labelPlacement='outside'
											size='lg'
											startContent={
												<div className='-mr-1 text-foreground-400'>
													icecreammusic.link/
												</div>
											}
											isClearable
											{...register('promolink', {
												required: 'Обязательное поле',
											})}
											isInvalid={!!formState.errors.promolink}
											errorMessage={formState.errors.promolink?.message}
										/>
										<Select
											label='Тема оформления'
											labelPlacement='outside'
											placeholder='Выберите тему'
											size='lg'
											defaultSelectedKeys={['dark']}
											{...register('theme', { required: `Обязательное поле` })}
											isInvalid={!!formState.errors.theme}
											errorMessage={formState.errors.theme?.message}>
											<SelectItem key={'dark'}>Темная</SelectItem>
											<SelectItem key={'light'}>Светлая</SelectItem>
										</Select>
										{WatchLinks.length > 0 && (
											<div className='w-full'>
												<p>Список площадок</p>
												<div className='flex flex-col w-full gap-3'>
													{WatchLinks.map((promoItem, i) => (
														<div
															key={promoItem.platform}
															className='flex gap-5 items-start'>
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
																	onPress={() =>
																		move(
																			i,
																			i + 1 !== WatchLinks.length ? i + 1 : i,
																		)
																	}>
																	<ChevronDownIcon width={20} />
																</Button>
															</div>
															<PromoItemLink
																idx={i}
																promoItem={{
																	name: promoItem.platform,
																	icon:
																		allListPlatformsForPromoLink.find(
																			(p) => p.name === promoItem.platform,
																		)?.icon ?? '',
																}}
															/>
															<Tooltip
																content={
																	<div className='p-2'>Удалить ссылку</div>
																}>
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
												</div>
											</div>
										)}

										<Select
											label='Добавить новую площадку'
											labelPlacement='outside'
											placeholder='Выберите дополнительную площадку'
											size='lg'
											className='mt-6'
											selectedKeys={[]}
											onChange={(e) =>
												append({ platform: e.target.value, link: '' })
											}>
											{allListPlatformsForPromoLink
												.filter((f) => {
													return !fields.some((s) => {
														return f.name === s.platform;
													});
												})
												.map((p) => (
													<SelectItem key={p.name} textValue={p.name}>
														<div className='flex gap-5 items-center'>
															<Image
																src={p.icon}
																alt={p.name}
																width={20}
																height={20}
															/>
															{p.name}
														</div>
													</SelectItem>
												))}
										</Select>
									</ModalBody>
									<ModalFooter>
										<Button color='danger' variant='light' onPress={onClose}>
											Закрыть
										</Button>
										<Button type='submit' className='bg-indigo-700'>
											Добавить
										</Button>
									</ModalFooter>
								</form>
							</FormProvider>
						</div>
					)}
				</ModalContent>
			</Modal>
		</>
	);
}
