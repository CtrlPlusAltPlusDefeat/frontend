import { useCallback } from 'react';
import { useLobbyStore } from './lobbyStore';
import { toast } from 'react-toastify';
import { SocketMessage } from '../../hooks/socket';
import { LobbyActions, Services } from '../../common/enum';
import { LobbyDetails, LobbyPlayer, Settings } from '../../common/interfaces';
import { WordGuessSettings } from '../../common/wordguess';
import { omit } from 'lodash';

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

export type SaveSettings = SocketMessage<typeof LobbyActions.Server.SaveSettings, Settings<string>, typeof Services.Player>;

export type StartGame = SocketMessage<typeof LobbyActions.Server.LoadGame, Omit<LobbyDetails, 'players'>, typeof Services.Player>;

export const isJoinedLobby = (msg: SocketMessage): msg is JoinedLobby => msg.action === LobbyActions.Server.Joined;
export const isPlayerJoined = (msg: SocketMessage): msg is PlayerJoined => msg.action === LobbyActions.Server.PlayerJoined;
export const isPlayerLeft = (msg: SocketMessage): msg is PlayerLeft => msg.action === LobbyActions.Server.PlayerLeft;
export const isStartGame = (msg: SocketMessage): msg is StartGame => msg.action === LobbyActions.Server.LoadGame;
export const isSaveSettings = (msg: SocketMessage): msg is SaveSettings => msg.action === LobbyActions.Server.SaveSettings;

const decodeSettings = <T>(s: Settings): T => ({ ...s, game: s.game } as T);

export const useSaveSettings = () => {
	const setSettings = useLobbyStore((s) => s.setSettings);
	return useCallback(
		(payload: SocketMessage) => {
			if (!isSaveSettings(payload)) return;
			//this is hacky and needs fixing
			setSettings(decodeSettings<WordGuessSettings>(payload.data));
		},
		[setSettings]
	);
};

export const useJoinedLobby = () => {
	const setLobby = useLobbyStore((s) => s.setLobby);
	const setPlayer = useLobbyStore((s) => s.setPlayer);
	const setSettings = useLobbyStore((s) => s.setSettings);
	return useCallback(
		(payload: SocketMessage) => {
			if (!isJoinedLobby(payload)) return;
			//lobby call must come before player call
			setLobby({ lobby: omit(payload.data.lobby, ['settings']) });
			setPlayer({ player: payload.data.player });
			const settings = payload.data.lobby.settings;
			if (settings) setSettings(decodeSettings<WordGuessSettings>(settings));
		},
		[setLobby, setPlayer, setSettings]
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
