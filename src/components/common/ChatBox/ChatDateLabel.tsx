interface ChatDateLabelProps {
	date: string;
}

export const ChatDateLabel = ({ date }: ChatDateLabelProps) => {
	return (
		<div className={'text-slate-400 text-center relative '}>
			<div className={'bg-slate-100 z-10 w-fit m-auto relative px-1'}>{date}</div>
			<hr className={'absolute w-full top-[11px] border-slate-300 z-0'} />
		</div>
	);
};
