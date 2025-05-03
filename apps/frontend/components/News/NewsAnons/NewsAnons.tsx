import Link from 'next/link';
import { TNewsAnonsItem } from './NewsAnons.props';

export default function NewsAnons({ item }: TNewsAnonsItem) {
	const { id, title, image } = item;

	return (
		<Link href={'/main/news/' + id}>
			<div
				className={`relative  w-full min-h-52 md:min-h-96 bg-zinc-900 rounded-2xl  bg-no-repeat bg-cover bg-center cursor-pointer  transition-all hover:scale-95`}
				style={{
					backgroundImage: `url("${image}")`,
				}}>
				<div className='absolute top-5 left-5 '>
					<p className='font-extrabold text-xl inline-block'>{title}</p>
				</div>
			</div>
		</Link>
	);
}
