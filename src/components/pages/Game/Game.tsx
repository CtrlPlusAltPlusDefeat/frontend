import { LeftPanel, MiddlePanel, RightPanel } from './GameLayout';
import { useGameStore } from '../../../stores/game/gameStore';

const Game = () => {
	const teams = useGameStore((s) => s.teams);
	console.log('teams', teams);
	return (
		<div className={'flex h-fit w-full justify-between'}>
			<LeftPanel team={teams[0]} />
			<MiddlePanel />
			<RightPanel team={teams[1]} />
		</div>
	);
};

export default Game;
