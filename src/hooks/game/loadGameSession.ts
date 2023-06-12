import { useGetState } from '../../stores/game/gameActions';
import { useEffect, useRef, useState } from 'react';
import { Status } from '../../types/socket/general';
import { useLobbyStore } from '../../stores/lobby/lobbyStore';

export const useLoadGameSession = (enabled: boolean) => {
	const gameSessionId = useLobbyStore((state) => state.lobby?.gameSessionId);
	const lobbyId = useLobbyStore((state) => state.lobby?.lobbyId);

	const [isEnabled, setIsEnabled] = useState(enabled);
	const gameState = useRef<Status>('loading');

	const getGameState = useGetState({ gameSessionId, lobbyId });

	useEffect(() => {
		setIsEnabled(enabled);
	}, [enabled]);

	useEffect(() => {
		if (!isEnabled || !gameSessionId || !lobbyId) return;
		if (gameState.current === 'loaded') return;
		getGameState();
		gameState.current = 'loaded';
	}, [gameSessionId, getGameState, isEnabled, lobbyId]);

	if (gameState.current === 'loaded') return 'loaded';
	if (!gameSessionId) return 'not-found';
	return 'loading';
};
