import { useCallback } from 'react';
import { devTools } from '../common/devTools';
import { RequestTypes as PlayerRequest } from '../types/socket/player/enum';
import { RequestTypes as LobbyRequest } from '../types/socket/lobby/enum';
import { RequestTypes as ChatRequest } from '../types/socket/chat/enum';
import { Services } from '../types/socket/general';
import { SocketMessage } from '../types/socket/receive';
import { useSetSession } from '../stores/player/playerHandlers';
import { useJoinedLobby, useNameChanged, usePlayerJoined } from '../stores/lobby/lobbyHandlers';
import { useReceivedMessage } from '../stores/chat/chatHandlers';

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
	const nameChanged = useNameChanged();
	const playerJoined = usePlayerJoined();
	const receivedMessage = useReceivedMessage();

	return useCallback(() => {
		const routes = new Map<string, RouterHandler>();
		devTools.log('useConfigureMiddleware adding middleware');
		//Chat
		add(routes, [`${Services.Chat}|${ChatRequest.ServerActions.Receive}`, receivedMessage, []]);

		//Player
		add(routes, [`${Services.Player}|${PlayerRequest.ServerActions.SetSession}`, setSession, []]);

		//Lobby
		add(routes, [`${Services.Lobby}|${LobbyRequest.ServerActions.Joined}`, joinedLobby, []]);
		add(routes, [`${Services.Lobby}|${LobbyRequest.ServerActions.PlayerJoined}`, playerJoined, []]);
		add(routes, [`${Services.Lobby}|${LobbyRequest.ServerActions.NameChange}`, nameChanged, []]);

		return routes;
	}, [joinedLobby, nameChanged, playerJoined, receivedMessage, setSession]);
};
