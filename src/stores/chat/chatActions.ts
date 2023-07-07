import { useWebsocket } from '../../contexts/WebSocketContext';
import { useLobbyStore } from '../lobby/lobbyStore';
import { SocketMessage } from '../../hooks/socket';
import { ChatActions, Services } from '../../common/enum';

export type SendChat = SocketMessage<
	typeof ChatActions.Client.Send,
	{
		text: string;
		lobbyId: string;
	},
	typeof Services.Chat
>;

export type LoadChat = SocketMessage<
	typeof ChatActions.Client.Load,
	{
		timestamp: number;
		lobbyId: string;
	},
	typeof Services.Chat
>;

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
