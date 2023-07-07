import { useCallback } from 'react';
import { usePlayerStore } from './playerStore';
import { SocketMessage } from '../../hooks/socket';
import { PlayerAction, Services } from '../../common/enum';

export type SetSession = SocketMessage<
	typeof PlayerAction.Server.SetSession,
	{
		sessionId: string;
	},
	typeof Services.Player
>;

export const isSetSession = (msg: SocketMessage): msg is SetSession => msg.action === PlayerAction.Server.SetSession;

export const useSetSession = () => {
	const setSessionId = usePlayerStore((s) => s.setSessionId);
	return useCallback(
		(payload: SocketMessage) => {
			if (isSetSession(payload)) setSessionId(payload.data.sessionId);
		},
		[setSessionId]
	);
};
