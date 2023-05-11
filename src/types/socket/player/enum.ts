export const RequestTypes = {
	ClientActions: {
		CreateSession: 'create-session',
		UseSession: 'use-session'
	},
	ServerActions: { SetSession: 'set-session' }
} as const;
