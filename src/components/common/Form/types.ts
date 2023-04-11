import { z } from 'zod';
import { ActionButtonState } from '../ActionButton/ActionButton';
import React from 'react';
import { SelectInputProps } from '@mui/material/Select/SelectInput';
import { InputProps as StandardInputProps } from '@mui/material/Input/Input';

export type SchemaKey<Schema extends z.ZodType<unknown>> = keyof z.infer<Schema> & string;
export type SchemaRecord<Schema extends z.ZodType<unknown>> = z.infer<Schema>;
export type InputTypes<Id> = { type: 'text' | 'password'; field: Input<Id> } | { type: 'select'; field: Select<Id> };

export interface SubmitButtonProps {
	color: ActionButtonState;
	text: string;
}

export interface Rows<Schema extends z.ZodType<unknown>> {
	fields: InputTypes<SchemaKey<Schema>>[];
}

export interface Input<Id = string> {
	type?: React.InputHTMLAttributes<unknown>['type'];
	id: Id;
	label?: string;
	helperText?: React.ReactNode;
	required?: boolean;
	disabled?: boolean;
	value?: unknown;
	default?: unknown;
	error?: boolean;
	onChange?: StandardInputProps['onChange'];
	onBlur?: StandardInputProps['onBlur'];
	InputProps?: Partial<StandardInputProps>;
}

export interface Select<Id = string> {
	id: Id;
	required?: boolean;
	disabled?: boolean;
	multiple?: boolean;
	error?: boolean;
	label?: string;
	helperText?: React.ReactNode;
	items?: (string | { name: string; value: string })[];
	default?: unknown;
	onChange?: SelectInputProps<string>['onChange'];
	onBlur?: StandardInputProps['onBlur'];
}
