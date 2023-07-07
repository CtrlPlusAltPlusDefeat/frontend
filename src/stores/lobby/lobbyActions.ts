import { useWebsocket } from '../../contexts/WebSocketContext';

import { useCallback } from 'react';
import { useLobbyStore } from './lobbyStore';
import { useNavigate } from 'react-router-dom';
import { SocketMessage } from '../../hooks/socket';
import { LobbyActions, Services } from '../../common/enum';

export type CreateLobby = SocketMessage<
	typeof LobbyActions.Client.Create,
	{
		name: string;
	},
	typeof Services.Lobby
>;

export type JoinLobby = SocketMessage<
	typeof LobbyActions.Client.Join,
	{
		lobbyId: string;
		name: string;
	},
	typeof Services.Lobby
>;

export type LeaveLobby = SocketMessage<
	typeof LobbyActions.Client.Leave,
	{
		lobbyId: string;
	},
	typeof Services.Lobby
>;

export type LoadGame = SocketMessage<
	typeof LobbyActions.Client.LoadGame,
	{
		lobbyId: string;
	},
	typeof Services.Lobby
>;

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

export const useStartGame = () => {
	const lobbyId = useLobbyStore((state) => state.lobbyId);
	const { send, isConnected } = useWebsocket();

	return useCallback(() => {
		if (!isConnected || !lobbyId) return;
		const payload: LoadGame = { service: 'lobby', action: 'load-game', data: { lobbyId } };
		send(payload, true);
	}, [isConnected, lobbyId, send]);
};
