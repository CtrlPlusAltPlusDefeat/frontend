import { Services, SocketMessage } from '../socket';

export const PlayerTypes = {
	ClientActions: {
		CreateSession: 'create-session',
		UseSession: 'use-session'
	},
	ServerActions: { SetSession: 'set-session' }
} as const;

export type SetSession = SocketMessage<
	typeof PlayerTypes.ServerActions.SetSession,
	{
		sessionId: string;
	},
	typeof Services.Player
>;

export const isSetSession = (msg: SocketMessage): msg is SetSession => msg.action === PlayerTypes.ServerActions.SetSession;

export type CreateSession = SocketMessage<typeof PlayerTypes.ClientActions.CreateSession, {}, typeof Services.Player>;
export type UseSession = SocketMessage<
	typeof PlayerTypes.ClientActions.UseSession,
	{
		sessionId: string;
	},
	typeof Services.Player
>;
