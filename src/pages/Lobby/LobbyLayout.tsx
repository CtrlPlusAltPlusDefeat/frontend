import PlayerList from '../../components/lobby/PlayerList/PlayerList';
import ChatBox from '../../components/common/ChatBox/ChatBox';

const panelClass = 'border border-solid border-black p-2 flex-row h-screen w-96';

export const LeftPanel = () => {
	return (
		<div className={panelClass}>
			<div className={'h-2/4'}>
				<PlayerList />
			</div>
			<div className={'h-2/4'}>
				<ChatBox />
			</div>
		</div>
	);
};

export const RightPanel = () => {
	return <div className={panelClass}> Right Panel</div>;
};
