import { LobbyPlayer } from '../../types/socket/lobby/types';
import { getTeamCardColour, TeamName } from '../../types/socket/game/types';

interface TeamPlayerItemProps extends LobbyPlayer {
	team: TeamName;
}

const TeamPlayerItem = ({ name, team }: TeamPlayerItemProps) => {
	return (
		<div className={`w-full flex items-center justify-between p-6 h-16 last:rounded-b ${getTeamCardColour(team)}`}>
			<div className="flex flex-col">{name}</div>
		</div>
	);
};

export default TeamPlayerItem;
