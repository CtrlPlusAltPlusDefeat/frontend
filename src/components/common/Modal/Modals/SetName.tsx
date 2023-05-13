import SetName from '../../Form/Forms/SetName/SetName';
import { useModal } from '../ModalContext';

export const useSetNameModal = (onSubmit: (name: string) => void) => {
	const { setOpen } = useModal();
	//const create = useCreateLobby();

	//create();

	return () =>
		setOpen({
			title: 'Name',
			body: <SetName onSubmit={onSubmit} />,
			actionButton: {
				text: 'Create'
			}
		});
};
