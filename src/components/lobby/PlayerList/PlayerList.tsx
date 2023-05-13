import { useLobbyStore } from '../../../stores/lobby/lobbyStore';
import PlayerListItem from '../PlayerListItem/PlayerListItem';
import { devTools } from '../../../common/devTools';

const PlayerList = () => {
	const players = useLobbyStore((s) => s.lobby?.players);
	devTools.log('PlayerList', players);
	return (
		<div className={' border-solid border border-slate rounded'}>
			<div className={'p-2'}>Lobby Players</div>
			<div className={'flex flex-col'}>
				{players?.map((player) => {
					if (!player.name) return null;
					return <PlayerListItem key={player.id} photo={''} name={player.name} score={player.points} onClick={() => {}} />;
				})}
			</div>
		</div>
	);
};
export default PlayerList;
