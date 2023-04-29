import { z } from 'zod';
import { Row } from '../common/Form/types';
import FormTable from '../common/Form/FormTable/FormTable';
import CardTitle from './CardTitle';
import { useLobbyStore } from '../../stores/lobby/lobbyStore';

const schema = z.object({ lobbyId: z.string() });
const rows: Row<typeof schema>[] = [
	{
		fields: [
			{
				type: 'text',
				field: {
					id: 'lobbyId',
					label: 'Lobby Code',
					default: ''
				}
			}
		]
	}
];

const JoinGameCard = () => {
	const setLobbyId = useLobbyStore((s) => s.setLobbyId);
	return (
		<div className={'border rounded border-black p-4'}>
			<CardTitle title={'Join A Game'} />
			<FormTable
				schema={schema}
				rows={rows}
				onSubmit={(values, helpers) => {
					setLobbyId(values.lobbyId);
					helpers.resetForm({ values: { text: '' } });
				}}
				submitButton={{ text: 'Join', color: 'success' }}
			/>
		</div>
	);
};
export default JoinGameCard;
