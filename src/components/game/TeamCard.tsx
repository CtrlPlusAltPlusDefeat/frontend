import { useLobbyStore } from '../../stores/lobby/lobbyStore';
import { getTeamCardColour, TeamName } from '../../types/socket/game/types';
import TeamPlayerItem from './TeamPlayerItem';

interface TeamCardProps {
	players: string[];
	name: TeamName;
}

const TeamCard = ({ players, name }: TeamCardProps) => {
	const lobbyP = useLobbyStore((s) => s.lobby?.players);
	return (
		<div className={`${getTeamCardColour(name)} border-solid border-2 rounded `}>
			<div className={'p-2'}>{name.toUpperCase()}</div>
			{lobbyP && (
				<div className={'flex flex-col'}>
					{players?.map((p) => {
						const player = lobbyP.find((item) => item.id === p);
						if (!player || !player.name) return null;
						return <TeamPlayerItem key={player.id} team={name} {...player} />;
					})}
				</div>
			)}
		</div>
	);
};

export default TeamCard;
