import Marquee from '../Markqee';
import Image from 'next/image';

export default function MarkqeeServices() {
	return (
		<Marquee className='rounded-xl'>
			<Image
				src={'/MusicServices/apple_music.svg'}
				alt={''}
				width={200}
				height={150}
			/>
			<Image
				src={'/MusicServices/deezer.svg'}
				alt={''}
				width={200}
				height={150}
			/>
			<Image
				src={'/MusicServices/spotify.svg'}
				alt={''}
				width={200}
				height={150}
			/>
			<Image
				src={'/MusicServices/tidal.svg'}
				alt={''}
				width={200}
				height={150}
			/>
			<Image
				src={'/MusicServices/tiktok.svg'}
				alt={''}
				width={200}
				height={150}
			/>
			<Image src={'/MusicServices/vk.svg'} alt={''} width={200} height={150} />
			<Image
				src={'/MusicServices/yandex.svg'}
				alt={''}
				width={200}
				height={150}
			/>
			<Image
				src={'/MusicServices/youtube_music.svg'}
				alt={''}
				width={200}
				height={150}
			/>
			<Image
				src={'/MusicServices/zvuk.svg'}
				alt={''}
				width={200}
				height={150}
			/>
		</Marquee>
	);
}
