export default function DateFormatter(date: Date) {
	const formatter = new Intl.DateTimeFormat('ru');
	return formatter.format(date);
}
