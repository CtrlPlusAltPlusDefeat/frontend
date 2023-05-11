import { SocketMessage } from '../receive';
import { Services } from '../general';
import { RequestTypes } from './enum';

export type SetSession = SocketMessage<
	typeof RequestTypes.ServerActions.SetSession,
	{
		sessionId: string;
	},
	typeof Services.Player
>;

export const isSetSession = (msg: SocketMessage): msg is SetSession => msg.action === RequestTypes.ServerActions.SetSession;
