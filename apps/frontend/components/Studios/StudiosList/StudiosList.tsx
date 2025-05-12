import StudiosCard from '../StudiosCard/StudiosCard';

export default function StudiosList() {
	return (
		<div className='grid grid-cols-5 gap-2'>
			<StudiosCard
				name={'Slatt Records'}
				preview={'logo.jpg'}
				rating={4.8}
				place={'Рижский пр., 13'}
			/>
			<StudiosCard
				name={'MOSCOWKA'}
				preview={'M2.png'}
				rating={4.65}
				place={'Дубнинская улица, 61, подъезд 4'}
			/>
		</div>
	);
}
