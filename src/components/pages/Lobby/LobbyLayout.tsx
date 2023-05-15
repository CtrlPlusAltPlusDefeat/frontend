import PlayerList from '../../lobby/PlayerList/PlayerList';
import ChatBox from '../../common/ChatBox/ChatBox';
import Sidebar from '../../common/Sidebar/Sidebar';
import { debugBorder } from '../../../common/devTools';
import LeaveButton from '../../lobby/LeaveButton/LeaveButton';

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
	return <div className={`${panelClass} ${debugBorder} w-full text-black`}> Right Panel</div>;
};
