import { News } from '@/components/News/list';
import NewsDetail from '@/components/News/NewsDetail/NewsDetail';
import { use } from 'react';

export default function NewsDetailPage({
	params,
}: {
	params: Promise<{ detail: string }>;
}) {
	const { detail } = use(params);
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
