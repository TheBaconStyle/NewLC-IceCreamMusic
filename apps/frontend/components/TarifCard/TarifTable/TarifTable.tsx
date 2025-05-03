'use client';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import { ArrayTarifTable } from './TarifTable.props';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';

const TarifTable = () => {
	const path = usePathname();
	const lastPartOfPathState = path.split('/').pop();
	return (
		<div className='border-2 text-start border1 rounded-2xl tableTarif bg-zinc-900'>
			<div
				className='grid grid-cols-4 mobile:grid-cols-2 text-center  rounded-t-2xl
			 '>
				<p className='border-2 text-start border1 p-3 rounded-tl-2xl'></p>
				<p
					className={clsx(
						'border-2 text-center border1 p-3 font-extrabold',
						lastPartOfPathState !== 'detroid' && 'mobile:hidden',
					)}>
					Стандарт
				</p>
				<p
					className={clsx(
						'border-2 text-center border1 p-3 font-extrabold',
						lastPartOfPathState !== 'enterprise' && 'mobile:hidden',
					)}>
					Энтерпрайз
				</p>
				<p
					className={clsx(
						'border-2 text-center border1 p-3 rounded-tr-2xl font-extrabold',
						lastPartOfPathState !== 'pro' && 'mobile:hidden',
					)}>
					PRO
				</p>
			</div>
			{ArrayTarifTable.map((t) => (
				<div
					key={t.aspect}
					className='grid grid-cols-4 mobile:grid-cols-2 rounded-b-2xl '>
					<p key={t.aspect} className='border-2 text-start border1 p-3 '>
						{t.aspect}
					</p>
					<p
						className={clsx(
							'text-center p-3 border-2 border1',
							lastPartOfPathState !== 'detroid' && 'mobile:hidden',
						)}>
						{typeof t.standart == 'string' ? (
							t.standart
						) : typeof t.standart == 'boolean' && t.standart ? (
							<CheckCircleIcon className='mx-auto' width={20} color='green' />
						) : (
							'-'
						)}
					</p>
					<p
						className={clsx(
							'text-center p-3 border-2 border1',
							lastPartOfPathState !== 'enterprise' && 'mobile:hidden',
						)}>
						{typeof t.enterprize == 'string' ? (
							t.enterprize
						) : typeof t.enterprize == 'boolean' && t.enterprize ? (
							<CheckCircleIcon className='mx-auto' width={20} color='green' />
						) : (
							'-'
						)}
					</p>
					<p
						className={clsx(
							'text-center p-3 border-2 border1 ',
							lastPartOfPathState !== 'pro' && 'mobile:hidden',
						)}>
						{typeof t.pro == 'string' ? (
							t.pro
						) : typeof t.pro == 'boolean' && t.pro ? (
							<CheckCircleIcon className='mx-auto' width={20} color='green' />
						) : (
							'-'
						)}
					</p>
				</div>
			))}
		</div>
	);
};

export default TarifTable;
