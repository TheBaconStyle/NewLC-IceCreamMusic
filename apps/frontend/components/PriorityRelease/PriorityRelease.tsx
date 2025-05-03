'use client';
import { Button } from '@heroui/button';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { TPriorityRelease } from './TPriorityRelease';
import MainInfoPeopleRelease from './MainInfoPeopleRelease/MainInfoPeopleRelease';
import Link from 'next/link';
import ReleaseInfo from './ReleaseInfo/ReleaseInfo';
import ArtistInfo from './ArtistInfo/ArtistInfo';
import AdditionalInfo from './AdditionalInfo/AdditionalInfo';
export default function PriorityRelease() {
	const methods = useForm<TPriorityRelease>({
		mode: 'onSubmit',
		defaultValues: {
			label: 'ICECREAMMUSIC',
			socialLinks: [],
		},
	});
	const { handleSubmit } = methods;

	const onSubmit: SubmitHandler<TPriorityRelease> = (data) => {
		console.log(data);
	};

	return (
		<FormProvider {...methods}>
			<div className='flex gap-10 w-full max-w-none lg:max-w-7xl '>
				<form
					className='w-full flex flex-col gap-5'
					onSubmit={handleSubmit(onSubmit)}>
					<div id='MainInfoPeopleRelease' className='scroll-mt-96'>
						<MainInfoPeopleRelease />
					</div>
					<div id='ReleaseTrackInfo' className='scroll-mt-24'>
						<ReleaseInfo />
					</div>
					<div id='ArtistInfo' className='scroll-mt-24'>
						<ArtistInfo />
					</div>
					<div id='AdditionalInfo'>
						<AdditionalInfo />
					</div>
					<div className='bg-zinc-900 rounded-xl p-5 flex flex-col gap-4 w-full'>
						После заполнения формы проверьте актуальность ссылок на фотографии
						исполнителя и на прослушивание релиза. Иметь доступ к материалам по
						ссылкам должны все, у кого есть данные ссылки без дополнительного
						запроса на просмотр. Корректность заполнения формы напрямую может
						сказаться на поддержке вашего релиза.
					</div>
					<Button className='w-fit bg-indigo-700 mx-auto p-6' type='submit'>
						Отправить
					</Button>
				</form>
				<div className='hidden lg:block lg:relative lg:w-96'>
					<div className='fixed bg-zinc-900 p-5 rounded-xl '>
						<p className='mb-1 font-extrabold text-lg'>Навигация по форме</p>
						<ul>
							<li>
								<Link
									href={'#MainInfoPeopleRelease'}
									className='hover:text-indigo-300'>
									Общая информация
								</Link>
							</li>
							<li>
								<Link
									href={'#ReleaseTrackInfo'}
									className='hover:text-indigo-300'>
									Информация о релизе и треке
								</Link>
							</li>
							<li>
								<Link href={'#ArtistInfo'} className='hover:text-indigo-300'>
									Информация об артисте
								</Link>
							</li>
							<li>
								<Link
									href={'#AdditionalInfo'}
									className='hover:text-indigo-300'>
									Дополнительная информация
								</Link>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</FormProvider>
	);
}
