export type TPriorityRelease = {
	email: string;
	partner: string;
	artist: string;
	artistCountryOfBitrth: string;
	relize_title: string;
	relize_date: Date;
	genre: string;
	format: 'Single' | 'EP' | 'Album' | 'Music Video';
	language: string;
	UPC: string;
	mainTrackTitle: string;
	videoLink: string;
	label: string;
	descriptionRelizeAndArtist: string;
	photoArtistLink: string;
	linkRelize: string;
	promotion: string;
	socialLinks: {
		nameSocial: string;
		link: string;
	}[];
};
