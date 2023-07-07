import { useGetState } from '../stores/game/gameActions';
import { useEffect, useRef, useState } from 'react';
import { useLobbyStore } from '../stores/lobby/lobbyStore';
import { useGameStore } from '../stores/game/gameStore';
import { Status } from '../common/enum';

export const useLoadGameSession = (enabled: boolean): Status => {
	const gameSessionId = useLobbyStore((state) => state.lobby?.gameSessionId);
	const lobbyId = useLobbyStore((state) => state.lobby?.lobbyId);
	const gState = useGameStore((state) => state.state);

	const [isEnabled, setIsEnabled] = useState(enabled);
	const gameState = useRef<Status>('idle');

	const getGameState = useGetState({ gameSessionId, lobbyId });

	if (gState) gameState.current = 'loaded';

	useEffect(() => {
		setIsEnabled(enabled);
	}, [enabled]);

	useEffect(() => {
		if (!isEnabled || !gameSessionId || !lobbyId) return;
		if (gameState.current !== 'idle') return;
		getGameState();
		gameState.current = 'loading';
	}, [gameSessionId, getGameState, isEnabled, lobbyId]);

	if (gameState.current === 'loaded') return 'loaded';
	if (!gameSessionId) return 'not-found';
	return 'loading';
};
