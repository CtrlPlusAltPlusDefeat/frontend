import { useLobbyStore } from '../../../stores/lobby/lobbyStore';
import PlayerListItem from '../PlayerListItem/PlayerListItem';
import { devTools } from '../../../common/devTools';

const PlayerList = () => {
	const players = useLobbyStore((s) => s.lobby?.players);
	devTools.log('PlayerList', players);
	return (
		<div className={'border border-black flex'}>
			{players?.map((player) => {
				return <PlayerListItem key={player.id} photo={''} name={player.name} score={player.points} onClick={() => {}} />;
			})}
		</div>
	);
};
export default PlayerList;
