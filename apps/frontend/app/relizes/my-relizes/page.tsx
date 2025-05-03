import RelizecCard from '@/components/Relizes/RelizesCard';
import Image from 'next/image';

export default function MyRelizesPage() {
	return (
		<div className='flex flex-col gap-5 max-w-7xl'>
			<RelizecCard />
		</div>
	);
}
