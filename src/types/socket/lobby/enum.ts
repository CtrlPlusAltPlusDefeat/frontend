export const RequestTypes = {
	ClientActions: {
		Join: 'join',
		Leave: 'leave',
		Create: 'create',
		SetName: 'set-name',
		StartGame: 'start-game'
	},
	ServerActions: {
		Joined: 'join',
		PlayerJoined: 'player-joined',
		PlayerLeft: 'player-left',
		NameChange: 'name-change',
		StartGame: 'start-game'
	}
} as const;
