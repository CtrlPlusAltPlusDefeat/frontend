import React, { FC } from 'react';
import { Radio as RadioInputType } from '../../types';
import { FormControl, FormControlLabel, FormHelperText, FormLabel, Radio, RadioGroup } from '@mui/material';

const RadioInput: FC<RadioInputType> = (field) => {
	const items = field.items?.map((item) => {
		if (typeof item !== 'string') return <FormControlLabel key={item.name} value={item.value} checked={field.value === item.value} control={<Radio />} label={item.name} />;
		return <FormControlLabel key={item} value={item} control={<Radio />} label={item} />;
	});
	const { helperText } = field;

	return (
		<FormControl onBlur={field.onBlur} onChange={field.onChange} required={field.required} error={field.error} disabled={field.disabled}>
			<FormLabel id={field.id}>{field.label}</FormLabel>
			<RadioGroup row aria-labelledby={field.id} name={field.id}>
				{items}
			</RadioGroup>
			{helperText && <FormHelperText>{helperText}</FormHelperText>}
		</FormControl>
	);
};

export default RadioInput;
