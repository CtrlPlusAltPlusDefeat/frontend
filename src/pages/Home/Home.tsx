import { useWebsocket } from '../../contexts/WebSocketContext';
import { useLobbyStore } from '../../stores/lobby/lobbyStore';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import JoinGameCard from '../../components/home/JoinGameCard';
import CreateGameCard from '../../components/home/CreateGameCard';

const Home = () => {
	const { isConnected } = useWebsocket();
	const lobbyId = useLobbyStore((s) => s.lobbyId);
	const navigate = useNavigate();
	useEffect(() => {
		if (!lobbyId) return;
		navigate(`lobby/${lobbyId}`);
	}, [lobbyId, navigate]);

	return (
		<div>
			Is Connected: {isConnected ? 'Yes' : 'No'}
			<br />
			<div className={'flex items-center justify-around'}>
				<CreateGameCard />
				<JoinGameCard />
			</div>
		</div>
	);
};

export default Home;
