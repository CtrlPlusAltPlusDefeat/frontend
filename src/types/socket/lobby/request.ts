import { SocketMessage } from '../receive';
import { Services } from '../general';
import { RequestTypes } from './enum';

export type CreateLobby = SocketMessage<
	typeof RequestTypes.ClientActions.Create,
	{
		name: string;
	},
	typeof Services.Lobby
>;

export type JoinLobby = SocketMessage<
	typeof RequestTypes.ClientActions.Join,
	{
		lobbyId: string;
		name: string;
	},
	typeof Services.Lobby
>;

export type LeaveLobby = SocketMessage<
	typeof RequestTypes.ClientActions.Leave,
	{
		lobbyId: string;
	},
	typeof Services.Lobby
>;

export type StartGame = SocketMessage<
	typeof RequestTypes.ClientActions.StartGame,
	{
		lobbyId: string;
	},
	typeof Services.Lobby
>;
