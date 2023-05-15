interface ChatMessageProps {
	text: string;
	time: string;
	planerName: string;
}

export const ChatMessage = ({ text, time, planerName }: ChatMessageProps) => {
	return (
		<div>
			<div className={'flex pr-3 text-slate-600 justify-between'}>
				<div>{planerName}</div>
				<div className={'group-hover:block hidden'}>{time}</div>
			</div>
			<div>{text}</div>
		</div>
	);
};
