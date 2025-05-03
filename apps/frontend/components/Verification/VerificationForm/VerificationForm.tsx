'use client';
import { Input } from '@heroui/input';
import { DatePicker } from '@heroui/date-picker';
import { BsFillTelephoneFill } from 'react-icons/bs';
import { Checkbox } from '@heroui/checkbox';
import { Button } from '@heroui/button';
import { ChangeEvent, useState } from 'react';
import { Form } from '@heroui/form';
import { getLocalTimeZone, today } from '@internationalized/date';

export default function VerificationForm() {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const [submitted, setSubmitted] = useState<any>(null);

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const data = Object.fromEntries(new FormData(e.currentTarget));
		setSubmitted(data);
	};

	const [phone, setPhone] = useState('');

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		let value = e.target.value.replace(/\D/g, '');
		value = value.replace(
			/(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/,
			'+$1 ($2) $3-$4-$5',
		);
		setPhone(value);
	};

	return (
		<Form className='flex flex-col gap-5' onSubmit={onSubmit}>
			<div className='w-full'>
				<p className='font-semibold text-xl'>Основная информация</p>
				<p className='mt-1 text-xs'>
					Основные данные для создания драфта договора
				</p>
				<div className='mt-4 grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 gap-4'>
					<Input
						label='Фамилия'
						name='surname'
						labelPlacement={'outside'}
						placeholder='Введите фамилию'
						type='text'
						isRequired
						radius='sm'
						pattern='^[A-ZА-Я][a-zа-я]+$'
						errorMessage={({ validationDetails, validationErrors }) => {
							if (validationDetails.patternMismatch) {
								return 'Фамилия должна начинаться с заглавной буквы и не иметь цифр, спецсимволов';
							}
							return validationErrors;
						}}
					/>
					<Input
						label='Имя'
						name='name'
						labelPlacement={'outside'}
						placeholder='Введите имя'
						type='text'
						isRequired
						radius='sm'
						pattern='^[A-ZА-Я][a-zа-я]+$'
						errorMessage={({ validationDetails, validationErrors }) => {
							if (validationDetails.patternMismatch) {
								return 'Имя должно начинаться с заглавной буквы и не иметь цифр, спецсимволов';
							}
							return validationErrors;
						}}
					/>
					<Input
						label='Отчество'
						name='patronymic'
						labelPlacement={'outside'}
						placeholder='Введите отчество'
						type='text'
						radius='sm'
						pattern='^[A-ZА-Я][a-zа-я]+$'
						errorMessage={({ validationDetails, validationErrors }) => {
							if (validationDetails.patternMismatch) {
								return 'Отчество должно начинаться с заглавной буквы и не иметь цифр, спецсимволов';
							}
							return validationErrors;
						}}
					/>
					<DatePicker
						isRequired
						name='birthDay'
						label='Дата рождения'
						labelPlacement={'outside'}
						maxValue={today(getLocalTimeZone())}
						validate={(value) => {
							if (value.toDate(getLocalTimeZone()) > new Date()) {
								return 'Дата рождения не может быть больше текущей даты';
							}
						}}
						errorMessage={(value) => {
							if (!value.validationDetails.valid) {
								return 'Дата рождения не может быть больше текущей даты';
							}
						}}
					/>
					<Input
						label='Место рождения'
						name='borenPlace'
						labelPlacement={'outside'}
						placeholder='Введите место рождения'
						type='text'
						isRequired
						radius='sm'
					/>
					<Input
						label='Телефон'
						name='telephone'
						labelPlacement={'outside'}
						placeholder='Введите телефон'
						startContent={<BsFillTelephoneFill className='w-4' color='gray' />}
						type='text'
						maxLength={11}
						value={phone}
						onChange={(e) => handleChange(e)}
						isRequired
						radius='sm'
					/>
				</div>
			</div>
			<div className='w-full'>
				<p className='font-semibold text-xl'>Идентификационные данные</p>
				<p className='mt-1 text-xs max-w-3xl'>
					Паспортные данные гарантируют оригинальность материала и отсутствие
					нарушений со стороны артиста, а также гарантируют выплату средств и
					исполнение условий с нашей стороны.
				</p>
				<div className='mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
					<Input
						label='Серия паспорта'
						name='PassportSeries'
						labelPlacement={'outside'}
						placeholder='Введите серию'
						type='text'
						maxLength={4}
						isRequired
						radius='sm'
						pattern='[0-9]{4}'
						errorMessage={({ validationDetails, validationErrors }) => {
							if (validationDetails.patternMismatch) {
								return 'Серия должна состоять из 4 цифр';
							}
							return validationErrors;
						}}
					/>
					<Input
						label='Номер паспорта'
						name='PassportNumber'
						labelPlacement={'outside'}
						placeholder='Введите номер'
						type='text'
						maxLength={6}
						isRequired
						radius='sm'
						pattern='[0-9]{6}'
						errorMessage={({ validationDetails, validationErrors }) => {
							if (validationDetails.patternMismatch) {
								return 'Номер паспорта должен состоять из 6 цифр';
							}
							return validationErrors;
						}}
					/>
					<DatePicker
						name='getDate'
						isRequired
						label='Дата получения'
						labelPlacement={'outside'}
						validate={(value) => {
							if (value.toDate(getLocalTimeZone()) > new Date()) {
								return 'Дата получения не может быть больше текущей даты';
							}
						}}
						errorMessage={(value) => {
							if (!value.validationDetails.valid) {
								return 'Дата получения не может быть больше текущей даты';
							}
						}}
					/>
					<Input
						label='Кем выдан'
						name='whoGive'
						labelPlacement={'outside'}
						placeholder='Введите кем выдан'
						type='text'
						isRequired
						radius='sm'
					/>
					<Input
						label='Код подразделения'
						name='code'
						labelPlacement={'outside'}
						placeholder='Введите код подразделения'
						type='text'
						isRequired
						maxLength={6}
						pattern='[0-9]{6}'
						errorMessage={({ validationDetails, validationErrors }) => {
							if (validationDetails.patternMismatch) {
								return 'Код подразделения должен состоять из 6 цифр';
							}
							return validationErrors;
						}}
						radius='sm'
					/>
					<Input
						label='Адрес регистрации'
						name='registration'
						labelPlacement={'outside'}
						placeholder='Введите адрес'
						type='text'
						isRequired
						radius='sm'
					/>
				</div>
			</div>
			<div className='w-full'>
				<p className='font-semibold text-xl'>Банковские реквизиты</p>
				<p className='mt-1 text-xs max-w-3xl'>
					Банковские данные требуются для выплаты средств, в случае, если автор
					не может самостоятельно предоставить актуальные реквизиты
				</p>
				<div className='mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
					<Input
						label='Номер счета'
						name='AccountNumber'
						labelPlacement={'outside'}
						placeholder='Введите серию'
						type='text'
						maxLength={20}
						isRequired
						radius='sm'
						pattern='[0-9]{20}'
						errorMessage={({ validationDetails, validationErrors }) => {
							if (validationDetails.patternMismatch) {
								return 'Номер счета должен состоять из 20 цифр';
							}
							return validationErrors;
						}}
					/>
					<Input
						label='Наименование банка'
						name='NameBank'
						labelPlacement={'outside'}
						placeholder='Введите наименование банка'
						type='text'
						isRequired
						radius='sm'
					/>
				</div>
			</div>
			<Checkbox isRequired color='default' radius='sm' size='sm'>
				<p className='text-zinc-500'>
					Я даю своё согласие на обработку персональных данных
				</p>
			</Checkbox>
			<div>
				<Button
					type='submit'
					className='w-auto bg-indigo-700 text-white shadow-lg hover:bg-indigo-800'>
					Отправить
				</Button>
			</div>
			{submitted && (
				<div className='text-small text-default-500'>
					You submitted: <code>{JSON.stringify(submitted)}</code>
				</div>
			)}
		</Form>
	);
}
