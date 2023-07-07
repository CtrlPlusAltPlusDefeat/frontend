import type { Meta, StoryObj } from '@storybook/react';
import PlayerListItem from './PlayerListItem';

/* Simple Story helper */
type Story = StoryObj<typeof PlayerListItem>;

const meta: Meta<typeof PlayerListItem> = {
	/* Name in storybook */
	title: 'Lobby/Player List Item',
	/* The component we want to render */
	component: PlayerListItem
};

export default meta;

export const Default: Story = {
	args: {
		onClick: () => {},
		name: 'Username',
		points: 0
	},
	render: (args) => {
		return <PlayerListItem {...args} />;
	}
};
