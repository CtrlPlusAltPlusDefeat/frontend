import { useChatRoute } from '../stores/chat/chatStore';
import { usePlayerRoute } from '../stores/player/playerStore';
import { Services, SocketMessage } from '../types/socket/socket.types';
import { useCallback } from 'react';
import { useLobbyRoute } from '../stores/lobby/lobbyStore';

export const useSocketRoute = () => {
	const chatRoute = useChatRoute();
	const playerRoute = usePlayerRoute();
	const lobbyRoute = useLobbyRoute();

	return useCallback(
		(msg: SocketMessage) => {
			switch (msg.service) {
				case Services.Chat:
					chatRoute(msg);
					break;
				case Services.Player:
					playerRoute(msg);
					break;
				case Services.Lobby:
					lobbyRoute(msg);
					break;
				default:
					console.error('Unknown Service', msg.service);
			}
		},
		[chatRoute, playerRoute, lobbyRoute]
	);
};
