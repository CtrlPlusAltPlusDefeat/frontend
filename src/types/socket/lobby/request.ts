import { Services, SocketMessage } from '../send';
import { RequestTypes } from './enum';

export type CreateLobby = SocketMessage<typeof RequestTypes.ClientActions.Create, {}, typeof Services.Lobby>;

export type JoinLobby = SocketMessage<
	typeof RequestTypes.ClientActions.Join,
	{
		lobbyId: string;
	},
	typeof Services.Lobby
>;

export type SetName = SocketMessage<
	typeof RequestTypes.ClientActions.SetName,
	{
		lobbyId: string;
		text: string;
	},
	typeof Services.Lobby
>;
