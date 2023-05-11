import { useCallback } from 'react';
import { isSetSession } from '../../types/socket/player/response';
import { SocketMessage } from '../../types/socket/receive';
import { usePlayerStore } from './playerStore';

export const useSetSession = () => {
	const setSessionId = usePlayerStore((s) => s.setSessionId);
	return useCallback(
		(payload: SocketMessage) => {
			if (isSetSession(payload)) setSessionId(payload.data.sessionId);
		},
		[setSessionId]
	);
};
