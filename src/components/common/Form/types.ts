import { z } from 'zod';
import React from 'react';
import { ActionButtonState } from '../ActionButton/ActionButton';
import { SelectInputProps } from '@mui/material/Select/SelectInput';
import { InputProps as StandardInputProps } from '@mui/material/Input/Input';

export type SchemaKey<Schema extends z.ZodType<unknown>> = keyof z.infer<Schema> & string;
export type SchemaRecord<Schema extends z.ZodType<unknown>> = z.infer<Schema>;
export type InputTypes<Id> =
	| { type: 'text' | 'password' | 'number'; field: Input<Id> }
	| {
			type: 'select';
			field: Select<Id>;
	  }
	| { type: 'radio'; field: Radio<Id> };

export interface SubmitButtonProps {
	color: ActionButtonState;
	text: string;
}

export interface Row<Schema extends z.ZodType<unknown>> {
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
	defaultVal?: unknown;
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
	defaultVal?: unknown;
	onChange?: SelectInputProps<string>['onChange'];
	onBlur?: StandardInputProps['onBlur'];
}

export interface Radio<Id = string> {
	id: Id;
	required?: boolean;
	disabled?: boolean;
	error?: boolean;
	label?: string;
	value?: string;
	helperText?: React.ReactNode;
	items?: (string | { name: string; value: string })[];
	defaultVal?: unknown;
	onChange?: React.FormEventHandler<HTMLDivElement>;
	onBlur?: React.FocusEventHandler<HTMLDivElement>;
}
