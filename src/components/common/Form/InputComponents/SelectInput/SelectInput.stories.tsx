import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Select } from '../../types';
import SelectInput from './SelectInput';

export default {
	title: 'Common/Form Component/Input/Select',
	component: SelectInput,
	argTypes: {}
} as Meta<typeof SelectInput>;

const Template: Story<Select> = (args) => <SelectInput {...args} />;

export const Primary = Template.bind({});
Primary.args = {
	id: 'select',
	label: 'Select Input'
};
