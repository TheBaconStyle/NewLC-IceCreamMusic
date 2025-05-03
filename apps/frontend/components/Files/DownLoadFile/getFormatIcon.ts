export default function getIcon(link: string) {
	return link.toUpperCase().split('/').pop()?.split('.')[1];
}
