import { useCallback, useEffect, useState } from 'react';
import { devTools } from '../../common/devTools';
import { isSocketMessage, SocketMessage, unwrapMessage } from '../../types/socket/receive';
import { RouterHandler, RoutesMap, useConfigureRoutes } from './middleware/configureRoutes';
import { toast } from 'react-toastify';

const handlePayload = (payload: string): SocketMessage | undefined => {
	const message = unwrapMessage(payload);
	devTools.log(`routing ${message?.service}|${message?.action}`, message?.data);
	if (!isSocketMessage(message)) {
		console.error('Unknown socket response:', payload);
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
			else {
				toast.error('Well this is embarrassing. Something not handled happened');
				console.error(`No handler for ${payload.service}|${payload.action}`);
			}
		},
		[routes]
	);
};

export const useRoute = () => {
	const [routeMap, setRouteMap] = useState<RoutesMap>(new Map<string, RouterHandler>());
	const configure = useConfigureRoutes();
	const router = useRouter(routeMap);
	useEffect(() => {
		setRouteMap(configure());
	}, [configure]);
	return router;
};
