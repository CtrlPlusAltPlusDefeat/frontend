import { SocketMessage } from './receive';

export interface WrappedMessage {
	service: string;
	action: string;
	data: string;
}

export const wrapMessage = (msg: SocketMessage): string => {
	return JSON.stringify({ ...msg, data: JSON.stringify(msg.data) });
};
