import { listFAQList } from '../FAQ.list';
import FAQItem from '../FAQItem/FAQItem';

export default function FAQList() {
	return (
		<div className='grid grid-cols-3 gap-3 medium:grid-cols-2 mobile:grid-cols-1'>
			{listFAQList.map((item) => (
				<FAQItem key={item.question} FAQItem={item} />
			))}
		</div>
	);
}
