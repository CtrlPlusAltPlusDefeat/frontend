import { useWebsocket } from '../../../contexts/WebSocketContext';
import JoinGameCard from '../../home/JoinGameCard';
import CreateGameCard from '../../home/CreateGameCard';

const Home = () => {
	const { isConnected } = useWebsocket();
	return (
		<div>
			Is Connected: {isConnected ? 'Yes' : 'No'}
			<br />
			<div className={'flex items-center justify-around'}>
				<div className={'h-full'}>
					<CreateGameCard />
				</div>
				<div className={'h-full'}>
					<JoinGameCard />
				</div>
			</div>
		</div>
	);
};

export default Home;
