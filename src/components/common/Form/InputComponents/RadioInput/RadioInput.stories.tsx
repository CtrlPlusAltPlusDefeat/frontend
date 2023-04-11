import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Radio } from '../../types';
import RadioInput from './RadioInput';

export default {
	title: 'Common/Form Component/Input/Radio',
	component: RadioInput,
	argTypes: {}
} as Meta<typeof RadioInput>;

const Template: Story<Radio> = (args) => <RadioInput {...args} />;

export const Primary = Template.bind({});
Primary.args = {
	id: 'radio',
	label: 'Radio Input',
	items: ['A', 'B']
};
