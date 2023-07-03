import React from 'react';

export type ActionButtonState = 'success' | 'danger' | 'loading' | 'default';

export interface ActionButtonProps {
	text: string;
	onClick?: () => void;
	state?: ActionButtonState;
	type?: 'submit' | 'reset' | 'button' | undefined;
	classes?: string[];
	buttonRef?: React.RefObject<HTMLButtonElement>;
	disabled?: boolean;
	size?: 'small' | 'medium';
}

const ActionButton = ({ text, onClick, state, type, classes, buttonRef, disabled, size }: ActionButtonProps) => {
	const classNames: string[] = [...(classes ?? [])];

	switch (size) {
		case 'small':
			classNames.push('py-1 px-1 text-sm');
			break;
		default:
		case 'medium':
			classNames.push('py-2 px-3 text-base');
	}

	switch (state) {
		case 'danger':
			classNames.push('bg-red-700 hover:bg-red-800 text-white');
			break;
		case 'success':
			classNames.push('bg-green-700 hover:bg-green-800 text-white');
			break;
		case 'default':
		default:
			classNames.push('bg-slate-300 hover:bg-slate-400 text-black');
			break;
	}

	return (
		<button disabled={disabled} ref={buttonRef} type={type} className={`rounded shadow shadow-slate-500 ${classNames.join(' ')}`} onClick={onClick}>
			{text}
		</button>
	);
};
export default ActionButton;
