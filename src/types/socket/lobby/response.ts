import { Services, SocketMessage } from '../socket';
import { LobbyDetails, LobbyPlayer } from './types';
import { RequestTypes } from './enum';

export type NameChanged = SocketMessage<
	typeof RequestTypes.ServerActions.NameChange,
	{
		player: LobbyPlayer;
	},
	typeof Services.Lobby
>;

export type PlayerJoined = SocketMessage<
	typeof RequestTypes.ServerActions.PlayerJoined,
	{
		player: LobbyPlayer;
	},
	typeof Services.Lobby
>;

export type JoinedLobby = SocketMessage<
	typeof RequestTypes.ServerActions.Joined,
	{
		player: LobbyPlayer;
		lobby: LobbyDetails;
	},
	typeof Services.Player
>;

export const isJoinedLobby = (msg: SocketMessage): msg is JoinedLobby => msg.action === RequestTypes.ServerActions.Joined;
export const isNameChange = (msg: SocketMessage): msg is NameChanged => msg.action === RequestTypes.ServerActions.NameChange;
export const isPlayerJoined = (msg: SocketMessage): msg is PlayerJoined => msg.action === RequestTypes.ServerActions.PlayerJoined;
