import SetName from '../../Form/Forms/SetName/SetName';
import { useModal } from '../ModalContext';
import { useCallback } from 'react';

export const useSetNameModal = () => {
	const { setOpen } = useModal();
	//const create = useCreateLobby();

	//create();

	return useCallback(
		(onSubmit: (name: string) => void) =>
			setOpen({
				title: 'Name',
				body: <SetName onSubmit={onSubmit} />,
				actionButton: {
					text: 'Create'
				}
			}),
		[setOpen]
	);
};
