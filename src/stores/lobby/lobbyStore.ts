import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { LobbyDetails, LobbyPlayer } from '../../types/socket/lobby/types';

interface LobbyStoreState {
	lobby?: LobbyDetails;
	player?: LobbyPlayer;
	lobbyId?: string;
	setStore: ({ lobby, player }: { lobby: LobbyDetails; player: LobbyPlayer }) => void;
	setLobbyId: (lobbyId?: string) => void;
	upsertPlayer: (player: LobbyPlayer) => void;
	clear: () => void;
}

export const useLobbyStore = create(
	immer<LobbyStoreState>((set) => ({
		lobby: undefined,
		player: undefined,
		lobbyId: undefined,
		setStore: ({ lobby, player }) =>
			set(() => {
				sessionStorage.setItem(`session-player-name-${lobby.lobbyId}`, player.name);
				return { lobbyId: lobby.lobbyId, lobby, player };
			}),
		setLobbyId: (lobbyId) =>
			set(() => {
				return { lobbyId };
			}),
		upsertPlayer: (player) =>
			set((state) => {
				if (!state.lobby) return {};
				const pIndex = state.lobby?.players?.findIndex((p) => p.id === player.id);
				if (pIndex !== -1) state.lobby.players[pIndex] = player;
				else state.lobby.players.push(player);
			}),
		clear: () => set(() => ({ lobby: undefined, player: undefined, lobbyId: undefined }))
	}))
);
