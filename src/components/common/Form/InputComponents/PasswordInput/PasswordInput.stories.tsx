import React from 'react';
import { Meta, Story } from '@storybook/react';
import PasswordInput from './PasswordInput';
import { Input } from '../../types';

export default {
	title: 'Common/Form Component/Input/Password',
	component: PasswordInput,
	argTypes: {}
} as Meta<typeof PasswordInput>;

const Template: Story<Input> = (args) => <PasswordInput {...args} />;

export const Primary = Template.bind({});
Primary.args = {
	id: 'text',
	label: 'Text Input'
};
