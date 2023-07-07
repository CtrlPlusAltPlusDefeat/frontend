const CardTitle = ({ title }: { title: string }) => {
	return (
		<>
			<div className={'mb-5 border-b border-black border-solid'}>{title}</div>
		</>
	);
};

export default CardTitle;
