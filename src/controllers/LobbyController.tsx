import React from 'react';
import { useParams } from 'react-router-dom';
import Lobby from '../pages/Lobby/Lobby';
import { useGetLobby } from '../stores/lobby/lobbyActions';
import { useLobbyStore } from '../stores/lobby/lobbyStore';
import SetNameForm from '../components/lobby/SetNameForm/SetNameForm';

const LobbyController = () => {
	const player = useLobbyStore((s) => s.player);
	const lobbyId = useParams().lobbyId;
	useGetLobby(lobbyId);

	if (!lobbyId) return <div>Lobby Not Found</div>;
	console.log(player);
	if (player && !player.name)
		return (
			<>
				<br />
				<SetNameForm />
			</>
		);

	return <Lobby />;
};
export default LobbyController;
