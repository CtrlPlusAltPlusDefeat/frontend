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
import { useHandleGetState } from '../../../stores/game/gameHandlers';

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

export const useConfigureRoutes = () => {
	const setSession = useSetSession();
	const joinedLobby = useJoinedLobby();
	const playerJoined = usePlayerJoined();
	const playerLeft = usePlayerLeft();
	const loadGame = useLoadGame();
	const receivedMessage = useReceivedMessage();
	const loadMessages = useLoadMessages();
	const getState = useHandleGetState();

	return useCallback(() => {
		const routes = new Map<string, RouterHandler>();
		devTools.log('useConfigureMiddleware adding middleware');
		//todo error handler middleware
		//Chat
		add(routes, [`${Services.Chat}|${ChatRequest.ServerActions.Send}`, receivedMessage, [handleError]]);
		add(routes, [`${Services.Chat}|${ChatRequest.ServerActions.Load}`, loadMessages, [handleError]]);

		//Player
		add(routes, [`${Services.Player}|${PlayerRequest.ServerActions.SetSession}`, setSession, [handleError]]);

		//Lobby
		add(routes, [`${Services.Lobby}|${LobbyRequest.ServerActions.Joined}`, joinedLobby, [handleError]]);
		add(routes, [`${Services.Lobby}|${LobbyRequest.ServerActions.PlayerJoined}`, playerJoined, [handleError]]);
		add(routes, [`${Services.Lobby}|${LobbyRequest.ServerActions.PlayerLeft}`, playerLeft, [handleError]]);
		add(routes, [`${Services.Lobby}|${LobbyRequest.ServerActions.LoadGame}`, loadGame, [handleError]]);

		//Game
		add(routes, [`${Services.Game}|${GameRequest.ServerActions.GetState}`, getState, [handleError]]);
		return routes;
	}, [receivedMessage, loadMessages, setSession, joinedLobby, playerJoined, playerLeft, loadGame, getState]);
};
