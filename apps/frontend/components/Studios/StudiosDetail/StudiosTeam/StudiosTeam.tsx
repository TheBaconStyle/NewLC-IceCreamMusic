import Image from 'next/image';
import { TStudiosTeam } from './StudiosTeam.props';

export default function StudiosTeam({ people, losung }: TStudiosTeam) {
	return (
		<div>
			<div className='max-w-7xl '>
				<div className='mx-auto max-w-2xl lg:mx-0'>
					<h2 className='text-4xl font-semibold tracking-tight text-pretty text-white sm:text-5xl'>
						Наша команда
					</h2>
					<p className='mt-6 text-lg/8 text-gray-300'>{losung}</p>
				</div>
				<ul
					role='list'
					className='mx-auto mt-12 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 xl:grid-cols-4'>
					{people.map((person) => (
						<li key={person.name}>
							<Image
								width={500}
								height={500}
								alt=''
								src={`${person.imageUrl}`}
								className='aspect-14/13 w-full rounded-2xl object-cover'
							/>
							<h3 className='mt-6 text-lg/8 font-semibold tracking-tight text-white'>
								{person.name}
							</h3>
							<p className='text-base/7 text-gray-300'>{person.role}</p>
							<p className='text-sm/6 text-gray-500'>{person.location}</p>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}
