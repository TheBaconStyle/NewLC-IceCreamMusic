// 'use client';

// import { useContext } from 'react';
// import { AdminTableContext } from '@/providers/AdminTable.provider';
// import TopContent from './TopContent';
// import { Table, TableBody, TableColumn, TableHeader } from '@heroui/react';
// import { columnsData } from './TestData';

// export default function AdminTable() {
// 	const { activeColumns, search, activeStatus, showRows } =
// 		useContext(AdminTableContext);

// 	const setTableHeader = () => {
// 		const arrTableColumns = columnsData.filter((c) => {
// 			return [...activeColumns].includes(c.uid);
// 		});
// 	};

// 	return (
// 		<Table topContent={<TopContent />}>
// 			<TableHeader
// 				columns={
// 					columnsData.filter((c) => {
// 						return [...activeColumns].includes(c.uid);
// 					})
// 						? columnsData
// 						: columnsData
// 				}>
// 				{(column) => <TableColumn key={column.uid}>{column.name}</TableColumn>}
// 			</TableHeader>

// 			<TableBody emptyContent={'Нет данных для отображения'}></TableBody>
// 		</Table>
// 	);
// }
