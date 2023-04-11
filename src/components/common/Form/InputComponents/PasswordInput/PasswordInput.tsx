import React, { FC, useState } from 'react';
import TextInput from '../TextInput/TextInput';
import { IconButton, InputAdornment } from '@mui/material';
import { Input } from '../../types';
import { Icon } from '@iconify/react';

const PasswordInput: FC<Input> = (field) => {
	const [showPassword, setShowPassword] = useState(false);
	return (
		<TextInput
			{...field}
			type={showPassword ? 'text' : 'password'}
			InputProps={{
				endAdornment: (
					<InputAdornment position="end">
						<IconButton onClick={() => setShowPassword((prev) => !prev)}>{showPassword ? <Icon icon="eva:eye-fill" /> : <Icon icon="eva:eye-off-fill" />}</IconButton>
					</InputAdornment>
				)
			}}
		/>
	);
};
export default PasswordInput;
