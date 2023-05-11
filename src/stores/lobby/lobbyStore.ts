import { create } from 'zustand';
import { LobbyDetails, LobbyPlayer } from '../../types/socket/lobby/types';

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
