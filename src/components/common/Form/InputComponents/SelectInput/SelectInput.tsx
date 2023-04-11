import { Select as SelectProps } from '../../types';
import React, { FC } from 'react';
import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';

const SelectInput: FC<SelectProps> = (field) => {
	const items = field.items?.map((item) => {
		if (typeof item !== 'string')
			return (
				<MenuItem key={item.value} value={item.value}>
					{item.name}
				</MenuItem>
			);
		return (
			<MenuItem key={item} value={item}>
				{item}
			</MenuItem>
		);
	});
	const { helperText } = field;
	const labelId = `${field.id}-label`;
	return (
		<FormControl required={field.required} error={field.error} disabled={field.disabled} fullWidth>
			<InputLabel id={labelId}>{field.label}</InputLabel>
			<Select
				id={field.id}
				name={field.id}
				label={field.label}
				labelId={labelId}
				required={field.required}
				onChange={field.onChange}
				onBlur={field.onBlur}
				multiple={field.multiple}
				disabled={field.disabled}
			>
				{items}
			</Select>
			{helperText && <FormHelperText>{helperText}</FormHelperText>}
		</FormControl>
	);
};

export default SelectInput;
