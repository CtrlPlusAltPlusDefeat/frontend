import { useCallback } from 'react';
import { useWebsocket } from '../../contexts/WebSocketContext';
import { GetStateReq } from '../../types/socket/game/request';

export const useGetState = ({ gameSessionId, lobbyId }: { gameSessionId?: string; lobbyId?: string }) => {
	const { send, isConnected } = useWebsocket();

	return useCallback(() => {
		if (!isConnected) return;
		if (!gameSessionId || !lobbyId) return;
		const payload: GetStateReq = { service: 'game', action: 'get-state', data: { lobbyId, gameSessionId } };
		send(payload, true);
	}, [isConnected, gameSessionId, lobbyId, send]);
};
