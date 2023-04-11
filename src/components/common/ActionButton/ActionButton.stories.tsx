// Button.stories.ts|tsx

import type { Meta, StoryObj } from '@storybook/react';

import ActionButton from './ActionButton';

const meta: Meta<typeof ActionButton> = {
	title: 'Common/ActionButton',
	component: ActionButton
};

export default meta;
type Story = StoryObj<typeof ActionButton>;

export const Success: Story = {
	args: {
		onClick: () => {},
		text: 'some text',
		type: 'success'
	},
	render: (args) => {
		return <ActionButton {...args} />;
	}
};
export const Danger: Story = {
	args: {
		onClick: () => {},
		text: 'some text',
		type: 'danger'
	},
	render: (args) => {
		return <ActionButton {...args} />;
	}
};
