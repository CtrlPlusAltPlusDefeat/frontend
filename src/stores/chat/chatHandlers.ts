import { useCallback } from 'react';
import { isChatLoad, isChatSend } from '../../types/socket/chat/response';
import { SocketMessage } from '../../types/socket/receive';
import { useChatStore } from './chatStore';

export const useReceivedMessage = () => {
	const addMessage = useChatStore((s) => s.addMessage);
	return useCallback(
		(payload: SocketMessage) => {
			if (isChatSend(payload)) addMessage(payload.data);
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
