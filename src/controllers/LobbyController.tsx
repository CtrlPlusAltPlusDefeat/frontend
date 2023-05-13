import React from 'react';
import Lobby from '../pages/Lobby/Lobby';
import { useLoadLobby } from '../hooks/loadLobby/loadLobby';

const LobbyController = () => {
	const status = useLoadLobby();

	if (status === 'not-found') return <div>Lobby not found...</div>;
	else if (status === 'joining') return <div>Joining...</div>;

	return <Lobby />;
};
export default LobbyController;
