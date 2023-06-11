import { useLobbyStore } from '../stores/lobby/lobbyStore';
import LobbyController from './LobbyController';
import { useGetState } from '../stores/game/gameActions';
import { useEffect } from 'react';

const GameController = () => {
	const inGame = useLobbyStore((state) => state.lobby?.inGame);
	const getGameState = useGetState();

	useEffect(() => {
		if (!inGame) return;
		getGameState();
	}, [getGameState, inGame]);

	return inGame ? <>In Game</> : <LobbyController />;
};

export default GameController;
