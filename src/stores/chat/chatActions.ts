import { useWebsocket } from '../../contexts/WebSocketContext';

export const useSendMessage = () => {
	const { send } = useWebsocket();

	return (message: string) => {
		if (!send) {
			console.error('Cannot send message');
			return;
		}
		send(JSON.stringify({ service: 'chat', action: 'send', data: JSON.stringify({ text: message }) }));
	};
};
