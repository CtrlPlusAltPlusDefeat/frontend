import { useCallback } from 'react';
import { devTools } from '../common/devTools';
import { RequestTypes as PlayerRequest } from '../types/socket/player/enum';
import { RequestTypes as LobbyRequest } from '../types/socket/lobby/enum';
import { RequestTypes as ChatRequest } from '../types/socket/chat/enum';
import { Services } from '../types/socket/general';
import { SocketMessage } from '../types/socket/receive';
import { useSetSession } from '../stores/player/playerHandlers';
import { useJoinedLobby, usePlayerJoined, usePlayerLeft } from '../stores/lobby/lobbyHandlers';
import { useLoadMessages, useReceivedMessage } from '../stores/chat/chatHandlers';

export type RouterHandler = (payload: SocketMessage) => void;
export type Router = (next: RouterHandler) => RouterHandler;
export type RoutesMap = Map<string, RouterHandler>;
export type AddProps = [string, RouterHandler, Router[]];

const add = (routes: RoutesMap, [route, handler, middleware]: AddProps) => {
	for (let i = middleware.length - 1; i >= 0; i--) {
		//pass the handler all the way through all the middleware
		handler = middleware[i](handler);
	}
	routes.set(route, handler);
};

export const useConfigureMiddleware = () => {
	const setSession = useSetSession();
	const joinedLobby = useJoinedLobby();
	const playerJoined = usePlayerJoined();
	const playerLeft = usePlayerLeft();
	const receivedMessage = useReceivedMessage();
	const loadMessages = useLoadMessages();

	return useCallback(() => {
		const routes = new Map<string, RouterHandler>();
		devTools.log('useConfigureMiddleware adding middleware');
		//todo error handler middleware
		//Chat
		add(routes, [`${Services.Chat}|${ChatRequest.ServerActions.Receive}`, receivedMessage, []]);
		add(routes, [`${Services.Chat}|${ChatRequest.ServerActions.Load}`, loadMessages, []]);

		//Player
		add(routes, [`${Services.Player}|${PlayerRequest.ServerActions.SetSession}`, setSession, []]);

		//Lobby
		add(routes, [`${Services.Lobby}|${LobbyRequest.ServerActions.Joined}`, joinedLobby, []]);
		add(routes, [`${Services.Lobby}|${LobbyRequest.ServerActions.PlayerJoined}`, playerJoined, []]);
		add(routes, [`${Services.Lobby}|${LobbyRequest.ServerActions.PlayerLeft}`, playerLeft, []]);

		return routes;
	}, [joinedLobby, loadMessages, playerJoined, playerLeft, receivedMessage, setSession]);
};
