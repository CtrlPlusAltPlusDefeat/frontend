import ActionButton from '../../common/ActionButton/ActionButton';
import { useLeaveLobby } from '../../../stores/lobby/lobbyActions';

const LeaveButton = () => {
	const leave = useLeaveLobby();
	return <ActionButton text={'Leave Lobby'} state={'danger'} onClick={leave} />;
};

export default LeaveButton;
