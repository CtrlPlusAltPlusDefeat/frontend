import { useCallback } from 'react';
import { useLobbyStore } from './lobbyStore';
import { toast } from 'react-toastify';
import { SocketMessage } from '../../hooks/socket';
import { LobbyActions, Services } from '../../common/enum';
import { LobbyDetails, LobbyPlayer } from '../../common/interfaces';

export type PlayerJoined = SocketMessage<
	typeof LobbyActions.Server.PlayerJoined,
	{
		player: LobbyPlayer;
	},
	typeof Services.Lobby
>;

export type PlayerLeft = SocketMessage<
	typeof LobbyActions.Server.PlayerJoined,
	{
		player: LobbyPlayer;
	},
	typeof Services.Lobby
>;

export type JoinedLobby = SocketMessage<
	typeof LobbyActions.Server.Joined,
	{
		player: LobbyPlayer;
		lobby: LobbyDetails;
	},
	typeof Services.Player
>;

export type StartGame = SocketMessage<typeof LobbyActions.Server.LoadGame, Omit<LobbyDetails, 'players'>, typeof Services.Player>;

export const isJoinedLobby = (msg: SocketMessage): msg is JoinedLobby => msg.action === LobbyActions.Server.Joined;
export const isPlayerJoined = (msg: SocketMessage): msg is PlayerJoined => msg.action === LobbyActions.Server.PlayerJoined;
export const isPlayerLeft = (msg: SocketMessage): msg is PlayerLeft => msg.action === LobbyActions.Server.PlayerLeft;
export const isStartGame = (msg: SocketMessage): msg is StartGame => msg.action === LobbyActions.Server.LoadGame;

export const useJoinedLobby = () => {
	const setLobby = useLobbyStore((s) => s.setLobby);
	const setPlayer = useLobbyStore((s) => s.setPlayer);
	return useCallback(
		(payload: SocketMessage) => {
			if (!isJoinedLobby(payload)) return;
			setLobby({ lobby: payload.data.lobby });
			setPlayer({ player: payload.data.player });
		},
		[setLobby, setPlayer]
	);
};

export const usePlayerJoined = () => {
	const upsertPlayer = useLobbyStore((s) => s.upsertPlayer);
	return useCallback(
		(payload: SocketMessage) => {
			if (!isPlayerJoined(payload)) return;
			upsertPlayer(payload.data.player);
			toast.info(`${payload.data.player.name} joined the lobby`);
		},
		[upsertPlayer]
	);
};

export const usePlayerLeft = () => {
	const upsertPlayer = useLobbyStore((s) => s.upsertPlayer);
	return useCallback(
		(payload: SocketMessage) => {
			if (!isPlayerLeft(payload)) return;
			upsertPlayer(payload.data.player);
			toast.info(`${payload.data.player.name} left the lobby`);
		},
		[upsertPlayer]
	);
};

export const useLoadGame = () => {
	const setLobby = useLobbyStore((s) => s.setLobby);

	return useCallback(
		(payload: SocketMessage) => {
			const players = useLobbyStore.getState().lobby?.players;
			if (!isStartGame(payload) || !players) return;
			setLobby({ lobby: { ...payload.data, players: players } });
		},
		[setLobby]
	);
};
