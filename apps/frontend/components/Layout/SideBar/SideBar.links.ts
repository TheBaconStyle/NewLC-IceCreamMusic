import {
	FolderIcon,
	ChartPieIcon,
	NewspaperIcon,
	ChatBubbleLeftRightIcon,
	ChartBarSquareIcon,
	WalletIcon,
	QuestionMarkCircleIcon,
	CheckCircleIcon,
	MusicalNoteIcon,
	UserIcon,
	StarIcon,
	BuildingStorefrontIcon,
	ArrowTrendingUpIcon,
	ShieldExclamationIcon,
	LinkIcon,
	SparklesIcon,
	MapIcon,
	ArrowRightStartOnRectangleIcon,
} from '@heroicons/react/24/outline';

export type TMenu = {
	name: string;
	href?: string;
	icon: React.ForwardRefExoticComponent<
		React.PropsWithoutRef<React.SVGProps<SVGSVGElement>>
	>;
	subMenu?: TMenu[];
	comming?: boolean;
};

export const navigation: TMenu[] = [
	{ name: 'Новости', href: '/main/news/', icon: NewspaperIcon },
	{
		name: 'Ваша музыка',
		icon: MusicalNoteIcon,

		subMenu: [
			{
				name: 'Мои релизы',
				href: '/relizes/my-relizes',
				icon: WalletIcon,
			},
			{
				name: 'Новый релиз',
				href: '/relizes/new-relize',
				icon: FolderIcon,
			},
		],
	},
	{
		name: 'Маркетинг',
		icon: SparklesIcon,
		subMenu: [
			{
				name: 'Промо ссылки',
				href: '/marketing/promo-links/',
				icon: LinkIcon,
			},
			{
				name: 'Приоритетный релиз',
				href: '/marketing/priority-release/',
				icon: ArrowRightStartOnRectangleIcon,
			},
			{
				name: 'Масспостинг',
				href: '/marketing/massposting',
				icon: ChartBarSquareIcon,
			},
			{
				name: 'Продвижение',
				href: '/marketing/promotion',
				icon: ArrowTrendingUpIcon,
			},
		],
	},
	{ name: 'Студии', href: '/studios/', icon: MapIcon },
	{ name: 'Аналитика', href: '#', icon: ChartPieIcon, comming: true },
	{
		name: 'FAQ',
		href: '/main/faq/',
		icon: QuestionMarkCircleIcon,
	},

	{
		name: 'Маркет битов',
		href: '#',
		icon: BuildingStorefrontIcon,
		comming: true,
	},
	{
		name: 'Аккаунт',

		icon: ShieldExclamationIcon,
		subMenu: [
			{
				name: 'Профиль',
				href: '/account/profile/',
				icon: UserIcon,
			},
			{
				name: 'Верификация',
				href: '/account/verification',
				icon: CheckCircleIcon,
			},
		],
	},

	{
		name: 'Поддержка',
		href: '#',
		icon: ChatBubbleLeftRightIcon,
	},
	{
		name: 'Тарифы',
		href: '/plans/',
		icon: StarIcon,
	},
];
