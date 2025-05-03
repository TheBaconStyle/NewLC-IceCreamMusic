import { allPromotion } from '@/data/allPromotion';
import PromotionCard from './PromotionCard/PromotionCard';

export default function PromotionList() {
	return (
		<div className='grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
			{allPromotion.map((promotion) => (
				<PromotionCard
					key={promotion.title}
					title={promotion.title}
					imageCard={promotion.imageCard}
					price={promotion.price}
					advantages={promotion.advantages}
				/>
			))}
		</div>
	);
}
