import React from 'react';
import { useParams } from 'react-router-dom';
import Lobby from '../pages/Lobby/Lobby';
import { useLobbyStore } from '../stores/lobby/lobbyStore';

const LobbyController = () => {
	const player = useLobbyStore((s) => s.player);
	const lobbyId = useParams().lobbyId;
	//useJoinLobby(lobbyId);

	if (!lobbyId) return <div>Lobby Not Found</div>;
	console.log(player);
	if (player && !player.name) return <></>;

	return <Lobby />;
};
export default LobbyController;
