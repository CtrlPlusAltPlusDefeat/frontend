import { useWebsocket } from '../../contexts/WebSocketContext';
import { ChatSent } from '../../types/socket/chat.types';

export const useSendMessage = () => {
	const { send } = useWebsocket();

	return (message: string) => {
		if (!send) {
			console.error('Cannot send message');
			return;
		}

		const payload: ChatSent = { service: 'chat', action: 'send', data: { text: message } };
		send(payload);
	};
};
