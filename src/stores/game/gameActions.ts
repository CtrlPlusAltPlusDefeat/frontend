import { useCallback } from 'react';
import { useLobbyStore } from '../lobby/lobbyStore';
import { useWebsocket } from '../../contexts/WebSocketContext';
import { GetStateReq } from '../../types/socket/game/request';

export const useGetState = () => {
	const lobby = useLobbyStore((state) => state.lobby);
	const { send, isConnected } = useWebsocket();

	return useCallback(() => {
		if (!isConnected || !lobby) return;
		const { gameSessionId, lobbyId } = lobby;
		if (!gameSessionId) return;
		const payload: GetStateReq = { service: 'game', action: 'get-state', data: { lobbyId, gameSessionId } };
		send(payload, true);
	}, [isConnected, lobby, send]);
};
