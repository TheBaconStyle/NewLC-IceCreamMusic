import Link from 'next/link';

export default function VerificationComplete() {
	return (
		<div
			className={
				'text-white m-auto border-y-1 border-[#424242] w-full px-24 text-center relative'
			}>
			<div>Пароль к Вашей учетной записи успешно изменён!</div>
			<div>
				Вы можете <Link href='/signin'>войти</Link> в личный кабинет
			</div>
		</div>
	);
}
