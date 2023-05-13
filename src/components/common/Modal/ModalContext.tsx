import React, { createContext, useContext } from 'react';
import { UseModalState, useModalState } from './ModalReducer';
import Modal from './Modal';

interface ModalContextObj {
	state: UseModalState[0];
	setOpen: UseModalState[1]['setOpen'];
	setClose: UseModalState[1]['setClose'];
}

const ModalContext = createContext<ModalContextObj>({
	state: {} as UseModalState[0],
	setClose: () => {},
	setOpen: () => {}
});

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
	const [state, dispatches] = useModalState();
	const { setOpen, setClose } = dispatches;
	return (
		<ModalContext.Provider
			value={{
				state,
				setOpen,
				setClose
			}}
		>
			<Modal state={state} dispatches={dispatches} />
			{children}
		</ModalContext.Provider>
	);
};

export const useModal = () => {
	return useContext(ModalContext);
};
