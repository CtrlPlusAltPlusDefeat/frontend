import FormTable from '../../../common/Form/FormTable/FormTable';
import { z } from 'zod';
import { Row, SchemaRecord } from '../../../common/Form/types';
import { debounce, isEqual, omit } from 'lodash';
import { useLobbyStore } from '../../../../stores/lobby/lobbyStore';
import { isWordGuessSettings, WordGuessSettings } from '../../../../common/wordguess';
import { useCallback, useMemo } from 'react';
import { FormikHelpers } from 'formik/dist/types';
import { useSaveSettings } from '../../../../stores/lobby/lobbyActions';
import { Settings } from '../../../../common/interfaces';

const schema = z.object({
	blackCards: z.number().min(1).max(10),
	colouredCards: z.number().min(5).max(15),
	whiteCards: z.number().min(5).max(15),
	totalCards: z.number(),
	dynamic: z.union([z.literal('dynamic'), z.literal('static')])
});

interface FieldValues {
	blackCards: number;
	whiteCards: number;
	colouredCards: number;
	dynamic: boolean;
}

const getFields = (values: FieldValues): Row<typeof schema>[] => {
	return [
		{
			fields: [
				{
					type: 'number',
					field: {
						id: 'blackCards',
						label: 'Black Cards',
						defaultVal: values.blackCards,
						helperText: 'The number of black cards. If chosen you instantly lose'
					}
				},
				{
					type: 'number',
					field: {
						id: 'colouredCards',
						label: 'Coloured Cards',
						defaultVal: values.colouredCards,
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
						defaultVal: values.whiteCards,
						helperText: 'The number of white cards on screen'
					}
				},
				{
					type: 'number',
					field: {
						id: 'totalCards',
						label: 'Total Cards',
						disabled: true,
						defaultVal: values.blackCards + values.colouredCards * 2 + values.whiteCards,
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
						id: 'dynamic',
						label: 'Dynamic Game',
						defaultVal: values.dynamic ? 'dynamic' : 'static',
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
};

const defaults: FieldValues = { blackCards: 1, colouredCards: 7, whiteCards: 15, dynamic: false };

const getTotal = (values: Omit<FieldValues, 'dynamic'>) => {
	return values.colouredCards * 2 + values.blackCards + values.whiteCards;
};

const hasChanged = (values: FieldValues, settings: WordGuessSettings) => {
	return !isEqual(values, settings.game);
};

const SettingsBox = () => {
	const settings = useLobbyStore((state) => state?.settings);
	const saveSettings = useSaveSettings();
	const defaultVals = settings && isWordGuessSettings(settings) ? settings.game : defaults;

	const debouncedUpdate = useMemo(
		() =>
			debounce((values: FieldValues, settings: Settings) => {
				const s: Settings = { ...settings, game: values };
				saveSettings(s);
			}, 1000),
		[saveSettings]
	);

	const onChange = useCallback(
		(values: SchemaRecord<typeof schema>, helpers: FormikHelpers<Record<string, unknown>>) => {
			helpers.setFieldValue('totalCards', getTotal(values));
			const v: FieldValues = { ...omit(values, ['totalCards']), dynamic: values.dynamic === 'dynamic' };
			if (settings && hasChanged(v, settings)) debouncedUpdate(v, settings);
		},
		[debouncedUpdate, settings]
	);

	return (
		<div className="w-full h-2/4 border border-solid border-black p-2">
			<FormTable schema={schema} rows={getFields(defaultVals)} onChange={onChange} />
		</div>
	);
};

export default SettingsBox;
