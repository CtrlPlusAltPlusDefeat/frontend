import PlayerList from '../../lobby/PlayerList/PlayerList';
import ChatBox from '../../common/ChatBox/ChatBox';
import Sidebar from '../../common/Sidebar/Sidebar';
import { debugBorder } from '../../../common/devTools';
import LeaveButton from '../../lobby/LeaveButton/LeaveButton';
import ActionButton from '../../common/ActionButton/ActionButton';
import { useStartGame } from '../../../stores/lobby/lobbyActions';
import { useWebsocket } from '../../../contexts/WebSocketContext';

//full width on small screens, 1/3 on medium screens
const panelClass = ' p-2 flex flex-col h-screen justify-around';
export const LeftPanel = () => {
	return (
		<Sidebar>
			<div className={panelClass}>
				<div className={'h-1/4 md:h-2/4 '}>
					<PlayerList />
				</div>
				<div className={'h-2/4'}>
					<ChatBox />
				</div>
				<div>
					<LeaveButton />
				</div>
			</div>
		</Sidebar>
	);
};

export const RightPanel = () => {
	const startGame = useStartGame();
	const { loading } = useWebsocket();

	return (
		<div className={`${panelClass} ${debugBorder} w-full text-black`}>
			<ActionButton disabled={loading} text={'Start game'} onClick={startGame} />
		</div>
	);
};
