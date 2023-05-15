import { useWebsocket } from '../../contexts/WebSocketContext';
import { CreateLobby, JoinLobby, LeaveLobby } from '../../types/socket/lobby/request';
import { useCallback } from 'react';
import { useLobbyStore } from './lobbyStore';
import { useNavigate } from 'react-router-dom';

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

export const useLeaveLobby = () => {
	const lobbyId = useLobbyStore((state) => state.lobbyId);
	const clear = useLobbyStore((state) => state.clear);
	const { send, isConnected } = useWebsocket();
	const navigate = useNavigate();

	return useCallback(() => {
		if (!isConnected || !lobbyId) return;
		const payload: LeaveLobby = { service: 'lobby', action: 'leave', data: { lobbyId } };
		send(payload);
		clear();
		navigate('/');
	}, [clear, isConnected, lobbyId, navigate, send]);
};
