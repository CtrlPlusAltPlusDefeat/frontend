import { Services, SocketMessage } from '../send';
import { RequestTypes } from './enum';

export type UseSession = SocketMessage<
	typeof RequestTypes.ClientActions.UseSession,
	{
		sessionId: string;
	},
	typeof Services.Player
>;

export type CreateSession = SocketMessage<typeof RequestTypes.ClientActions.CreateSession, {}, typeof Services.Player>;
