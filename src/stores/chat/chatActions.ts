import { useWebsocket } from '../../contexts/WebSocketContext';
import { useLobbyStore } from '../lobby/lobbyStore';
import { SendChat } from '../../types/socket/chat/request';

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
		const payload: SendChat = { service: 'chat', action: 'send', data: { text: message, lobbyId } };
		send(payload);
	};
};
