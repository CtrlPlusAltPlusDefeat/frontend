import { create } from 'zustand';
import { Message } from '../../types/socket/chat/types';
import { immer } from 'zustand/middleware/immer';

interface ChatStoreState {
	loadedHistoric: boolean;
	isLoading: boolean;
	messages: Message[];
	addMessage: (message: Message | Message[] | null) => void;
	setLoading: (isLoading: boolean) => void;
}

export const useChatStore = create(
	immer<ChatStoreState>((set) => ({
		loadedHistoric: false,
		isLoading: false,
		messages: [],
		addMessage: (message) =>
			set((state) => {
				if (!message) return { loadedHistoric: true };
				if (!Array.isArray(message)) state.messages.push(message);
				else {
					if (message.length !== 50) state.loadedHistoric = true;
					state.messages.push(...message);
				}
				state.messages.sort((a, b) => a.timestamp - b.timestamp);
			}),
		setLoading: (isLoading) => set(() => ({ isLoading }))
	}))
);
