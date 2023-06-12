export const RequestTypes = {
	ClientActions: {
		Join: 'join',
		Leave: 'leave',
		Create: 'create',
		SetName: 'set-name',
		LoadGame: 'load-game'
	},
	ServerActions: {
		Joined: 'join',
		PlayerJoined: 'player-joined',
		PlayerLeft: 'player-left',
		NameChange: 'name-change',
		LoadGame: 'load-game'
	}
} as const;
