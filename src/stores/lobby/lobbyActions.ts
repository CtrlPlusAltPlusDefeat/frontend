import { useWebsocket } from '../../contexts/WebSocketContext';
import { CreateLobby, JoinLobby, SetName } from '../../types/socket/lobby/request';
import { useEffect } from 'react';
import { useLobbyStore } from './lobbyStore';

export const useCreateLobby = () => {
	const { send } = useWebsocket();

	return () => {
		if (!send) {
			console.error('Cannot send message');
			return;
		}

		const payload: CreateLobby = { service: 'lobby', action: 'create', data: {} };
		send(payload);
	};
};

export const useGetLobby = (lobbyId?: string) => {
	const { send, isConnected } = useWebsocket();

	useEffect(() => {
		if (!lobbyId || !isConnected) return;

		const payload: JoinLobby = { service: 'lobby', action: 'join', data: { lobbyId } };

		send(payload);
	}, [send, lobbyId, isConnected]);
};

export const useSetName = () => {
	const lobbyId = useLobbyStore((s) => s.lobbyId);
	const { send } = useWebsocket();

	return (text: string) => {
		if (!lobbyId) {
			console.error('Lobby Id is undefined', lobbyId);
			return;
		}
		if (!send) {
			console.error('Cannot send message');
			return;
		}

		const payload: SetName = { service: 'lobby', action: 'set-name', data: { lobbyId, text } };
		send(payload);
	};
};
