import { LeftPanel, RightPanel } from './LobbyLayout';

const Lobby = () => {
	return (
		<>
			<div className={'flex h-fit w-full'}>
				<LeftPanel />
				<RightPanel />
			</div>
		</>
	);
};

export default Lobby;
