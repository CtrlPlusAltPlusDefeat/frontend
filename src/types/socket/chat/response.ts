import { SocketMessage } from '../receive';
import { Services } from '../general';
import { RequestTypes } from './enum';
import { Message } from './types';

export type ChatSend = SocketMessage<typeof RequestTypes.ServerActions.Send, Message, typeof Services.Chat>;
export type ChatLoad = SocketMessage<
	typeof RequestTypes.ServerActions.Load,
	{
		messages: Message[] | null;
	},
	typeof Services.Chat
>;

export const isChatSend = (msg: SocketMessage): msg is ChatSend => msg.action === RequestTypes.ServerActions.Send;
export const isChatLoad = (msg: SocketMessage): msg is ChatLoad => msg.action === RequestTypes.ServerActions.Load;
