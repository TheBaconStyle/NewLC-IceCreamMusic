'use client';
import { Button } from '@heroui/button';
import { TInputFile } from './InputFile.props';
import { ChangeEvent, useRef, useState } from 'react';
import clsx from 'clsx';

export default function InputFile({
	name,
	id,
	description,
	textContent,
	formats,
}: TInputFile) {
	const [file, setFile] = useState<FileList | null>(null);
	const [error, setError] = useState<string | null>(null);

	const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
		setError(null);
		setFile(null);
		if (e.target.files) {
			const arrFile = e.target.files[0].name.split('.');
			if (formats.includes(arrFile[arrFile.length - 1])) {
				setFile(e.target.files);
			} else {
				setError('Неверный формат файла');
			}
		}
	};

	const fileRef = useRef<HTMLInputElement | null>(null);

	return (
		<>
			<label htmlFor={id} className='flex items-center gap-2'>
				<Button
					size='md'
					radius='sm'
					className={clsx('bg-indigo-700', error && 'bg-red-800')}
					onPress={() => fileRef.current!.click()}>
					{textContent}
				</Button>
				{file && <p>{file[0].name}</p>}
				<input
					onChange={handleFileChange}
					ref={fileRef}
					hidden
					type='file'
					name={name}
					accept={formats.map((format) => '.' + format).join(',')}
					id={id}
				/>
				<p>{description}</p>
			</label>
			{error && <p className='text-red-500 mt-2'>{error}</p>}
		</>
	);
}
