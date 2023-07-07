interface Actions {
	Client: { [key: string]: string };
	Server: { [key: string]: string };
}

export const ChatActions: Actions = {
	Client: { Send: 'send', Load: 'load' },
	Server: { Send: 'send', Load: 'load' }
} as const;

export const GameActions: Actions = {
	Client: {
		GetState: 'get-state',
		PlayerAction: 'player-action',
		SwapTeams: 'swap-teams'
	},
	Server: {
		GetState: 'get-state',
		PlayerAction: 'player-action',
		SwapTeams: 'swap-teams'
	}
} as const;

export const LobbyActions: Actions = {
	Client: {
		Join: 'join',
		Leave: 'leave',
		Create: 'create',
		SetName: 'set-name',
		LoadGame: 'load-game'
	},
	Server: {
		Joined: 'join',
		PlayerJoined: 'player-joined',
		PlayerLeft: 'player-left',
		NameChange: 'name-change',
		LoadGame: 'load-game'
	}
} as const;

export const PlayerAction: Actions = {
	Client: {
		CreateSession: 'create-session',
		UseSession: 'use-session'
	},
	Server: { SetSession: 'set-session' }
} as const;

export const Services = {
	Chat: 'chat',
	Player: 'player',
	Lobby: 'lobby',
	Game: 'game'
} as const;
type ServiceKey = keyof typeof Services;
export type Service = (typeof Services)[ServiceKey];

export const GameIds = {
	WordGuess: 0
} as const;

export type GameId = (typeof GameIds)[keyof typeof GameIds];

export interface BaseSettings {
	gameId: GameId;
	maxPlayers: number;
}

export type Status = 'not-found' | 'loading' | 'loaded' | 'idle';
