//full width on small screens, 1/3 on medium screens
import { Team } from '../../../types/socket/game/types';
import TeamCard from '../../game/TeamCard';
import { usePlayerAction } from '../../../stores/game/gameActions';

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
	const playerAction = usePlayerAction();
	return (
		<div className="w-full">
			<button onClick={playerAction}>Player Action</button>
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
