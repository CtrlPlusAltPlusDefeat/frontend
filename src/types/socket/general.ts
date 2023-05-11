export const Services = {
	Chat: 'chat',
	Player: 'player',
	Lobby: 'lobby'
} as const;
type ServiceKey = keyof typeof Services;
export type Service = (typeof Services)[ServiceKey];
