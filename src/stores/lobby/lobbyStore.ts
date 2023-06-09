import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { LobbyDetails, LobbyPlayer } from '../../common/interfaces';
import { WordGuessSettings } from '../../common/wordguess';

interface LobbyStoreState {
	lobby?: Omit<LobbyDetails, 'settings'>;
	player?: LobbyPlayer;
	settings?: WordGuessSettings;
	lobbyId?: string;
	setLobby: ({ lobby }: { lobby: LobbyDetails }) => void;
	setPlayer: ({ player }: { player: LobbyPlayer }) => void;
	setLobbyId: (lobbyId?: string) => void;
	setSettings: (settings?: WordGuessSettings) => void;
	upsertPlayer: (player: LobbyPlayer) => void;
	clear: () => void;
}

export const useLobbyStore = create(
	immer<LobbyStoreState>((set) => ({
		lobby: undefined,
		player: undefined,
		lobbyId: undefined,
		setLobby: ({ lobby }) =>
			set(() => {
				return { lobbyId: lobby.lobbyId, lobby };
			}),
		setPlayer: ({ player }) =>
			set((state) => {
				sessionStorage.setItem(`session-player-name-${state.lobbyId}`, player.name);
				return { player };
			}),
		setLobbyId: (lobbyId) =>
			set(() => {
				return { lobbyId };
			}),
		setSettings: (settings) =>
			set(() => {
				return { settings };
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
