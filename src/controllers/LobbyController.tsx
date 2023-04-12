import React from 'react';
import { useParams } from 'react-router-dom';
import Lobby from '../pages/Lobby/Lobby';

const LobbyController = () => {
	const lobbyId = useParams().lobbyId;

	if (!lobbyId) return <div>Lobby Not Found</div>;

	return <Lobby />;
};
export default LobbyController;
