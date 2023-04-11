import { Meta, Story } from '@storybook/react';
import TextInput from './TextInput';
import React from 'react';
import { Input } from '../../types';

export default {
	title: '@env-byte/Form/Input/Text',
	component: TextInput,
	argTypes: {}
} as Meta<typeof TextInput>;

const Template: Story<Input> = (args) => <TextInput {...args} />;

export const Primary = Template.bind({});
Primary.args = {
	id: 'text',
	label: 'Text Input'
};
