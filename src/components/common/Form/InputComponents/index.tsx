import React from 'react';

import TextInput from './TextInput/TextInput';
import PasswordInput from './PasswordInput/PasswordInput';
import { InputTypes } from '../types';
import SelectInput from './SelectInput/SelectInput';

const getInput = <Id extends string>({ type, field }: InputTypes<Id>) => {
	switch (type) {
		case 'text':
			return <TextInput {...field} />;
		case 'password':
			return <PasswordInput {...field} />;
		case 'select':
			return <SelectInput {...field} />;
	}
	return <></>;
};

export default getInput;
