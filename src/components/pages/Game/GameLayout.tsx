//full width on small screens, 1/3 on medium screens
import { getTeamTextColour, Team } from '../../../types/socket/game/types';
import TeamCard from '../../game/TeamCard';
import { usePlayerAction } from '../../../stores/game/gameActions';
import { useGameStore } from '../../../stores/game/gameStore';
import { useGetPlayerTeam } from '../../../hooks/game/getPlayerTeam';
import ActionButton from '../../common/ActionButton/ActionButton';
import CardGrid from '../../game/CardGrid';

interface PanelProps {
	team: Team;
}

export const LeftPanel = ({ team }: PanelProps) => {
	return (
		<div className={'w-1/5'}>
			<TeamCard {...team} />
		</div>
	);
};

export const MiddlePanel = () => {
	const currentTeam = useGameStore((s) => s.state?.currentTurn);
	const xLength = useGameStore((s) => s.game?.xLength) ?? 0;
	const yLength = useGameStore((s) => s.game?.yLength) ?? 0;
	const cards = useGameStore((s) => s.game?.cards) ?? [];
	const playerTeam = useGetPlayerTeam();
	const playerAction = usePlayerAction();

	return (
		<div className="w-full">
			<p className={currentTeam ? getTeamTextColour(currentTeam) : ''}>current team: {currentTeam}</p>
			{(playerTeam?.name === currentTeam || currentTeam === '') && <ActionButton state={'danger'} text={'Player Action'} onClick={playerAction} />}
			<CardGrid cards={cards} xLength={xLength} yLength={yLength} />
		</div>
	);
};

export const RightPanel = ({ team }: PanelProps) => {
	return (
		<div className={'w-1/5'}>
			<TeamCard {...team} />
		</div>
	);
};
