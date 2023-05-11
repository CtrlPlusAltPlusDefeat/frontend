import { RequestTypes } from './enum';
import { SocketMessage } from '../receive';
import { Services } from '../general';

export type UseSession = SocketMessage<
	typeof RequestTypes.ClientActions.UseSession,
	{
		sessionId: string;
	},
	typeof Services.Player
>;

export type CreateSession = SocketMessage<typeof RequestTypes.ClientActions.CreateSession, {}, typeof Services.Player>;
