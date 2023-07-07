import { devTools } from '../../common/devTools';
import { SocketMessage } from '../../hooks/socket';
import { PlayerAction, Services } from '../../common/enum';

export type UseSession = SocketMessage<
	typeof PlayerAction.Client.UseSession,
	{
		sessionId: string;
	},
	typeof Services.Player
>;

export type CreateSession = SocketMessage<typeof PlayerAction.Client.CreateSession, {}, typeof Services.Player>;
export const getSessionRequest = () => {
	const sessionId = sessionStorage.getItem('session-id');

	let payload: CreateSession | UseSession = {
		service: Services.Player,
		action: 'create-session',
		data: {}
	};
	if (sessionId) {
		devTools.log('Using SessionId', sessionId);

		payload = {
			...payload,
			action: 'use-session',
			data: {
				sessionId
			}
		};
	}
	return payload;
};
