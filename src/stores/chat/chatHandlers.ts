import { useCallback } from 'react';
import { isChatReceived } from '../../types/socket/chat/response';
import { SocketMessage } from '../../types/socket/receive';
import { useChatStore } from './chatStore';

export const useReceivedMessage = () => {
	const addMessage = useChatStore((s) => s.addMessage);
	return useCallback(
		(payload: SocketMessage) => {
			if (isChatReceived(payload))
				addMessage({
					date: Date.now(),
					text: payload.data.text,
					sender: payload.data.playerId
				});
		},
		[addMessage]
	);
};
