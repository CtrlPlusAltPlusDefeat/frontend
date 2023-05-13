import PlayerList from '../../components/lobby/PlayerList/PlayerList';
import ChatBox from '../../components/common/ChatBox/ChatBox';
import Sidebar from '../../components/common/Sidebar/Sidebar';
import { debugBorder } from '../../common/devTools';
import LeaveButton from '../../components/lobby/LeaveButton/LeaveButton';

//full width on small screens, 1/3 on medium screens
const panelClass = ' p-2 flex flex-col h-screen justify-around';
export const LeftPanel = () => {
	return (
		<Sidebar>
			<div className={panelClass}>
				<div className={'h-2/4 md:mb-40'}>
					<PlayerList />
				</div>
				<div className={'h-1/4 md:mb-20 h-full'}>
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
	return <div className={`${panelClass} ${debugBorder} w-full text-black`}> Right Panel</div>;
};
