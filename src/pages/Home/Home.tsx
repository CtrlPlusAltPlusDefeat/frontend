import ChatBox from '../../components/common/ChatBox/ChatBox';
import { useWebsocket } from '../../contexts/WebSocketContext';

const Home = () => {
	const { isConnected } = useWebsocket();

	return (
		<div>
			Home Page. Is Connected: {isConnected ? 'Yes' : 'No'}
			<ChatBox />
		</div>
	);
};

export default Home;
