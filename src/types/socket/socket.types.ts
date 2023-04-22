export const Services = {
	Chat: 'chat',
	Player: 'player'
} as const;
type ServiceKey = keyof typeof Services;
export type Service = (typeof Services)[ServiceKey];

export interface WrappedMessage {
	service: string;
	action: string;
	data: string;
}

export interface SocketMessage<A = string, D = object, S = Service> {
	service: S;
	action: A;
	data: D;
}

export const isSocketMessage = (msg: any): msg is SocketMessage => typeof msg === 'object' && msg.hasOwnProperty('service') && msg.hasOwnProperty('action') && msg.hasOwnProperty('data');
export const isWrappedMessage = (msg: any): msg is WrappedMessage => isSocketMessage(msg) && typeof msg.data === 'string';

export const wrapMessage = (msg: SocketMessage): string => {
	return JSON.stringify({ ...msg, data: JSON.stringify(msg.data) });
};

export const unwrapMessage = (str: string): SocketMessage | undefined => {
	const msg = JSON.parse(str);
	if (isWrappedMessage(msg)) return { ...msg, data: JSON.parse(msg.data) } as SocketMessage;
};
