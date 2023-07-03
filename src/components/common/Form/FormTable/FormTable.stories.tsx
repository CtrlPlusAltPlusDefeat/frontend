import { Meta, Story } from '@storybook/react';
import React from 'react';
import { z } from 'zod';
import FormTable, { FormTableProps } from './FormTable';

export default {
	title: 'Common/Form Table',
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
	testSelect: z.string(),
	testRadio: z.string(),
	testNumber: z.number().min(2).max(11)
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
		},
		{
			fields: [
				{
					type: 'password',
					field: {
						label: 'Password',
						id: 'password',
						required: true,
						default: '123'
					}
				},
				{
					type: 'password',
					field: {
						label: 'Confirm Password',
						id: 'password2',
						required: true,
						default: '1222223'
					}
				}
			]
		},
		{
			fields: [
				{
					type: 'select',
					field: {
						label: 'Test Select',
						id: 'testSelect',
						items: ['Item1', { name: '2', value: 'Item2' }]
					}
				},
				{
					type: 'radio',
					field: {
						label: 'Test Radio',
						id: 'testRadio',
						items: ['Item1', 'Item2']
					}
				},
				{
					type: 'number',
					field: {
						label: 'Test Number',
						id: 'testNumber'
					}
				}
			]
		}
	],
	onSubmit(values, helpers) {
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
