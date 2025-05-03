const dateOptions: Intl.DateTimeFormatOptions = {
	year: 'numeric',
	month: 'numeric',
	day: 'numeric',
};

const timeOptions: Intl.DateTimeFormatOptions = {
	hour: 'numeric',
	minute: 'numeric',
	second: 'numeric',
	hourCycle: 'h23',
};

export default function dateISOFormatter(date: Date): string {
	const formattedDate = new Intl.DateTimeFormat('en-ca', dateOptions).format(
		date,
	);
	const formattedTime = new Intl.DateTimeFormat('en-ca', timeOptions).format(
		date,
	);
	return `${formattedDate}T${formattedTime}Z`;
}
