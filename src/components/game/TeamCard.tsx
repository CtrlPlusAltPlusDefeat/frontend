import { useLobbyStore } from '../../stores/lobby/lobbyStore';
import { getTeamCardColour, TeamName, TeamPlayer } from '../../types/socket/game/types';
import TeamPlayerItem from './TeamPlayerItem';
import ActionButton from '../common/ActionButton/ActionButton';
import { useSwapTeam } from '../../stores/game/gameActions';
import { useGameStore } from '../../stores/game/gameStore';
import { useGetPlayerTeam } from '../../hooks/game/getPlayerTeam';

interface TeamCardProps {
	players: TeamPlayer[];
	name: TeamName;
}

const TeamCard = ({ players, name }: TeamCardProps) => {
	const swapTeam = useSwapTeam();
	const playerTeam = useGetPlayerTeam();

	const gState = useGameStore((s) => s.state?.state);
	const lobbyP = useLobbyStore((s) => s.lobby?.players);
	return (
		<div className={`${getTeamCardColour(name)} border-solid border-2 rounded `}>
			<div className={'p-2'}>{name.toUpperCase()}</div>
			{lobbyP && (
				<div className={'flex flex-col'}>
					{players?.map((p) => {
						const player = lobbyP.find((item) => item.id === p.id);
						if (!player || !player.name) return null;
						return <TeamPlayerItem key={player.id} team={name} {...player} />;
					})}
				</div>
			)}
			{gState === 'prematch' && playerTeam?.name !== name && <ActionButton text={'Join'} onClick={() => swapTeam(name)} />}
		</div>
	);
};

export default TeamCard;
