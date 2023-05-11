import { devTools } from '../../common/devTools';
import { Services } from '../../types/socket/general';
import { CreateSession, UseSession } from '../../types/socket/player/request';

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
