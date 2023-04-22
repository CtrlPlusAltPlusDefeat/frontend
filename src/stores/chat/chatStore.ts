import { create } from 'zustand';
import { SocketMessage } from '../../types/socket/socket.types';
import { ChatTypes, isChatReceived } from '../../types/socket/chat.types';
import { useCallback } from 'react';

export interface Message {
	date: number;
	text: string;
	sender: string;
}

interface ChatStoreState {
	messages: Message[];
	addMessage: (message: Message) => void;
}

export const useChatStore = create<ChatStoreState>()((set) => ({
	messages: [],
	addMessage: (message) => set((state) => ({ messages: state.messages.concat([message]) }))
}));

export const useChatRoute = () => {
	const addMessage = useChatStore((s) => s.addMessage);
	return useCallback(
		(msg: SocketMessage) => {
			switch (msg.action) {
				case ChatTypes.ServerActions.Receive:
					if (isChatReceived(msg)) addMessage({ date: Date.now(), text: msg.data.text, sender: msg.data.connectionId });
					break;
				default:
					console.error('Unknown Chat Action', msg.action);
			}
		},
		[addMessage]
	);
};
