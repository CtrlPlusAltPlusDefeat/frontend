import React from 'react';
import { Meta, Story } from '@storybook/react';
import { NumberInput as NumberInputType } from '../../types';
import NumberInput from './NumberInput';

export default {
	title: 'Common/Form Component/Input/Number',
	component: NumberInput,
	argTypes: {}
} as Meta<typeof NumberInput>;

const Template: Story<NumberInputType> = (args) => <NumberInput {...args} />;

export const Primary = Template.bind({});
Primary.args = {
	id: 'number',
	label: 'Number Input',
	min: 1,
	max: 10
};
