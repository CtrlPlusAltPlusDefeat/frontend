import { useLobbyStore } from '../../stores/lobby/lobbyStore';
import { getTeamCardColour, TeamName, TeamPlayer } from '../../types/socket/game/types';
import TeamPlayerItem from './TeamPlayerItem';
import ActionButton from '../common/ActionButton/ActionButton';
import { useSwapTeam } from '../../stores/game/gameActions';
import { useGameStore } from '../../stores/game/gameStore';
import { useGetPlayerRole, useGetPlayerTeam } from '../../hooks/game/getPlayerTeam';
import { LobbyPlayer } from '../../types/socket/lobby/types';

interface TeamCardProps {
	players: TeamPlayer[];
	name: TeamName;
}

const renderList = ({ teamP, lobbyP, teamName }: { teamP: TeamPlayer[]; lobbyP: LobbyPlayer[]; teamName: TeamName }) => {
	return (
		<div className={'flex flex-col'}>
			{teamP?.map((p) => {
				const player = lobbyP.find((item) => item.id === p.id);
				if (!player || !player.name) return null;
				return <TeamPlayerItem key={player.id} team={teamName} {...player} />;
			})}
		</div>
	);
};
const TeamCard = ({ players, name }: TeamCardProps) => {
	const swapTeam = useSwapTeam();
	const clientTeam = useGetPlayerTeam();
	const clientRole = useGetPlayerRole();

	const operatives = players.filter((p) => p.data?.role === 'operative');
	const spymasters = players.filter((p) => p.data?.role === 'spymaster');

	const gState = useGameStore((s) => s.state?.state);
	const lobbyP = useLobbyStore((s) => s.lobby?.players);

	//is the client on this team
	const onThisTeam = clientTeam?.name === name;

	return (
		<div className={`${getTeamCardColour(name)} border-solid border-2 rounded `}>
			<div className={'p-2'}>{name.toUpperCase()}</div>
			<div className={'mb-1'}>
				<div>Operatives:</div>
				{lobbyP && renderList({ teamP: operatives, lobbyP, teamName: name })}
				{gState === 'prematch' && !(onThisTeam && clientRole === 'operative') && <ActionButton classes={['m-auto']} size={'small'} text={'Join'} onClick={() => swapTeam(name, 'operative')} />}
			</div>
			<div className={'mb-1'}>
				<div>Spy Master:</div>
				{lobbyP && renderList({ teamP: spymasters, lobbyP, teamName: name })}
				{gState === 'prematch' && !(onThisTeam && clientRole === 'spymaster') && <ActionButton classes={['m-auto']} size={'small'} text={'Join'} onClick={() => swapTeam(name, 'spymaster')} />}
			</div>
		</div>
	);
};

export default TeamCard;
