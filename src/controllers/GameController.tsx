import { useLobbyStore } from '../stores/lobby/lobbyStore';
import LobbyController from './LobbyController';

import Game from '../components/pages/Game/Game';
import { useLoadGameSession } from '../hooks/gameSessionHooks';

const GameController = () => {
	const inGame = useLobbyStore((state) => state.lobby?.inGame);
	const state = useLoadGameSession(inGame || false);
	if (!inGame) return <LobbyController />;
	if (state === 'not-found') return <div>Game not found...</div>;
	if (state === 'loading') return <div>Loading...</div>;
	return <Game />;
};

export default GameController;
