export default function WrongToken() {
	return (
		<div
			className={
				'text-white m-auto border-y-1 border-[#424242] w-full px-24 text-center relative'
			}>
			Время действия ссылки-подтверждения истекло,
			<br /> либо ссылка содержит неверный токен. Попробуйте повторить операцию.
		</div>
	);
}
