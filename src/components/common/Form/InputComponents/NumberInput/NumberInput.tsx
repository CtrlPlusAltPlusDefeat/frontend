import React, { FC } from 'react';
import TextInput from '../TextInput/TextInput';
import { Input } from '../../types';

const NumberInput: FC<Input> = (field) => {
	return (
		<TextInput
			{...field}
			InputProps={{
				inputProps: {
					type: 'number',
					inputMode: 'numeric',
					pattern: '[0-9]*'
				}
			}}
		/>
	);
};
export default NumberInput;
