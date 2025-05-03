'use client';
import { useDisclosure } from '@heroui/modal';
import { TMenu } from '../SideBar.links';
import clsx from 'clsx';
import ChatModal from '../../ModalChat/ModalChat';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { Chip } from '@heroui/chip';

export default function SideBarBody({ menu }: { menu: TMenu[] }) {
	const [subMenu, setSubMenu] = useState<string[]>([]);
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const path = usePathname();
	const router = useRouter();

	return (
		<div>
			<ul role='list' className='-mx-2 justify-between space-y-1'>
				{menu.map((item) => (
					<li key={item.name}>
						<button
							onClick={(e) => {
								if (item.name === 'Поддержка') {
									e.preventDefault();
									onOpen();
								} else {
									if (item.subMenu) {
										e.preventDefault();
										if (subMenu.includes(item.name)) {
											setSubMenu(subMenu.filter((el) => el !== item.name));
										} else if (item.subMenu) {
											setSubMenu([...subMenu, item.name]);
										}
									} else {
										item.href && router.push(item.href);
									}
								}
							}}
							className={clsx(
								item.href && item.href.includes(path.split('/')[2])
									? 'bg-indigo-700 text-white'
									: 'text-indigo-200 hover:bg-indigo-700 hover:text-white',
								'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold w-full',
							)}>
							<item.icon
								aria-hidden='true'
								className={clsx(
									item.href
										? 'text-white'
										: 'text-indigo-200 group-hover:text-white',
									'size-6 shrink-0',
								)}
							/>
							{item.name}
							{item.comming && (
								<Chip
									className='ml-auto border-[#f31260]'
									color='danger'
									size='md'
									radius='md'
									variant='dot'>
									Скоро
								</Chip>
							)}
						</button>
						{item.subMenu && subMenu.includes(item.name) && (
							<div className='pl-10 relative after:absolute after:w-[2px] after:h-full after:bg-zinc-600 after:top-0 after:left-5'>
								<SideBarBody menu={item.subMenu} />
							</div>
						)}
					</li>
				))}
			</ul>
			<ChatModal isOpenProp={isOpen} onOpenChangeProp={onOpenChange} />
		</div>
	);
}
