import { Service } from './general';
import { WrappedMessage } from './send';

export interface SocketMessage<A = string, D = object, S = Service> {
	service: S;
	action: A;
	data: D;
}

export interface SocketErrorMessage extends SocketMessage<string, { error: string }> {}

export const isSocketMessage = (msg: any): msg is SocketMessage => typeof msg === 'object' && msg.hasOwnProperty('service') && msg.hasOwnProperty('action') && msg.hasOwnProperty('data');
export const isWrappedMessage = (msg: any): msg is WrappedMessage => isSocketMessage(msg) && typeof msg.data === 'string';

export const unwrapMessage = (str: string): SocketMessage | undefined => {
	console.log('unwrapMessage', str);
	const msg = JSON.parse(str);
	if (isWrappedMessage(msg)) return { ...msg, data: JSON.parse(msg.data) } as SocketMessage;
};
export const isError = (msg: SocketMessage): msg is SocketErrorMessage => msg.data.hasOwnProperty('error');
