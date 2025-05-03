import { FileUpload } from '@/components/Files/FileUpload/FileUpload';
import { useState } from 'react';

export default function Preview() {
	return (
		<div className=' bg-zinc-900 p-5 rounded-xl'>
			<p className='relative z-10 mb-1 font-extrabold text-lg'>
				Обложка проекта
			</p>
			<FileUpload name='preview' showImage />
		</div>
	);
}
