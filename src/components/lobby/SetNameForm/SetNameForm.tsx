import FormTable from '../../common/Form/FormTable/FormTable';
import { z } from 'zod';
import { Row } from '../../common/Form/types';
import { useSetName } from '../../../stores/lobby/lobbyActions';

const schema = z.object({ name: z.string() });
const rows: Row<typeof schema>[] = [
	{
		fields: [
			{
				type: 'text',
				field: {
					id: 'name',
					label: 'Name',
					default: ''
				}
			}
		]
	}
];
export const SetNameForm = () => {
	const send = useSetName();
	return (
		<FormTable
			schema={schema}
			rows={rows}
			onSubmit={(values, helpers) => {
				send(values.name);
				helpers.resetForm({ values: { text: '' } });
			}}
			submitButton={{ text: 'Set Name', color: 'success' }}
		/>
	);
};
export default SetNameForm;
