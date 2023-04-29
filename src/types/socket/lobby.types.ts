import { Services, SocketMessage } from './socket.types';

export const LobbyTypes = {
	ClientActions: {
		Join: 'join',
		Create: 'create',
		SetName: 'set-name'
	},
	ServerActions: {
		Joined: 'joined',
		PlayerJoined: 'player-joined',
		PlayerLeft: 'player-left',
		NameChange: 'name-change'
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
		player: LobbyPlayer;
		lobby: LobbyDetails;
	},
	typeof Services.Player
>;

export const isJoinedLobby = (msg: SocketMessage): msg is JoinedLobby => msg.action === LobbyTypes.ServerActions.Joined;
export const isGetLobbyResponse = (msg: SocketMessage): msg is JoinedLobby => msg.action === LobbyTypes.ServerActions.Joined;
export const isNameChange = (msg: SocketMessage): msg is NameChanged => msg.action === LobbyTypes.ServerActions.NameChange;
export const isPlayerJoined = (msg: SocketMessage): msg is PlayerJoined => msg.action === LobbyTypes.ServerActions.PlayerJoined;

export type CreateLobby = SocketMessage<typeof LobbyTypes.ClientActions.Create, {}, typeof Services.Lobby>;

export type JoinLobby = SocketMessage<
	typeof LobbyTypes.ClientActions.Join,
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

export type NameChanged = SocketMessage<
	typeof LobbyTypes.ServerActions.NameChange,
	{
		player: LobbyPlayer;
	},
	typeof Services.Lobby
>;

export type PlayerJoined = SocketMessage<
	typeof LobbyTypes.ServerActions.PlayerJoined,
	{
		player: LobbyPlayer;
	},
	typeof Services.Lobby
>;
