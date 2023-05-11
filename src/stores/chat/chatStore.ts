import { create } from 'zustand';
import { Message } from '../../types/socket/chat/types';

interface ChatStoreState {
	messages: Message[];
	addMessage: (message: Message) => void;
}

export const useChatStore = create<ChatStoreState>()((set) => ({
	messages: [],
	addMessage: (message) => set((state) => ({ messages: state.messages.concat([message]) }))
}));
