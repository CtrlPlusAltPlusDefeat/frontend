import { create } from 'zustand';

interface PlayerStoreState {
	sessionId?: string;
	setSessionId: (sessionId?: string) => void;
}

export const usePlayerStore = create<PlayerStoreState>()((set) => ({
	sessionId: undefined,
	setSessionId: (sessionId) =>
		set(() => {
			if (sessionId) sessionStorage.setItem('session-id', sessionId);
			return { sessionId };
		})
}));
