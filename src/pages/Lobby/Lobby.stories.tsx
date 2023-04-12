import type { Meta, StoryObj } from '@storybook/react';
import Lobby from './Lobby';

const meta: Meta<typeof Lobby> = {
	title: 'Pages/Lobby',
	component: Lobby
};

export default meta;
type Story = StoryObj<typeof Lobby>;

export const Default: Story = {
	args: {},
	render: () => {
		return <Lobby />;
	}
};
