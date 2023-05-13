import { useCallback } from 'react';
import { SocketMessage } from '../../types/socket/receive';
import { isJoinedLobby, isPlayerJoined, isPlayerLeft } from '../../types/socket/lobby/response';
import { useLobbyStore } from './lobbyStore';

export const useJoinedLobby = () => {
	const setStore = useLobbyStore((s) => s.setStore);
	return useCallback(
		(payload: SocketMessage) => {
			if (isJoinedLobby(payload)) setStore({ lobby: payload.data.lobby, player: payload.data.player });
		},
		[setStore]
	);
};

export const usePlayerJoined = () => {
	const upsertPlayer = useLobbyStore((s) => s.upsertPlayer);
	return useCallback(
		(payload: SocketMessage) => {
			if (isPlayerJoined(payload)) upsertPlayer(payload.data.player);
		},
		[upsertPlayer]
	);
};

export const usePlayerLeft = () => {
	const upsertPlayer = useLobbyStore((s) => s.upsertPlayer);
	return useCallback(
		(payload: SocketMessage) => {
			if (isPlayerLeft(payload)) upsertPlayer(payload.data.player);
		},
		[upsertPlayer]
	);
};
