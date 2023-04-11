import React, { FC } from 'react';
import { Input } from '../../types';
import { TextField } from '@mui/material';

const TextInput: FC<Input> = (field) => {
	return (
		<TextField
			fullWidth
			name={field.id}
			{...field}
			InputLabelProps={{
				shrink: true
			}}
		/>
	);
};

export default TextInput;
