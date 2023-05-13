import { LobbyDetails, LobbyPlayer } from './types';
import { RequestTypes } from './enum';
import { Services } from '../general';
import { SocketMessage } from '../receive';

export type PlayerJoined = SocketMessage<
	typeof RequestTypes.ServerActions.PlayerJoined,
	{
		player: LobbyPlayer;
	},
	typeof Services.Lobby
>;

export type PlayerLeft = SocketMessage<
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
export const isPlayerJoined = (msg: SocketMessage): msg is PlayerJoined => msg.action === RequestTypes.ServerActions.PlayerJoined;
export const isPlayerLeft = (msg: SocketMessage): msg is PlayerLeft => msg.action === RequestTypes.ServerActions.PlayerLeft;
