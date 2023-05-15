import { useCallback, useEffect, useState } from 'react';
import { devTools } from '../../common/devTools';
import { isError, isSocketMessage, SocketMessage, unwrapMessage } from '../../types/socket/receive';
import { RouterHandler, RoutesMap, useConfigureMiddleware } from '../../middleware/routerMiddleware';

const handlePayload = (payload: string): SocketMessage | undefined => {
	const message = unwrapMessage(payload);
	devTools.log(`routing ${message?.service}|${message?.action}`, message?.data);
	if (!isSocketMessage(message)) {
		console.error('Unknown socket response:', payload);
		return undefined;
	}
	if (isError(message)) {
		console.error('Socket error:', message.service, '|', message.action, '.', message.data.error);
		return undefined;
	}
	return message;
};

const useRouter = (routes: RoutesMap) => {
	return useCallback(
		(message: string) => {
			const payload = handlePayload(message);
			if (!payload) return;
			const handler = routes.get(`${payload.service}|${payload.action}`);
			if (handler) handler(payload);
			else console.error(`No handler for ${payload.service}|${payload.action}`);
		},
		[routes]
	);
};

export const useRoute = () => {
	const [routeMap, setRouteMap] = useState<RoutesMap>(new Map<string, RouterHandler>());
	const configure = useConfigureMiddleware();
	const router = useRouter(routeMap);
	useEffect(() => {
		setRouteMap(configure());
	}, [configure]);
	return router;
};
