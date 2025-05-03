export type TColumnsData = {
	name: string;
	uid: string;
	sortable?: boolean;
};

export const columnsData: TColumnsData[] = [
	{ name: 'ID', uid: 'id', sortable: true },
	{ name: 'NAME', uid: 'name', sortable: true },
	{ name: 'AGE', uid: 'age', sortable: true },
	{ name: 'ROLE', uid: 'role', sortable: true },
	{ name: 'TEAM', uid: 'team' },
	{ name: 'EMAIL', uid: 'email' },
	{ name: 'STATUS', uid: 'status', sortable: true },
	{ name: 'ACTIONS', uid: 'actions' },
];

export type TStatusOptions = {
	name: string;
	uid: string;
};

export const statusOptions: TStatusOptions[] = [
	{ name: 'Активные', uid: 'active' },
	{ name: 'Черновик', uid: 'paused' },
	{ name: 'Не активнаые', uid: 'vacation' },
];
