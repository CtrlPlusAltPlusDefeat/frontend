import PlayerList from '../../components/lobby/PlayerList/PlayerList';
import ChatBox from '../../components/common/ChatBox/ChatBox';
import Sidebar from '../../components/common/Sidebar/Sidebar';
import { debugBorder } from '../../common/devTools';

//full width on small screens, 1/3 on medium screens
const panelClass = ' p-2 flex-row h-screen';
export const LeftPanel = () => {
	return (
		<Sidebar>
			<div className={panelClass}>
				<div className={'h-2/5 md:h-2/4 overflow-auto mb-2'}>
					<PlayerList />
				</div>
				<div className={'h-2/5 md:h-2/4'}>
					<ChatBox />
				</div>
			</div>
		</Sidebar>
	);
};

export const RightPanel = () => {
	return <div className={`${panelClass} ${debugBorder}`}> Right Panel</div>;
};
