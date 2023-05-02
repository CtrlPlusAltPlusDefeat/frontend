import { SocketMessage } from '../../types/socket/socket';
import { create } from 'zustand';
import { isSetSession, PlayerTypes } from '../../types/socket/player/player.types';
import { useCallback } from 'react';
import { devTools } from '../../common/devTools';

interface PlayerStoreState {
	sessionId?: string;
	setSessionId: (sessionId?: string) => void;
}

export const usePlayerStore = create<PlayerStoreState>()((set) => ({
	sessionId: undefined,
	setSessionId: (sessionId) =>
		set(() => {
			devTools.log('Setting Session Id', sessionId);
			if (sessionId) sessionStorage.setItem('session-id', sessionId);
			return { sessionId };
		})
}));

export const usePlayerRoute = () => {
	const setSessionId = usePlayerStore((s) => s.setSessionId);
	return useCallback(
		(msg: SocketMessage) => {
			switch (msg.action) {
				case PlayerTypes.ServerActions.SetSession:
					if (isSetSession(msg)) setSessionId(msg.data.sessionId);
					break;
				default:
					console.error('Unknown Player Action', msg.action);
			}
		},
		[setSessionId]
	);
};
