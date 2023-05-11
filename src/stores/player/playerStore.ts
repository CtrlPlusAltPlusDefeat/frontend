import { create } from 'zustand';
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
