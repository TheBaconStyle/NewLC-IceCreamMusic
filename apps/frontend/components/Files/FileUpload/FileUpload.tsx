'use client';
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { IconUpload } from '@tabler/icons-react';
import { useDropzone } from 'react-dropzone';
import { cn } from '@/utils/cn';
import Image from 'next/image';
import clsx from 'clsx';

import { Controller, useFormContext } from 'react-hook-form';

const mainVariant = {
	initial: {
		x: 0,
		y: 0,
	},
	animate: {
		x: 20,
		y: -20,
		opacity: 0.9,
	},
};

const secondaryVariant = {
	initial: {
		opacity: 0,
	},
	animate: {
		opacity: 1,
	},
};

export const FileUpload = ({
	showImage,
	alternative,
	name,
}: {
	showImage?: boolean;
	alternative?: boolean;
	name: string;
}) => {
	const [files, setFiles] = useState<File[]>([]);

	const fileInputRef = useRef<HTMLInputElement>(null);
	const { control, formState, register, watch } = useFormContext();
	const { ref, ...rest } = register(name);

	const data: FileList = watch(name);

	useEffect(() => {
		if (fileInputRef.current && data) {
			const dataTransfer = new DataTransfer();
			for (let i = 0; i < data.length; i++) {
				const file = data.item(i);
				if (file) {
					dataTransfer.items.add(file);
				}
			}
			fileInputRef.current.files = dataTransfer.files;
		}
	}, [data]);

	const handleFileChange = (newFiles: File[]) => {
		if (showImage) {
			setFiles(newFiles);
		} else {
			setFiles((prevFiles) => [...prevFiles, ...newFiles]);
		}
	};

	// useEffect(() => {
	// 	setShowDetail(() => new Array(files.length).fill(false));
	// 	console.log(data);
	// }, [files]);

	const handleClick = () => {
		fileInputRef.current?.click();
	};

	const { getRootProps, isDragActive } = useDropzone({
		multiple: false,
		noClick: true,
		onDrop: handleFileChange,
		onDropRejected: (error) => {
			console.log(error);
		},
	});

	return (
		<div className='w-full' {...getRootProps()}>
			<motion.div
				whileHover='animate'
				className=' group/file block rounded-lg  w-full relative '>
				<Controller
					name={name}
					control={control}
					rules={{ required: 'Поле обязательное' }}
					render={({ field }) => (
						<>
							{formState.errors[name] && formState.errors[name]?.message}
							{showImage && field.value && field.value.length > 0 && (
								<Image
									src={URL.createObjectURL(field.value[0])}
									alt={'Файл'}
									width={50}
									height={50}
									unoptimized={true}
									className='w-full aspect-square object-cover rounded-xl'
									onClick={handleClick}
								/>
							)}
							<input
								id={`file-upload-handle-${name}`}
								type='file'
								className='hidden'
								{...rest}
								ref={(e) => {
									ref(e);
									fileInputRef.current = e;
								}}
								onChange={(e) => {
									if (e.target.files?.length) {
										const newFiles: File[] = [];
										for (let i = 0; i < e.target.files?.length; i++) {
											newFiles.push(e.target.files?.item(i) as File);
										}
										field.onChange(e.currentTarget.files);
									}
									handleFileChange(Array.from(e.target.files || []));
								}}
								name={name}
							/>
							<div className='flex flex-col items-center justify-center'>
								<div className={clsx('relative w-full   mx-auto')}>
									{/* Серая подложка */}
									{(!field.value || (field.value && !field.value.length)) &&
										!alternative && (
											<motion.div
												layoutId='file-upload'
												variants={mainVariant}
												transition={{
													type: 'spring',
													stiffness: 300,
													damping: 20,
												}}
												className={cn(
													'relative group-hover/file:shadow-2xl z-20 bg-white dark:bg-neutral-800 flex items-center justify-center  mt-4 w-full aspect-square  mx-auto rounded-lg',
													'shadow-[0px_10px_50px_rgba(0,0,0,0.1)]',
												)}>
												{isDragActive ? (
													<motion.p
														initial={{ opacity: 0 }}
														animate={{ opacity: 1 }}
														className='text-neutral-600 flex flex-col items-center'>
														Drop it
														<IconUpload className='h-4 w-4 text-neutral-600 dark:text-neutral-400' />
													</motion.p>
												) : (
													<IconUpload className='h-4 w-4 text-neutral-600 dark:text-neutral-300' />
												)}
											</motion.div>
										)}
									{/* Область голубая */}
									{(!field.value || (field.value && !field.value.length)) &&
										!alternative && (
											<motion.div
												variants={secondaryVariant}
												onClick={handleClick}
												className={clsx(
													'absolute opacity-0 border border-dashed border-sky-400 inset-0 z-30 bg-transparent flex items-center justify-center aspect-square  mt-4 w-full  mx-auto rounded-lg',
												)}></motion.div>
										)}

									{!alternative && (
										<>
											<p className='relative z-20 font-sans font-bold text-neutral-700 dark:text-neutral-300 text-sm mt-2 hover:underline'>
												Загрузить файл
											</p>
											{files.length > 0 && (
												<p className='relative z-20 font-sans font-normal text-neutral-400 dark:text-neutral-400 text-sm text-center mt-1'>
													Чтобы сменить файл просто перетащите новый файл поверх
													текущего
												</p>
											)}
											{files.length == 0 && (
												<p className='relative z-20 font-sans font-normal text-neutral-400 dark:text-neutral-400 text-sm text-center mt-1'>
													Перетащите файл сюда, или нажмите на поле чтобы
													выбрать его
												</p>
											)}
										</>
									)}
								</div>
							</div>
						</>
					)}
				/>
			</motion.div>
		</div>
	);
};
