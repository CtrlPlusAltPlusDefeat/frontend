import React, { useReducer, useRef } from 'react';
import { ActionButtonProps } from '../ActionButton/ActionButton';

interface ModalContent {
	title: React.ReactNode;
	body: React.ReactNode;
	actionButton?: ActionButtonProps;
	showCancel?: boolean;
}

interface ModalState extends ModalContent {
	isOpen: boolean;
	buttonRef: React.RefObject<HTMLButtonElement>;
}

type ModalAction = { type: 'open'; content: ModalContent } | { type: 'close' };

interface ModalDispatches {
	setOpen: (props: ModalContent) => void;
	setClose: () => void;
}

const reducer = (state: ModalState, action: ModalAction) => {
	switch (action.type) {
		case 'open':
			return {
				...state,
				...action.content,
				isOpen: true
			};
		case 'close':
			return { ...state, isOpen: false };
	}
};

export type UseModalState = [ModalState, ModalDispatches];

export const useModalState = (): [ModalState, ModalDispatches] => {
	const buttonRef = useRef<HTMLButtonElement>(null);
	const [state, dispatch] = useReducer(reducer, { isOpen: false, title: undefined, body: undefined, buttonRef });

	const setOpen: ModalDispatches['setOpen'] = (content) => dispatch({ type: 'open', content });
	const setClose: ModalDispatches['setClose'] = () => dispatch({ type: 'close' });

	return [state, { setOpen, setClose }];
};
