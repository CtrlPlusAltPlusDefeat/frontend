import FormTable from '../../FormTable/FormTable';
import { z } from 'zod';
import { Row } from '../../types';
import React, { useEffect, useState } from 'react';
import { useModal } from '../../../Modal/ModalContext';

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

interface SetNameProps {
	onSubmit: (name: string) => void;
}

export const SetName = ({ onSubmit }: SetNameProps) => {
	const {
		state: { buttonRef },
		setClose
	} = useModal();
	const [button, setButton] = useState(buttonRef.current);
	useEffect(() => {
		setButton(buttonRef.current);
	}, [buttonRef]);
	return (
		<FormTable
			schema={schema}
			rows={rows}
			onSubmit={(values, helpers) => {
				onSubmit(values.name);
				setClose();
				helpers.resetForm({ values: { name: '' } });
			}}
			externalButton={button ? button : undefined}
		/>
	);
};
export default SetName;
