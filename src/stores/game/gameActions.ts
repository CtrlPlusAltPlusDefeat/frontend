import { useCallback } from 'react';
import { useWebsocket } from '../../contexts/WebSocketContext';
import { GetStateReq, PlayerActionReq, SwapTeamsReq } from '../../types/socket/game/request';
import { useLobbyStore } from '../lobby/lobbyStore';
import { Role, TeamName } from '../../types/socket/game/types';

export const useGetState = ({ gameSessionId, lobbyId }: { gameSessionId?: string; lobbyId?: string }) => {
	const { send, isConnected } = useWebsocket();

	return useCallback(() => {
		if (!isConnected) return;
		if (!gameSessionId || !lobbyId) return;
		const payload: GetStateReq = { service: 'game', action: 'get-state', data: { lobbyId, gameSessionId } };
		send(payload, true);
	}, [isConnected, gameSessionId, lobbyId, send]);
};

export const usePlayerAction = () => {
	const gameSessionId = useLobbyStore((state) => state.lobby?.gameSessionId);
	const lobbyId = useLobbyStore((state) => state.lobby?.lobbyId);
	const { send, isConnected } = useWebsocket();

	return useCallback(() => {
		if (!isConnected) return;
		if (!gameSessionId || !lobbyId) return;
		const payload: PlayerActionReq = { service: 'game', action: 'player-action', data: { lobbyId, gameSessionId } };
		send(payload, true);
	}, [isConnected, gameSessionId, lobbyId, send]);
};

export const useSwapTeam = () => {
	const gameSessionId = useLobbyStore((state) => state.lobby?.gameSessionId);
	const lobbyId = useLobbyStore((state) => state.lobby?.lobbyId);
	const { send, isConnected } = useWebsocket();

	return useCallback(
		(team: TeamName, role: Role) => {
			if (!isConnected) return;
			if (!gameSessionId || !lobbyId) return;
			const payload: SwapTeamsReq = {
				service: 'game',
				action: 'swap-teams',
				data: { lobbyId, gameSessionId, team, role }
			};
			send(payload, true);
		},
		[isConnected, gameSessionId, lobbyId, send]
	);
};
