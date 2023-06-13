import { useCallback } from 'react';
import { devTools } from '../../../common/devTools';
import { RequestTypes as PlayerRequest } from '../../../types/socket/player/enum';
import { RequestTypes as LobbyRequest } from '../../../types/socket/lobby/enum';
import { RequestTypes as ChatRequest } from '../../../types/socket/chat/enum';
import { RequestTypes as GameRequest } from '../../../types/socket/game/enum';
import { Services } from '../../../types/socket/general';
import { SocketMessage } from '../../../types/socket/receive';
import { useSetSession } from '../../../stores/player/playerHandlers';
import { useJoinedLobby, usePlayerJoined, usePlayerLeft, useLoadGame } from '../../../stores/lobby/lobbyHandlers';
import { useLoadMessages, useReceivedMessage } from '../../../stores/chat/chatHandlers';
import { handleError } from './handleError';
import { useHandleGetState, useHandlePlayerAction, useHandleSwapTeam } from '../../../stores/game/gameHandlers';

export type RouterHandler = (payload: SocketMessage) => void;
export type Middleware = (next: RouterHandler) => RouterHandler;
export type RoutesMap = Map<string, RouterHandler>;
export type AddProps = [string, RouterHandler, Middleware[]];

const add = (routes: RoutesMap, [route, handler, middleware]: AddProps) => {
	for (let i = middleware.length - 1; i >= 0; i--) {
		//pass the handler all the way through all the middleware
		handler = middleware[i](handler);
	}
	routes.set(route, handler);
};

const useChatRoutes = () => {
	const receivedMessage = useReceivedMessage();
	const loadMessages = useLoadMessages();
	return useCallback(
		(routes: RoutesMap) => {
			add(routes, [`${Services.Chat}|${ChatRequest.ServerActions.Send}`, receivedMessage, [handleError]]);
			add(routes, [`${Services.Chat}|${ChatRequest.ServerActions.Load}`, loadMessages, [handleError]]);
		},
		[loadMessages, receivedMessage]
	);
};
const usePlayerRoutes = () => {
	const setSession = useSetSession();

	return useCallback(
		(routes: RoutesMap) => {
			add(routes, [`${Services.Player}|${PlayerRequest.ServerActions.SetSession}`, setSession, [handleError]]);
		},
		[setSession]
	);
};
const useLobbyRoutes = () => {
	const joinedLobby = useJoinedLobby();
	const playerJoined = usePlayerJoined();
	const playerLeft = usePlayerLeft();
	const loadGame = useLoadGame();
	return useCallback(
		(routes: RoutesMap) => {
			add(routes, [`${Services.Lobby}|${LobbyRequest.ServerActions.Joined}`, joinedLobby, [handleError]]);
			add(routes, [`${Services.Lobby}|${LobbyRequest.ServerActions.PlayerJoined}`, playerJoined, [handleError]]);
			add(routes, [`${Services.Lobby}|${LobbyRequest.ServerActions.PlayerLeft}`, playerLeft, [handleError]]);
			add(routes, [`${Services.Lobby}|${LobbyRequest.ServerActions.LoadGame}`, loadGame, [handleError]]);
		},
		[joinedLobby, loadGame, playerJoined, playerLeft]
	);
};
const useGameRoutes = () => {
	const getState = useHandleGetState();
	const playerAction = useHandlePlayerAction();
	const swapTeam = useHandleSwapTeam();
	return useCallback(
		(routes: RoutesMap) => {
			add(routes, [`${Services.Game}|${GameRequest.ServerActions.GetState}`, getState, [handleError]]);
			add(routes, [`${Services.Game}|${GameRequest.ServerActions.PlayerAction}`, playerAction, [handleError]]);
			add(routes, [`${Services.Game}|${GameRequest.ServerActions.SwapTeams}`, swapTeam, [handleError]]);
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
