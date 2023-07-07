import React from 'react';
import { FieldInputProps, FormikErrors, FormikTouched } from 'formik/dist/types';
import { z } from 'zod';
import { Row } from '../types';
import TextInput from '../InputComponents/TextInput/TextInput';
import PasswordInput from '../InputComponents/PasswordInput/PasswordInput';
import SelectInput from '../InputComponents/SelectInput/SelectInput';
import { InputTypes } from '../types';
import NumberInput from '../InputComponents/NumberInput/NumberInput';
import RadioInput from '../InputComponents/RadioInput/RadioInput';

const getInput = <Id extends string>({ type, field }: InputTypes<Id>) => {
	switch (type) {
		case 'text':
			return <TextInput {...field} />;
		case 'password':
			return <PasswordInput {...field} />;
		case 'select':
			return <SelectInput {...field} />;
		case 'number':
			return <NumberInput {...field} />;
		case 'radio':
			return <RadioInput {...field} />;
	}
	return <></>;
};

interface GetFieldsProps<Schema extends z.ZodType<unknown>> {
	rows: Row<Schema>[];
	getFieldProps: (nameOrOptions: any) => FieldInputProps<any>;
	errors: FormikErrors<Record<string, unknown>>;
	touched: FormikTouched<Record<string, unknown>>;
}

export const getFields = <Schema extends z.ZodType<unknown>>({ rows, getFieldProps, errors, touched }: GetFieldsProps<Schema>) => {
	return rows.map((row, rowIndex) => {
		return (
			<div key={`grid-${rowIndex}`} className={'flex gap-2'}>
				{row.fields.map((input, fieldIndex) => {
					const { type, field } = input;
					const error = errors[field.id] as string | undefined;
					const hasTouched: boolean | undefined = touched[field.id] as boolean | undefined;
					const fieldProps = { ...field };
					delete fieldProps.defaultVal;
					return (
						<div key={`grid-${rowIndex}-${fieldIndex}`} className="w-full">
							{getInput({
								type,
								field: {
									...fieldProps,
									...getFieldProps(field.id),
									error: Boolean(hasTouched && error),
									helperText: hasTouched && typeof error === 'string' ? error : field.helperText
								}
							})}
						</div>
					);
				})}
			</div>
		);
	});
};

export default getInput;
