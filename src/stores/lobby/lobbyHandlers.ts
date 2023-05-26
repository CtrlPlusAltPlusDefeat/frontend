import { useCallback } from 'react';
import { SocketMessage } from '../../types/socket/receive';
import { isJoinedLobby, isPlayerJoined, isPlayerLeft, isStartGame } from '../../types/socket/lobby/response';
import { useLobbyStore } from './lobbyStore';
import { toast } from 'react-toastify';

export const useJoinedLobby = () => {
	const setLobby = useLobbyStore((s) => s.setLobby);
	const setPlayer = useLobbyStore((s) => s.setPlayer);
	return useCallback(
		(payload: SocketMessage) => {
			if (!isJoinedLobby(payload)) return;
			setLobby({ lobby: payload.data.lobby });
			setPlayer({ player: payload.data.player });
		},
		[setLobby, setPlayer]
	);
};

export const usePlayerJoined = () => {
	const upsertPlayer = useLobbyStore((s) => s.upsertPlayer);
	return useCallback(
		(payload: SocketMessage) => {
			if (!isPlayerJoined(payload)) return;
			upsertPlayer(payload.data.player);
			toast.info(`${payload.data.player.name} joined the lobby`);
		},
		[upsertPlayer]
	);
};

export const usePlayerLeft = () => {
	const upsertPlayer = useLobbyStore((s) => s.upsertPlayer);
	return useCallback(
		(payload: SocketMessage) => {
			if (!isPlayerLeft(payload)) return;
			upsertPlayer(payload.data.player);
			toast.info(`${payload.data.player.name} left the lobby`);
		},
		[upsertPlayer]
	);
};

export const useStartGame = () => {
	const setLobby = useLobbyStore((s) => s.setLobby);

	return useCallback(
		(payload: SocketMessage) => {
			const players = useLobbyStore.getState().lobby?.players;
			if (!isStartGame(payload) || !players) return;
			setLobby({ lobby: { ...payload.data, players: players } });
		},
		[setLobby]
	);
};
