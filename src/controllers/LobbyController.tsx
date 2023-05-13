import React from 'react';
import { useParams } from 'react-router-dom';
import Lobby from '../pages/Lobby/Lobby';
import { useJoinLobby } from '../stores/lobby/lobbyActions';
import { useSetNameModal } from '../components/common/Modal/Modals/SetName';

const LobbyController = () => {
	const lobbyId = useParams().lobbyId;
	const [playerName] = React.useState<string | null>(sessionStorage.getItem(`session-player-name-${lobbyId}`));
	const join = useJoinLobby(lobbyId);
	const openModal = useSetNameModal(join);

	if (!lobbyId) return <div>Lobby Not Found</div>;
	else if (playerName) join(playerName);
	else openModal();

	return <Lobby />;
};
export default LobbyController;
