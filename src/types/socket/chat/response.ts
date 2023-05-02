import { Services, SocketMessage } from '../socket';
import { RequestTypes } from './enum';

export type ChatReceived = SocketMessage<
	typeof RequestTypes.ServerActions.Receive,
	{
		text: string;
		playerId: string;
	},
	typeof Services.Chat
>;

export const isChatReceived = (msg: SocketMessage): msg is ChatReceived => msg.action === RequestTypes.ServerActions.Receive;
