import { TQuestionCard } from './QuestionCard.props';

export default function QuestionCard({
	answer,
	icon,
	question,
}: TQuestionCard) {
	return (
		<div className='flex flex-col gap-2 bg-zinc-900 py-5 px-8 rounded-3xl hover:bg-zinc-800 cursor-pointer'>
			{icon}
			<p className='text-xl font-semibold'>{question}</p>
			<p className='text-md text-foreground-500'>{answer}</p>
		</div>
	);
}
