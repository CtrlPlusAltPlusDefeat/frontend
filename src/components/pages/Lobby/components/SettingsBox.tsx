import FormTable from '../../../common/Form/FormTable/FormTable';
import { z } from 'zod';
import { Row } from '../../../common/Form/types';

const schema = z.object({
	blackCards: z.number().min(1).max(10),
	colouredCards: z.number().min(5).max(15),
	whiteCards: z.number().min(5).max(15),
	totalCards: z.number(),
	dynamicCards: z.union([z.literal('dynamic'), z.literal('static')])
});

const blackCards = 1;
const whiteCards = 7;
const colouredCards = 5;
const rows: Row<typeof schema>[] = [
	{
		fields: [
			{
				type: 'number',
				field: {
					id: 'blackCards',
					label: 'Black Cards',
					defaultVal: blackCards,
					helperText: 'The number of black cards. If chosen you instantly lose'
				}
			},
			{
				type: 'number',
				field: {
					id: 'colouredCards',
					label: 'Coloured Cards',
					defaultVal: 5,
					helperText: 'The number of cards each team has'
				}
			}
		]
	},
	{
		fields: [
			{
				type: 'number',
				field: {
					id: 'whiteCards',
					label: 'White Cards',
					defaultVal: 7,
					helperText: 'The number of white cards on screen'
				}
			},
			{
				type: 'number',
				field: {
					id: 'totalCards',
					label: 'Total Cards',
					disabled: true,
					defaultVal: blackCards + colouredCards * 2 + whiteCards,
					helperText: 'Total cards is calculated using black/white cards + coloured cards x 2'
				}
			}
		]
	},
	{
		fields: [
			{
				type: 'radio',
				field: {
					id: 'whiteCards',
					label: 'Dynamic Game',
					defaultVal: 7,
					items: [
						{ value: 'dynamic', name: 'Dynamic' },
						{ value: 'static', name: 'Static' }
					],
					helperText: 'Dynamic games will change all hidden cards at the end of each turn. Static games will not.'
				}
			}
		]
	}
];
const SettingsBox = () => {
	return (
		<div className="w-full h-2/4 border border-solid border-black p-2">
			<FormTable
				schema={schema}
				rows={rows}
				onSubmit={(values, helpers) => {
					helpers.resetForm({ values: { text: '' } });
				}}
				onChange={(values, helpers) => {
					helpers.setFieldValue('totalCards', values.blackCards + values.colouredCards * 2 + values.whiteCards);
				}}
				submitButton={{ text: 'Join', color: 'success' }}
			/>
		</div>
	);
};

export default SettingsBox;
