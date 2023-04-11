import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Input } from '../../types';
import NumberInput from './NumberInput';

export default {
	title: 'Common/Form Component/Input/Number',
	component: NumberInput,
	argTypes: {}
} as Meta<typeof NumberInput>;

const Template: Story<Input> = (args) => <NumberInput {...args} />;

export const Primary = Template.bind({});
Primary.args = {
	id: 'number',
	label: 'Number Input'
};
