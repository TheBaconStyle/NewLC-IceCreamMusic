'use client';

import { createContext, PropsWithChildren, useState } from 'react';
import type { Key } from '@react-types/shared';

export type TAdminTableContext = {
	search: string;
	setSearch: (state: string) => void;

	activeStatus: 'all' | Iterable<Key> | undefined;
	setActiveStatus: React.Dispatch<
		React.SetStateAction<'all' | Iterable<Key> | undefined>
	>;

	activeColumns: 'all' | Iterable<Key> | undefined;
	setActiveColumns: React.Dispatch<
		React.SetStateAction<'all' | Iterable<Key> | undefined>
	>;

	showRows: string;
	setShowRows: (state: string) => void;

	totalCount: number;
	setTotalCount: (state: number) => void;
};

export const AdminTableContext = createContext<TAdminTableContext>({
	search: '',
	setSearch: (state: string) => {},
	activeStatus: 'all',
	setActiveStatus: () => {},
	activeColumns: 'all',
	setActiveColumns: () => {},
	showRows: '10',
	setShowRows: () => {},
	totalCount: 0,
	setTotalCount: () => {},
});

export default function AdminTableProvider({ children }: PropsWithChildren) {
	const [search, setSearch] = useState<string>('');

	const [activeStatus, setActiveStatus] = useState<
		'all' | Iterable<Key> | undefined
	>('all');

	const [activeColumns, setActiveColumns] = useState<
		'all' | Iterable<Key> | undefined
	>('all');

	const [showRows, setShowRows] = useState<string>('10');
	const [totalCount, setTotalCount] = useState<number>(0);
	return (
		<AdminTableContext.Provider
			value={{
				search,
				setSearch,

				activeStatus,
				setActiveStatus,

				activeColumns,
				setActiveColumns,

				showRows,
				setShowRows,

				totalCount,
				setTotalCount,
			}}>
			{children}
		</AdminTableContext.Provider>
	);
}
