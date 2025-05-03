import AdminTableProvider from '@/providers/AdminTable.provider';

import AdminTable from './AdminTable';

export default function AdminTableWrapper() {
	return (
		<AdminTableProvider>
			<AdminTable />
		</AdminTableProvider>
	);
}
