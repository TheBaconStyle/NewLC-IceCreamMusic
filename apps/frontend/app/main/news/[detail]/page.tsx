import { News } from '@/components/News/list';
import NewsDetail from '@/components/News/NewsDetail/NewsDetail';

export default async function NewsDetailPage({
	params,
}: {
	params: { detail: string };
}) {
	const { detail } = await params;
	const detailItem = News.filter((e) => e.id === detail)[0];

	return (
		<>
			<NewsDetail
				id={detailItem.id}
				title={detailItem.title}
				image={detailItem.image}
				description={detailItem.description}
				date={detailItem.date}
				tags={detailItem.tags}
			/>
		</>
	);
}
