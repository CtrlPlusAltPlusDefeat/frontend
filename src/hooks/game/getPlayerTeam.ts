import { useLobbyStore } from '../../stores/lobby/lobbyStore';
import { useGameStore } from '../../stores/game/gameStore';

export const useGetPlayerTeam = () => {
	const player = useLobbyStore((s) => s.player);
	const teams = useGameStore((s) => s.teams);
	return teams.find((t) => t.players.find((p) => p.id === player?.id ?? ''));
};

export const useGetPlayerRole = () => {
	const player = useLobbyStore((s) => s.player);
	const team = useGetPlayerTeam();
	return team?.players.find((p) => p.id === player?.id ?? '')?.data?.role;
};
