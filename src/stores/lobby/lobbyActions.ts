import { useWebsocket } from '../../contexts/WebSocketContext';
import { CreateLobby, JoinLobby } from '../../types/socket/lobby/request';
import { useCallback } from 'react';

export const useCreateLobby = () => {
	const { send } = useWebsocket();

	return (name: string) => {
		if (!send) {
			console.error('Cannot send message');
			return;
		}

		const payload: CreateLobby = { service: 'lobby', action: 'create', data: { name } };
		send(payload);
	};
};

export const useJoinLobby = (lobbyId?: string) => {
	const { send, isConnected } = useWebsocket();

	return useCallback(
		(name: string) => {
			if (!lobbyId || !isConnected) return;
			const payload: JoinLobby = { service: 'lobby', action: 'join', data: { lobbyId, name } };
			send(payload);
		},
		[isConnected, lobbyId, send]
	);
};
