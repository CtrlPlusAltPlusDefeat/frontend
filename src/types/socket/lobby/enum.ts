export const RequestTypes = {
	ClientActions: {
		Join: 'join',
		Create: 'create',
		SetName: 'set-name'
	},
	ServerActions: {
		Joined: 'joined',
		PlayerJoined: 'player-joined',
		PlayerLeft: 'player-left',
		NameChange: 'name-change'
	}
} as const;