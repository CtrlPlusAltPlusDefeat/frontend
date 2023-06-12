import { LeftPanel, RightPanel } from './GameLayout';

const Game = () => {
	return (
		<>
			<div className={'flex h-fit w-full'}>
				<LeftPanel />
				<RightPanel />
			</div>
		</>
	);
};

export default Game;
