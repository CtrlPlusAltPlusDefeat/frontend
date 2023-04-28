import { create } from 'zustand';
import { SocketMessage } from '../../types/socket/socket.types';
import { useCallback } from 'react';
import { isGetLobbyResponse, isJoinedLobby, LobbyDetails, LobbyPlayer, LobbyTypes } from '../../types/socket/lobby.types';

interface LobbyStoreState {
	lobby?: LobbyDetails;
	player?: LobbyPlayer;
	lobbyId?: string;
	set: ({ lobby, player }: { lobby: LobbyDetails; player: LobbyPlayer }) => void;
	setLobbyId: (lobbyId: string) => void;
}

export const useLobbyStore = create<LobbyStoreState>()((set) => ({
	lobby: undefined,
	player: undefined,
	lobbyId: undefined,
	set: ({ lobby, player }) => set(() => ({ lobbyId: lobby.lobbyId, lobby, player })),
	setLobbyId: (lobbyId) => set(() => ({ lobbyId }))
}));

export const useLobbyRoute = () => {
	const setLobbyId = useLobbyStore((s) => s.setLobbyId);
	const set = useLobbyStore((s) => s.set);
	return useCallback(
		(msg: SocketMessage) => {
			switch (msg.action) {
				case LobbyTypes.ServerActions.Joined:
					if (isJoinedLobby(msg)) setLobbyId(msg.data.lobbyId);
					break;
				case LobbyTypes.ServerActions.Get:
					if (isGetLobbyResponse(msg)) set({ lobby: msg.data.lobby, player: msg.data.player });
					break;
				default:
					console.error('Unknown Lobby Action', msg.action);
			}
		},
		[set, setLobbyId]
	);
};
