import { useLobbyStore } from '../../stores/lobby/lobbyStore';
import LobbyController from './LobbyController';

const GameController = () => {
	const inGame = useLobbyStore((state) => state.lobby?.inGame);

	return inGame ? <>In Game</> : <LobbyController />;
};

export default GameController;
