import { SocketMessage } from '../receive';
import { Services } from '../general';
import { RequestTypes } from './enum';

export type SendChat = SocketMessage<
	typeof RequestTypes.ClientActions.Send,
	{
		text: string;
		lobbyId: string;
	},
	typeof Services.Chat
>;

export type LoadChat = SocketMessage<
	typeof RequestTypes.ClientActions.Load,
	{
		timestamp: number;
		lobbyId: string;
	},
	typeof Services.Chat
>;
