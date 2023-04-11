import { Meta, Story } from '@storybook/react';
import React from 'react';
import { z } from 'zod';
import { FormTableProps } from '../types';
import FormTable from './FormTable';

export default {
	title: '@env-byte/Form/Form Table',
	component: FormTable,
	argTypes: {}
} as Meta<typeof FormTable>;

const Template: Story<FormTableProps<any>> = (args) => <FormTable {...args} />;
export const Primary = Template.bind({});
const schema = z.object({
	firstName: z.string(),
	lastName: z.string(),
	password: z.string(),
	password2: z.string(),
	testSelect: z.string()
});

const props: FormTableProps<typeof schema> = {
	schema: schema,
	rows: [
		{
			fields: [
				{
					type: 'text',
					field: {
						id: 'firstName',
						label: 'First Name',
						default: 'Tom'
					}
				},
				{
					type: 'text',
					field: {
						id: 'lastName',
						label: 'Last Name',
						default: 'Penn'
					}
				}
			]
		}
	],
	onSubmit(values, helpers) {
		console.log('select', typeof values.testSelect, values.testSelect);

		if (values.password !== values.password2) {
			helpers.setFieldError('password', "Passwords don't match");
			helpers.setFieldError('password2', "Passwords don't match");
			return;
		}

		alert(`Creating account ${values.firstName} ${values.lastName}`);
	},
	submitButton: {
		color: 'success',
		text: 'Signup'
	}
};
Primary.args = props;
