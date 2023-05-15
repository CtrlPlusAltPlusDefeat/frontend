import { SocketMessage } from '../receive';
import { Services } from '../general';
import { RequestTypes } from './enum';
import { Message } from './types';

export type ChatReceived = SocketMessage<typeof RequestTypes.ServerActions.Receive, Message, typeof Services.Chat>;
export type ChatLoad = SocketMessage<
	typeof RequestTypes.ServerActions.Load,
	{
		messages: Message[] | null;
	},
	typeof Services.Chat
>;

export const isChatReceived = (msg: SocketMessage): msg is ChatReceived => msg.action === RequestTypes.ServerActions.Receive;
export const isChatLoad = (msg: SocketMessage): msg is ChatLoad => msg.action === RequestTypes.ServerActions.Load;
