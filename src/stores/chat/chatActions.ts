import { useWebsocket } from '../../contexts/WebSocketContext';
import { ChatSent } from '../../types/socket/chat.types';
import { useLobbyStore } from '../lobby/lobbyStore';

export const useSendMessage = () => {
	const lobbyId = useLobbyStore((s) => s.lobbyId);
	const { send } = useWebsocket();

	return (message: string) => {
		if (!send) {
			console.error('Cannot send message');
			return;
		}
		if (!lobbyId) {
			console.error('Lobby Id is undefined');
			return;
		}
		const payload: ChatSent = { service: 'chat', action: 'send', data: { text: message, lobbyId } };
		send(payload);
	};
};
