import { useLeaveLobby } from '../../../../../stores/lobby/lobbyActions';
import ActionButton from '../../../../common/ActionButton/ActionButton';

const LeaveButton = () => {
	const leave = useLeaveLobby();
	return <ActionButton text={'Leave Lobby'} state={'danger'} onClick={leave} />;
};

export default LeaveButton;
