import { useWebsocket } from '../../contexts/WebSocketContext';
import { useLobbyStore } from '../lobby/lobbyStore';
import { LoadChat, SendChat } from '../../types/socket/chat/request';

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

export const useLoadMessages = () => {
	const lobbyId = useLobbyStore((s) => s.lobbyId);

	const { send } = useWebsocket();

	return (timestamp: number) => {
		if (!send) {
			console.error('Cannot send message');
			return;
		}
		if (!lobbyId) {
			console.error('Lobby Id is undefined');
			return;
		}
		const payload: LoadChat = { service: 'chat', action: 'load', data: { timestamp, lobbyId } };
		send(payload);
	};
};
