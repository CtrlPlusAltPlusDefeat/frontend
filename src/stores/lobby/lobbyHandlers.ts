import { useCallback } from 'react';
import { SocketMessage } from '../../types/socket/receive';
import { isJoinedLobby, isNameChange, isPlayerJoined } from '../../types/socket/lobby/response';
import { useLobbyStore } from './lobbyStore';

export const useJoinedLobby = () => {
	const set = useLobbyStore((s) => s.set);
	return useCallback(
		(payload: SocketMessage) => {
			if (isJoinedLobby(payload)) set({ lobby: payload.data.lobby, player: payload.data.player });
		},
		[set]
	);
};

export const useNameChanged = () => {
	const setPlayer = useLobbyStore((s) => s.setPlayer);
	return useCallback(
		(payload: SocketMessage) => {
			if (isNameChange(payload)) setPlayer(payload.data.player);
		},
		[setPlayer]
	);
};

export const usePlayerJoined = () => {
	const addPlayer = useLobbyStore((s) => s.addPlayer);
	return useCallback(
		(payload: SocketMessage) => {
			if (isPlayerJoined(payload)) addPlayer(payload.data.player);
		},
		[addPlayer]
	);
};
