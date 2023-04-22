import { useChatRoute } from '../stores/chat/chatStore';
import { usePlayerRoute } from '../stores/player/playerStore';
import { Services, SocketMessage } from '../types/socket/socket.types';
import { useCallback } from 'react';

export const useSocketRoute = () => {
	const chatRoute = useChatRoute();
	const playerRoute = usePlayerRoute();

	return useCallback(
		(msg: SocketMessage) => {
			switch (msg.service) {
				case Services.Chat:
					chatRoute(msg);
					break;
				case Services.Player:
					playerRoute(msg);
					break;
				default:
					console.error('Unknown Service', msg.service);
			}
		},
		[chatRoute, playerRoute]
	);
};
