import { LeftPanel, RightPanel } from './LobbyLayout';

const Lobby = () => {
	return (
		<div className={'flex h-fit flex-wrap'}>
			<LeftPanel />
			<RightPanel />
		</div>
	);
};

export default Lobby;
