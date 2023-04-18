import type { Meta, StoryObj } from '@storybook/react';
import PlayerCard from './PlayerCard';

/* Simple Story helper */
type Story = StoryObj<typeof PlayerCard>;

const meta: Meta<typeof PlayerCard> = {
	/* Name in storybook */
	title: 'Lobby/PlayerCard',
	/* The component we want to render */
	component: PlayerCard
};

export default meta;

export const Default: Story = {
	render: () => {
		return <PlayerCard />;
	}
};
