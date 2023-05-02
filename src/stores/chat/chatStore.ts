import { create } from 'zustand';
import { SocketMessage } from '../../types/socket/socket';
import { useCallback } from 'react';
import { RequestTypes } from '../../types/socket/chat/enum';
import { isChatReceived } from '../../types/socket/chat/response';

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
				case RequestTypes.ServerActions.Receive:
					if (isChatReceived(msg)) addMessage({ date: Date.now(), text: msg.data.text, sender: msg.data.playerId });
					break;
				default:
					console.error('Unknown Chat Action', msg.action);
			}
		},
		[addMessage]
	);
};
