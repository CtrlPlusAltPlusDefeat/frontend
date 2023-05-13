import React from 'react';

export type ActionButtonState = 'success' | 'danger' | 'loading';

export interface ActionButtonProps {
	text: string;
	onClick?: () => void;
	state?: ActionButtonState;
	type?: 'submit' | 'reset' | 'button' | undefined;
	classes?: string[];
	buttonRef?: React.RefObject<HTMLButtonElement>;
}

const ActionButton = ({ text, onClick, state, type, classes, buttonRef }: ActionButtonProps) => {
	const classNames: string[] = [...(classes ?? [])];
	switch (state) {
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
		<button ref={buttonRef} type={type} className={`py-2 px-3 rounded shadow shadow-slate-500 ${classNames.join(' ')}`} onClick={onClick}>
			{text}
		</button>
	);
};
export default ActionButton;
