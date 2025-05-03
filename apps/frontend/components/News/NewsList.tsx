import clsx from 'clsx';
import { News } from './list';
import NewsAnons from './NewsAnons/NewsAnons';

export default function NewsList() {
	return (
		<div className='grid  gap-x-5 gap-y-5 grid-cols-1 md:grid-cols-4'>
			{News.map((n, idx) => (
				<div key={n.id} className={clsx('', idx % 6 === 0 && 'md:col-span-3')}>
					<NewsAnons item={n} />
				</div>
			))}
		</div>
	);
}
