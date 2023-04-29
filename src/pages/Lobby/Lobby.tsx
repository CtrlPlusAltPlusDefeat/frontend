import PlayerList from '../../components/lobby/PlayerList/PlayerList';
import ChatBox from '../../components/common/ChatBox/ChatBox';

const Lobby = () => {
	return (
		<div>
			Lobby Page
			<PlayerList />
			<br />
			<ChatBox />
		</div>
	);
};

export default Lobby;
