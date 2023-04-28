import ChatBox from '../../components/common/ChatBox/ChatBox';
import { useWebsocket } from '../../contexts/WebSocketContext';
import ActionButton from '../../components/common/ActionButton/ActionButton';
import { useCreateLobby } from '../../stores/lobby/lobbyActions';
import { useLobbyStore } from '../../stores/lobby/lobbyStore';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
	const { isConnected } = useWebsocket();
	const lobbyId = useLobbyStore((s) => s.lobbyId);
	console.log('lobbyId', lobbyId);
	const create = useCreateLobby();
	const navigate = useNavigate();

	useEffect(() => {
		if (!lobbyId) return;
		navigate(`lobby/${lobbyId}`);
	}, [lobbyId, navigate]);

	return (
		<div>
			Home Page. Is Connected: {isConnected ? 'Yes' : 'No'}
			<br />
			<ChatBox />
			<br />
			<ActionButton
				text={'Create'}
				onClick={() => {
					create();
				}}
			/>
		</div>
	);
};

export default Home;
