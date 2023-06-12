//full width on small screens, 1/3 on medium screens
import { getTeamTextColour, Team } from '../../../types/socket/game/types';
import TeamCard from '../../game/TeamCard';
import { usePlayerAction } from '../../../stores/game/gameActions';
import { useGameStore } from '../../../stores/game/gameStore';
import { useGetPlayerTeam } from '../../../hooks/game/getPlayerTeam';
import ActionButton from '../../common/ActionButton/ActionButton';

interface PanelProps {
	team: Team;
}

export const LeftPanel = ({ team }: PanelProps) => {
	return (
		<div>
			<TeamCard {...team} />
		</div>
	);
};

export const MiddlePanel = () => {
	const currentTeam = useGameStore((s) => s.state?.currentTurn);
	const playerTeam = useGetPlayerTeam();
	const playerAction = usePlayerAction();

	if (!currentTeam) return null;
	return (
		<div className="w-full">
			<p className={getTeamTextColour(currentTeam)}>current team: {currentTeam}</p>
			{playerTeam?.name === currentTeam && <ActionButton state={'danger'} text={'Player Action'} onClick={playerAction} />}
		</div>
	);
};

export const RightPanel = ({ team }: PanelProps) => {
	return (
		<div>
			<TeamCard {...team} />
		</div>
	);
};
