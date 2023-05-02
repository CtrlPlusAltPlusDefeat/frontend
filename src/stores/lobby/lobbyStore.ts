import { create } from 'zustand';
import { SocketMessage } from '../../types/socket/socket';
import { useCallback } from 'react';
import { isGetLobbyResponse, isNameChange, isPlayerJoined, LobbyDetails, LobbyPlayer, RequestTypes } from '../../types/socket/lobby/request';

interface LobbyStoreState {
	lobby?: LobbyDetails;
	player?: LobbyPlayer;
	lobbyId?: string;
	set: ({ lobby, player }: { lobby: LobbyDetails; player: LobbyPlayer }) => void;
	setPlayer: (player: LobbyPlayer) => void;
	setLobbyId: (lobbyId: string) => void;
	addPlayer: (player: LobbyPlayer) => void;
}

export const useLobbyStore = create<LobbyStoreState>()((set) => ({
	lobby: undefined,
	player: undefined,
	lobbyId: undefined,
	set: ({ lobby, player }) => set(() => ({ lobbyId: lobby.lobbyId, lobby, player })),
	setPlayer: (player) =>
		set((state) => {
			if (!state.lobby) return {};
			console.log('state.player', state.player);
			console.log('player', player);
			const players = [...state.lobby.players];
			const pIndex = players.findIndex((p) => p.id === player.id);
			players[pIndex] = player;

			let thisPlayer: LobbyPlayer | undefined = state.player ? { ...state.player } : undefined;

			if (state.player?.id === player.id) thisPlayer = { ...player };

			return { player: thisPlayer, lobby: { ...state.lobby, players } };
		}),
	setLobbyId: (lobbyId) => set(() => ({ lobbyId })),
	addPlayer: (player) =>
		set((state) => {
			if (!state.lobby) return {};
			const players = [...state.lobby.players, player];
			return { lobby: { ...state.lobby, players } };
		})
}));

export const useLobbyRoute = () => {
	const set = useLobbyStore((s) => s.set);
	const setPlayer = useLobbyStore((s) => s.setPlayer);
	const addPlayer = useLobbyStore((s) => s.addPlayer);
	return useCallback(
		(msg: SocketMessage) => {
			switch (msg.action) {
				case RequestTypes.ServerActions.Joined:
					console.log(msg.data);
					if (isGetLobbyResponse(msg)) set({ lobby: msg.data.lobby, player: msg.data.player });
					break;
				case RequestTypes.ServerActions.NameChange:
					if (isNameChange(msg)) setPlayer(msg.data.player);
					break;

				case RequestTypes.ServerActions.PlayerJoined:
					if (isPlayerJoined(msg)) addPlayer(msg.data.player);
					break;

				default:
					console.error('Unknown Lobby Action', msg.action);
			}
		},
		[addPlayer, set, setPlayer]
	);
};
