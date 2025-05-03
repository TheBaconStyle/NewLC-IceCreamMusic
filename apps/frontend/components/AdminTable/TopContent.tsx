import { AdminTableContext } from '@/providers/AdminTable.provider';
import { capitalize } from '@/utils/capitalize';
import {
	ChevronDownIcon,
	MagnifyingGlassIcon,
	PlusIcon,
} from '@heroicons/react/24/outline';
import { Input } from '@heroui/input';
import {
	Button,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
	SharedSelection,
} from '@heroui/react';
import { useContext } from 'react';
import { columnsData, statusOptions } from './TestData';

export default function TopContent() {
	const {
		search,
		setSearch,
		activeStatus,
		setActiveStatus,
		activeColumns,
		setActiveColumns,
		showRows,
		setShowRows,
		totalCount,
	} = useContext(AdminTableContext);

	const handleSearch = (e: string) => {
		setSearch(e);
	};
	const handleClearSearch = () => {
		setSearch('');
	};

	const handleStatusChange = (e: SharedSelection) => {
		const sharedElementExists = statusOptions.every((status) =>
			[...e].includes(status.uid),
		);
		sharedElementExists ? setActiveStatus('all') : setActiveStatus(e);
	};

	const handleColumnsChange = (e: SharedSelection) => {
		const sharedElementExists = columnsData.every((column) =>
			[...e].includes(column.uid),
		);
		sharedElementExists ? setActiveColumns('all') : setActiveColumns(e);
	};

	return (
		<div className='flex flex-col gap-4'>
			<div className='flex justify-between gap-3 items-end'>
				<Input
					isClearable
					onClear={handleClearSearch}
					className='w-full sm:max-w-[44%]'
					placeholder='Поиск'
					startContent={<MagnifyingGlassIcon className='w-4' />}
					onChange={(e) => {
						handleSearch(e.currentTarget.value);
					}}
					value={search}
				/>
				<div className='flex gap-3'>
					<Dropdown>
						<DropdownTrigger className='hidden sm:flex'>
							<Button
								endContent={<ChevronDownIcon className='text-small w-4' />}
								variant='flat'>
								Статус
							</Button>
						</DropdownTrigger>
						<DropdownMenu
							disallowEmptySelection
							aria-label='Table Columns'
							closeOnSelect={false}
							selectionMode='multiple'
							selectedKeys={activeStatus}
							onSelectionChange={(e) => {
								handleStatusChange(e);
							}}>
							{statusOptions.map((status) => (
								<DropdownItem key={status.uid} className='capitalize'>
									{capitalize(status.name)}
								</DropdownItem>
							))}
						</DropdownMenu>
					</Dropdown>
					<Dropdown>
						<DropdownTrigger className='hidden sm:flex'>
							<Button
								endContent={<ChevronDownIcon className='text-small w-4' />}
								variant='flat'>
								Колонки
							</Button>
						</DropdownTrigger>
						<DropdownMenu
							disallowEmptySelection
							aria-label='Table Columns'
							closeOnSelect={false}
							selectionMode='multiple'
							selectedKeys={activeColumns}
							onSelectionChange={(e) => {
								handleColumnsChange(e);
							}}>
							{columnsData.map((column) => (
								<DropdownItem key={column.uid} className='capitalize'>
									{capitalize(column.name)}
								</DropdownItem>
							))}
						</DropdownMenu>
					</Dropdown>
					<Button color='primary' endContent={<PlusIcon className='w-4' />}>
						Добавить
					</Button>
				</div>
			</div>
			<div className='flex justify-between items-center'>
				<span className='text-default-400 text-small'>
					Количество записей: {totalCount}
				</span>
				<label className='flex items-center text-default-400 text-small'>
					Количество строк:
					<select
						className='bg-transparent outline-none text-default-400 text-small'
						value={showRows}
						onChange={(e) => {
							setShowRows(e.currentTarget.value);
						}}>
						<option value='5'>5</option>
						<option value='10'>10</option>
						<option value='15'>15</option>
						<option value='25'>25</option>
						<option value='50'>50</option>
						<option value='100'>100</option>
					</select>
				</label>
			</div>
		</div>
	);
}
