type ActionButtonType = 'success' | 'danger';

interface ActionButtonProps {
	text: string;
	onClick: () => void;
	type?: ActionButtonType;
}

const ActionButton = ({ text, onClick, type }: ActionButtonProps) => {
	const classNames: string[] = [];
	switch (type) {
		case 'danger':
			classNames.push('bg-red-700');
			classNames.push('hover:bg-red-800');
			classNames.push('text-white');
			break;
		case 'success':
		default:
			classNames.push('bg-green-700');
			classNames.push('hover:bg-green-800');
			classNames.push('text-white');
			break;
	}

	return (
		<button className={`py-2 px-3 max-w-sm rounded shadow shadow-slate-500 ${classNames.join(' ')}`} onClick={onClick}>
			{text}
		</button>
	);
};
export default ActionButton;
