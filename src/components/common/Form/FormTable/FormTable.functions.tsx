import React from 'react';
import getInput from '../InputComponents';
import { FieldInputProps, FormikErrors, FormikTouched } from 'formik/dist/types';
import { z } from 'zod';
import { Rows } from '../types';

interface GetFieldsProps<Schema extends z.ZodType<unknown>> {
	rows: Rows<Schema>[];
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
					delete field.default;

					const error = errors[field.id] as string | undefined;
					const hasTouched: boolean | undefined = touched[field.id] as boolean | undefined;

					return (
						<div key={`grid-${rowIndex}-${fieldIndex}`} className="w-full">
							{getInput({
								type,
								field: {
									...field,
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
