import { Services, SocketMessage } from './socket.types';

export const LobbyTypes = {
	ClientActions: {
		Join: 'join',
		Create: 'create',
		Get: 'get',
		SetName: 'set-name'
	},
	ServerActions: {
		Joined: 'joined',
		PlayerJoined: 'player-joined',
		PlayerLeft: 'player-left',
		Get: 'get'
	}
} as const;

export type LobbyPlayer = {
	id: string;
	name: string;
	isAdmin: boolean;
	points: number;
};

export type LobbyDetails = {
	players: LobbyPlayer[];
	lobbyId: string;
};

export type JoinedLobby = SocketMessage<
	typeof LobbyTypes.ServerActions.Joined,
	{
		lobbyId: string;
	},
	typeof Services.Player
>;
export type GetLobbyResponse = SocketMessage<
	typeof LobbyTypes.ServerActions.Get,
	{
		player: LobbyPlayer;
		lobby: LobbyDetails;
	},
	typeof Services.Player
>;

export const isJoinedLobby = (msg: SocketMessage): msg is JoinedLobby => msg.action === LobbyTypes.ServerActions.Joined;
export const isGetLobbyResponse = (msg: SocketMessage): msg is GetLobbyResponse => msg.action === LobbyTypes.ServerActions.Get;

export type CreateLobby = SocketMessage<typeof LobbyTypes.ClientActions.Create, {}, typeof Services.Lobby>;

export type JoinLobby = SocketMessage<
	typeof LobbyTypes.ClientActions.Join,
	{
		lobbyId: string;
	},
	typeof Services.Lobby
>;

export type GetLobby = SocketMessage<
	typeof LobbyTypes.ClientActions.Get,
	{
		lobbyId: string;
	},
	typeof Services.Lobby
>;

export type SetName = SocketMessage<
	typeof LobbyTypes.ClientActions.SetName,
	{
		lobbyId: string;
		text: string;
	},
	typeof Services.Lobby
>;
