import { SocketMessage, WrappedMessage } from './socket';
import { toast } from 'react-toastify';
import { useCallback, useEffect, useState } from 'react';
import { devTools } from '../common/devTools';
import { useReceivedMessage } from '../stores/chat/chatHandlers';
import { useLoadMessages } from '../stores/chat/chatHandlers';

import { useSetSession } from '../stores/player/playerHandlers';
import { useJoinedLobby, useLoadGame, usePlayerJoined, usePlayerLeft, useSaveSettings } from '../stores/lobby/lobbyHandlers';
import { useHandleGetState, useHandlePlayerAction, useHandleSwapTeam } from '../stores/game/gameHandlers';
import { ChatActions, GameActions, LobbyActions, PlayerAction, Services } from '../common/enum';

export type RouterHandler = (payload: SocketMessage) => void;
export type Middleware = (next: RouterHandler) => RouterHandler;
export type RoutesMap = Map<string, RouterHandler>;
export type AddProps = [string, RouterHandler, Middleware[]];

export interface SocketErrorMessage extends SocketMessage<string, { error: string }> {}

export const isSocketMessage = (msg: any): msg is SocketMessage => typeof msg === 'object' && msg.hasOwnProperty('service') && msg.hasOwnProperty('action') && msg.hasOwnProperty('data');
export const isWrappedMessage = (msg: any): msg is WrappedMessage => isSocketMessage(msg) && typeof msg.data === 'string';

export const unwrapMessage = (str: string): SocketMessage | undefined => {
	const msg = JSON.parse(str);
	if (isWrappedMessage(msg)) return { ...msg, data: JSON.parse(msg.data) } as SocketMessage;
};
export const isError = (msg: SocketMessage): msg is SocketErrorMessage => msg.data.hasOwnProperty('error');

const add = (routes: RoutesMap, [route, handler, middleware]: AddProps) => {
	for (let i = middleware.length - 1; i >= 0; i--) {
		//pass the handler all the way through all the middleware
		handler = middleware[i](handler);
	}
	routes.set(route, handler);
};

export const handleError: Middleware = (next) => {
	return (payload) => {
		if (isError(payload)) {
			console.error('Socket error:', payload.service, '|', payload.action, '.', payload.data.error);
			toast.error(payload.data.error);
			return undefined;
		}
		next(payload);
	};
};

const useChatRoutes = () => {
	const receivedMessage = useReceivedMessage();
	const loadMessages = useLoadMessages();
	return useCallback(
		(routes: RoutesMap) => {
			add(routes, [`${Services.Chat}|${ChatActions.Server.Send}`, receivedMessage, [handleError]]);
			add(routes, [`${Services.Chat}|${ChatActions.Server.Load}`, loadMessages, [handleError]]);
		},
		[loadMessages, receivedMessage]
	);
};
const usePlayerRoutes = () => {
	const setSession = useSetSession();

	return useCallback(
		(routes: RoutesMap) => {
			add(routes, [`${Services.Player}|${PlayerAction.Server.SetSession}`, setSession, [handleError]]);
		},
		[setSession]
	);
};
const useLobbyRoutes = () => {
	const joinedLobby = useJoinedLobby();
	const playerJoined = usePlayerJoined();
	const playerLeft = usePlayerLeft();
	const loadGame = useLoadGame();
	const saveSettings = useSaveSettings();
	return useCallback(
		(routes: RoutesMap) => {
			add(routes, [`${Services.Lobby}|${LobbyActions.Server.Joined}`, joinedLobby, [handleError]]);
			add(routes, [`${Services.Lobby}|${LobbyActions.Server.PlayerJoined}`, playerJoined, [handleError]]);
			add(routes, [`${Services.Lobby}|${LobbyActions.Server.PlayerLeft}`, playerLeft, [handleError]]);
			add(routes, [`${Services.Lobby}|${LobbyActions.Server.LoadGame}`, loadGame, [handleError]]);
			add(routes, [`${Services.Lobby}|${LobbyActions.Server.SaveSettings}`, saveSettings, [handleError]]);
		},
		[joinedLobby, loadGame, playerJoined, playerLeft, saveSettings]
	);
};
const useGameRoutes = () => {
	const getState = useHandleGetState();
	const playerAction = useHandlePlayerAction();
	const swapTeam = useHandleSwapTeam();
	return useCallback(
		(routes: RoutesMap) => {
			add(routes, [`${Services.Game}|${GameActions.Server.GetState}`, getState, [handleError]]);
			add(routes, [`${Services.Game}|${GameActions.Server.PlayerAction}`, playerAction, [handleError]]);
			add(routes, [`${Services.Game}|${GameActions.Server.SwapTeams}`, swapTeam, [handleError]]);
		},
		[getState, playerAction, swapTeam]
	);
};

export const useConfigureRoutes = () => {
	const chatRoutes = useChatRoutes();
	const playerRoutes = usePlayerRoutes();
	const lobbyRoutes = useLobbyRoutes();
	const gameRoutes = useGameRoutes();

	return useCallback(() => {
		const routes = new Map<string, RouterHandler>();
		devTools.log('useConfigureMiddleware adding middleware');
		chatRoutes(routes);
		playerRoutes(routes);
		lobbyRoutes(routes);
		gameRoutes(routes);
		return routes;
	}, [chatRoutes, playerRoutes, lobbyRoutes, gameRoutes]);
};

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
