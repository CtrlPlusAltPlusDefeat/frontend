import { LobbyPlayer } from '../../types/socket/lobby/types';

const TeamPlayerItem = ({ name }: LobbyPlayer) => {
	return (
		<div className={'w-full flex items-center justify-between hover:cursor p-6 h-16 last:rounded-b outline outline-primaryGrey outline-1 hover:drop-shadow hover:ease-in duration-100'}>
			<div className="flex flex-col">{name}</div>
		</div>
	);
};

export default TeamPlayerItem;
