import { useLobbyStore } from '../../stores/lobby/lobbyStore';
import { TeamName } from '../../types/socket/game/types';
import TeamPlayerItem from './TeamPlayerItem';

interface TeamCardProps {
	teamPlayers: string[];
	teamName: TeamName;
}

const TeamCard = ({ teamPlayers, teamName }: TeamCardProps) => {
	const players = useLobbyStore((s) => s.lobby?.players);
	return (
		<div className={'bg-white border-solid border border-slate rounded'}>
			<div className={'p-2'}>{teamName.toUpperCase()}</div>
			{players && (
				<div className={'flex flex-col'}>
					{teamPlayers?.map((p) => {
						const player = players.find((item) => item.id === p);
						if (!player || !player.name) return null;
						return <TeamPlayerItem key={player.id} {...player} />;
					})}
				</div>
			)}
		</div>
	);
};

export default TeamCard;
