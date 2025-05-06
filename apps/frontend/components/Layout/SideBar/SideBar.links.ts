export type TMenu = {
	name: string;
	href?: string;
	icon: string;
	subMenu?: TMenu[];
	comming?: boolean;
};

export const navigation: TMenu[] = [
	{
		name: 'Новости',
		href: '/main/news/',
		icon: 'heroicons:newspaper',
	},
	{
		name: 'Ваша музыка',
		icon: 'heroicons:musical-note',
		subMenu: [
			{
				name: 'Мои релизы',
				href: '/relizes/my-relizes',
				icon: 'heroicons:wallet',
			},
			{
				name: 'Новый релиз',
				href: '/relizes/new-relize',
				icon: 'heroicons:folder',
			},
		],
	},
	{
		name: 'Маркетинг',
		icon: 'heroicons:sparkles',
		subMenu: [
			{
				name: 'Промо ссылки',
				href: '/marketing/promo-links/',
				icon: 'heroicons:link',
			},
			{
				name: 'Приоритетный релиз',
				href: '/marketing/priority-release/',
				icon: 'heroicons:arrow-right-start-on-rectangle',
			},
			{
				name: 'Масспостинг',
				href: '/marketing/massposting',
				icon: 'heroicons:chart-bar-square',
			},
			{
				name: 'Продвижение',
				href: '/marketing/promotion',
				icon: 'heroicons:arrow-trending-up',
			},
		],
	},
	{ name: 'Студии', href: '/studios/', icon: 'heroicons:map' },
	{ name: 'Аналитика', href: '#', icon: 'heroicons:chart-pie', comming: true },
	{
		name: 'FAQ',
		href: '/main/faq/',
		icon: 'heroicons:question-mark-circle',
	},
	{
		name: 'Маркет битов',
		href: '#',
		icon: 'heroicons:building-storefront',
		comming: true,
	},
	{
		name: 'Аккаунт',
		icon: 'heroicons:shield-exclamation',
		subMenu: [
			{
				name: 'Профиль',
				href: '/account/profile/',
				icon: 'heroicons:user',
			},
			{
				name: 'Верификация',
				href: '/account/verification',
				icon: 'heroicons:check-circle',
			},
		],
	},

	{
		name: 'Поддержка',
		href: '#',
		icon: 'heroicons:chat-bubble-left-right',
	},
	{
		name: 'Тарифы',
		href: '/plans/',
		icon: 'heroicons:star',
	},
];
