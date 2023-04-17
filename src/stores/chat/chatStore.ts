import { create } from 'zustand';

export interface Message {
	date: number;
	text: string;
	sender: string;
}

interface ChatState {
	messages: Message[];
	addMessage: (message: Message) => void;
}

export const useChatStore = create<ChatState>()((set) => ({
	messages: [],
	addMessage: (message) => set((state) => ({ messages: state.messages.concat([message]) }))
}));
