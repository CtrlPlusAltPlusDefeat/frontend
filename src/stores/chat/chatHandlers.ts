import { useCallback } from 'react';
import { isChatLoad, isChatReceived } from '../../types/socket/chat/response';
import { SocketMessage } from '../../types/socket/receive';
import { useChatStore } from './chatStore';

export const useReceivedMessage = () => {
	const addMessage = useChatStore((s) => s.addMessage);
	return useCallback(
		(payload: SocketMessage) => {
			if (isChatReceived(payload)) addMessage(payload.data);
		},
		[addMessage]
	);
};

export const useLoadMessages = () => {
	const addMessage = useChatStore((s) => s.addMessage);
	return useCallback(
		(payload: SocketMessage) => {
			if (isChatLoad(payload)) addMessage(payload.data.messages);
		},
		[addMessage]
	);
};
