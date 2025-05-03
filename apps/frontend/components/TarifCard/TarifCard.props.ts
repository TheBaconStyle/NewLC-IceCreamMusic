export type TTarifCard = {
	subtitle: string;
	title: string;
	description: string;
	videoSrc?: string;
	listAdvantage: string[];
	price: number;
	buyLink: string;
	linkDetail: string;
	detail: string;
	detailImage: string;
};

export type TTarifItem = {
	tarifItem: TTarifCard;
};
