export const Services = {
	Chat: 'chat',
	Player: 'player',
	Lobby: 'lobby',
	Game: 'game'
} as const;
type ServiceKey = keyof typeof Services;
export type Service = (typeof Services)[ServiceKey];

export type Status = 'not-found' | 'loading' | 'loaded' | 'idle';
